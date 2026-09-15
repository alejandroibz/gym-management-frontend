import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { firstValueFrom } from 'rxjs';
import { StudentPlatformService } from '../../services/student-platform.service';
import { Exercise, MuscleGroup } from '../../models/student-platform.model';

interface ImportRow {
  videoId: string; name: string; description: string; videoUrl: string;
  selected: boolean; state: 'pending' | 'existing' | 'created' | 'error'; error: string;
}

export function youtubeVideoId(value: string | null | undefined): string | null {
  try {
    const url = new URL(value || '');
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    const parts = url.pathname.split('/').filter(Boolean);
    const id = ['youtu.be', 'www.youtu.be'].includes(url.hostname) ? parts[0]
      : ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(url.hostname)
        ? url.pathname === '/watch' ? url.searchParams.get('v') : ['shorts', 'embed', 'live'].includes(parts[0]) ? parts[1] : null
        : null;
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

@Component({
  selector: 'app-youtube-playlist-import',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './youtube-playlist-import.html',
  styleUrl: './youtube-playlist-import.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlaylistImportComponent {
  private readonly service = inject(StudentPlatformService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly playingVideo = signal<{ id: string; url: SafeResourceUrl } | null>(null);

  playVideo(videoId: string): void {
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return;
    this.playingVideo.set({ id: videoId, url: this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`
    ) });
  }
  readonly dialog = inject(MatDialogRef<YoutubePlaylistImportComponent>);
  readonly rows = signal<ImportRow[]>([]);
  readonly groups = signal<MuscleGroup[]>([]);
  readonly busy = signal(false);
  readonly message = signal('');
  readonly error = signal('');
  readonly created = signal(0);
  readonly processed = signal(0);
  readonly total = signal(0);
  readonly loaded = signal(false);
  playlistUrl = '';
  groupId = 0;

  selectedRows(): ImportRow[] {
    return this.rows().filter(row => row.selected && (row.state === 'pending' || row.state === 'error'));
  }

  canImport(): boolean {
    const selected = this.selectedRows();
    return !this.busy() && selected.length > 0 && selected.every(row => row.name.trim().length > 0 && row.name.length <= 150 && row.description.length <= 2000);
  }

  private exerciseKey(name: string, videoId: string): string {
    return JSON.stringify([name.trim().replace(/\s+/g, ' ').toUpperCase(), videoId]);
  }

  private existingIds(exercises: Exercise[]): Set<string> {
    return new Set(exercises.flatMap(exercise => [exercise.videoUrl, ...(exercise.media ?? []).filter(media => media.mediaType === 'Video').map(media => media.url)]
      .map(youtubeVideoId).filter((id): id is string => !!id).map(id => this.exerciseKey(exercise.name, id))));
  }
  private setBusy(value: boolean): void {
    this.busy.set(value);
    this.dialog.disableClose = true;
  }

  async preview(): Promise<void> {
    if (this.busy() || !this.playlistUrl.trim()) return;
    this.setBusy(true);
    this.playingVideo.set(null); this.error.set(''); this.message.set(''); this.rows.set([]); this.loaded.set(false); this.total.set(0);
    try {
      const [preview, exercises, groups] = await Promise.all([
        firstValueFrom(this.service.previewYoutubePlaylist(this.playlistUrl.trim())),
        firstValueFrom(this.service.getExercises()), firstValueFrom(this.service.getMuscleGroups())
      ]);
      const existing = this.existingIds(exercises);
      this.groups.set(groups);
      this.rows.set(preview.items.map(row => ({ ...row, selected: !existing.has(this.exerciseKey(row.name, row.videoId)), state: existing.has(this.exerciseKey(row.name, row.videoId)) ? 'existing' : 'pending', error: '' })));
      this.loaded.set(true);
      this.message.set(`${preview.items.length} videos encontrados. ${preview.skipped} no disponibles o repetidos omitidos.`);
    } catch (error: any) {
      this.error.set(error?.error?.message || 'No se pudo leer la playlist. Revisá el enlace e intentá nuevamente.');
    } finally { this.setBusy(false); }
  }

  async importSelected(): Promise<void> {
    if (!this.canImport()) return;
    const selected = this.selectedRows();
    this.setBusy(true); this.error.set(''); this.processed.set(0); this.total.set(selected.length);
    let imported = 0;
    let skipped = 0;
    let failed = 0;
    try {
      // Refresh before every import/retry, including uncertain responses from an earlier attempt.
      const existing = this.existingIds(await firstValueFrom(this.service.getExercises()));
      const group = this.groups().find(item => item.id === Number(this.groupId));
      for (const row of selected) {
        if (existing.has(this.exerciseKey(row.name, row.videoId))) {
          row.state = 'existing'; row.selected = false; row.error = ''; skipped++;
        } else {
          try {
            await firstValueFrom(this.service.createExercise({
              name: row.name.trim(), description: row.description.trim() || row.name.trim(),
              videoUrl: row.videoUrl, muscleGroup: group?.name || 'General',
              primaryMuscleGroupId: group?.id ?? null, muscleIds: [],
              media: [{ mediaType: 'Video', url: row.videoUrl, title: row.name.trim(), sortOrder: 1 }]
            }));
            existing.add(this.exerciseKey(row.name, row.videoId)); row.state = 'created'; row.selected = false; row.error = '';
            imported++; this.created.update(value => value + 1);
          } catch (error: any) {
            row.state = 'error'; row.error = error?.error?.errors?.join(' ') || 'No se pudo guardar. Podés reintentar.'; failed++;
          }
        }
        this.processed.update(value => value + 1);
        this.rows.update(rows => [...rows]);
      }
      this.message.set(`${imported} creados · ${skipped} ya existentes · ${failed} con error.`);
    } catch {
      this.error.set('No se pudo verificar el catálogo. Intentá nuevamente.');
    } finally { this.setBusy(false); }
  }

  selectAll(selected: boolean): void {
    this.rows.update(rows => rows.map(row => ({ ...row, selected: ['pending', 'error'].includes(row.state) && selected })));
  }

  close(): void { if (!this.busy()) this.dialog.close(this.created()); }
}
