import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { YoutubePlaylistImportComponent, youtubeVideoId } from './youtube-playlist-import';
import { StudentPlatformService } from '../../services/student-platform.service';

describe('Playlist import', () => {
  const video = (videoId: string) => ({ videoId, name: 'Sentadilla', description: 'Sentadilla', videoUrl: `https://www.youtube.com/watch?v=${videoId}` });
  let service: { previewYoutubePlaylist: ReturnType<typeof vi.fn>; getExercises: ReturnType<typeof vi.fn>; getMuscleGroups: ReturnType<typeof vi.fn>; createExercise: ReturnType<typeof vi.fn> };
  beforeEach(() => {
    service = {
      previewYoutubePlaylist: vi.fn().mockReturnValue(of({ items: [video('abcdefghijk'), video('zyxwvutsrqp')], skipped: 0 })),
      getExercises: vi.fn().mockReturnValue(of([])), getMuscleGroups: vi.fn().mockReturnValue(of([])),
      createExercise: vi.fn().mockReturnValue(of({ id: 1 }))
    };
    TestBed.configureTestingModule({ imports: [YoutubePlaylistImportComponent], providers: [
      { provide: StudentPlatformService, useValue: service }, { provide: MatDialogRef, useValue: { close: vi.fn(), disableClose: true } }
    ] });
  });

  it('plays thumbnails inline, switches players and removes external links', async () => {
    const fixture = TestBed.createComponent(YoutubePlaylistImportComponent);
    const component = fixture.componentInstance;
    component.playlistUrl = 'https://youtube.com/playlist?list=PLabcdefghij';
    await component.preview();
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('a[target="_blank"]')).toBeNull();
    (root.querySelector('.video-thumbnail') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(root.querySelectorAll('iframe')).toHaveLength(1);
    expect(root.querySelector('iframe')?.src).toContain('/embed/abcdefghijk?');
    (root.querySelector('.video-thumbnail') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(root.querySelectorAll('iframe')).toHaveLength(1);
    expect(root.querySelector('iframe')?.src).toContain('/embed/zyxwvutsrqp?');
    component.playingVideo.set(null);
    fixture.detectChanges();
    expect(root.querySelector('iframe')).toBeNull();
    expect(root.querySelectorAll('.video-thumbnail')).toHaveLength(2);
  });
  it('allows the same video with another name, but detects a duplicate after renaming in preview', async () => {
    service.getExercises.mockReturnValue(of([{ name: 'Plancha', videoUrl: 'https://youtu.be/abcdefghijk', media: [] }]));
    const component = TestBed.createComponent(YoutubePlaylistImportComponent).componentInstance;
    component.playlistUrl = 'https://youtube.com/playlist?list=PLabcdefghij';
    await component.preview();
    expect(component.selectedRows()).toHaveLength(2);
    component.rows()[0].name = '  PLANCHA  ';
    component.rows()[1].selected = false;
    await component.importSelected();
    expect(service.createExercise).not.toHaveBeenCalled();
    expect(component.rows()[0].state).toBe('existing');
  });
  it('skips existing videos even when the stored link is a Short', async () => {
    service.getExercises.mockReturnValue(of([{ name: 'Sentadilla', videoUrl: 'https://youtube.com/shorts/abcdefghijk', media: [] }]));
    const fixture = TestBed.createComponent(YoutubePlaylistImportComponent);
    const component = fixture.componentInstance;
    component.playlistUrl = 'https://youtube.com/playlist?list=PLabcdefghij';
    await component.preview();
    fixture.detectChanges();
    expect(component.selectedRows()).toHaveLength(1);
    expect(fixture.nativeElement.textContent).toContain('Ya existe en el catálogo');
    component.rows()[1].name = 'Plancha editada';
    component.rows()[1].description = '';
    await component.importSelected();
    expect(service.createExercise).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ name: 'Plancha editada', description: 'Plancha editada' }));
  });

  it('retains successful rows and retries failures without duplicating uncertain saves', async () => {
    const component = TestBed.createComponent(YoutubePlaylistImportComponent).componentInstance;
    component.playlistUrl = 'https://youtube.com/playlist?list=PLabcdefghij';
    await component.preview();
    service.createExercise.mockReturnValueOnce(of({ id: 1 })).mockReturnValueOnce(throwError(() => new Error('network')));
    await component.importSelected();
    expect(component.rows().map(row => row.state)).toEqual(['created', 'error']);
    service.getExercises.mockReturnValue(of([{ name: 'Sentadilla', videoUrl: 'https://youtu.be/zyxwvutsrqp', media: [] }]));
    await component.importSelected();
    expect(service.createExercise).toHaveBeenCalledTimes(2);
    expect(component.rows().map(row => row.state)).toEqual(['created', 'existing']);
  });

  it('does not import when catalog verification fails', async () => {
    const component = TestBed.createComponent(YoutubePlaylistImportComponent).componentInstance;
    component.playlistUrl = 'https://youtube.com/playlist?list=PLabcdefghij';
    await component.preview();
    service.getExercises.mockReturnValue(throwError(() => new Error('offline')));
    await component.importSelected();
    expect(service.createExercise).not.toHaveBeenCalled();
    expect(component.error()).toContain('catálogo');
    expect(component.busy()).toBe(false);
  });

  it('honors exclusions and does not accept video IDs from unrelated hosts', async () => {
    expect(youtubeVideoId('https://youtube.com.evil.test/watch?v=abcdefghijk')).toBeNull();
    const component = TestBed.createComponent(YoutubePlaylistImportComponent).componentInstance;
    component.playlistUrl = 'https://youtube.com/playlist?list=PLabcdefghij';
    await component.preview();
    component.selectAll(false);
    await component.importSelected();
    expect(service.createExercise).not.toHaveBeenCalled();
  });
});
