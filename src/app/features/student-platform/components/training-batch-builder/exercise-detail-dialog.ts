import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Exercise } from '../../models/student-platform.model';

@Component({
  selector: 'app-exercise-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './exercise-detail-dialog.html',
  styleUrl: './exercise-detail-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseDetailDialogComponent {
  private readonly sanitizer = inject(DomSanitizer);
  readonly exercise = inject<Exercise>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<ExerciseDetailDialogComponent>);

  readonly images = this.exercise.media?.filter(item => item.mediaType === 'Image').map(item => item.url) ?? [];
  readonly videos = this.exercise.media?.filter(item => item.mediaType === 'Video').map(item => item.url) ?? [];
  readonly primaryImage = this.exercise.photoUrl || this.images[0] || null;
  readonly primaryVideo = this.exercise.videoUrl || this.videos[0] || null;

  readonly embeddedVideo = this.getYouTubeEmbed(this.primaryVideo);
  readonly hasPlayableVideo = !!this.embeddedVideo || (!!this.primaryVideo && this.isDirectVideo(this.primaryVideo));
  readonly showPhoto = signal(false);

  private getYouTubeEmbed(value: string | null): SafeResourceUrl | null {
    if (!value) return null;

    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
      const host = url.hostname.toLowerCase();
      const parts = url.pathname.split('/').filter(Boolean);
      let videoId: string | null = null;

      if (host === 'youtu.be' || host === 'www.youtu.be') {
        videoId = parts[0] ?? null;
      } else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(host)) {
        if (url.pathname === '/watch') videoId = url.searchParams.get('v');
        else if (['shorts', 'embed', 'live'].includes(parts[0])) videoId = parts[1] ?? null;
      }

      if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return null;
      // Trust only the fixed YouTube embed origin and a validated video identifier.
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1`
      );
    } catch {
      return null;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  isDirectVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
  }
}
