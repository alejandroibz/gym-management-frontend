import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { YoutubePlaylistImportComponent, youtubeVideoId } from './youtube-playlist-import';
import { StudentPlatformService } from '../../services/student-platform.service';

describe('Playlist import', () => {
  const video = (videoId: string) => ({ videoId, name: 'Sentadilla', description: 'Sentadilla', videoUrl: `https://www.youtube.com/watch?v=${videoId}` });
  let service: { previewExerciseFile: ReturnType<typeof vi.fn>; previewYoutubePlaylist: ReturnType<typeof vi.fn>; getExercises: ReturnType<typeof vi.fn>; getMuscleGroups: ReturnType<typeof vi.fn>; createExercise: ReturnType<typeof vi.fn> };
  beforeEach(() => {
    service = {
      previewExerciseFile: vi.fn().mockReturnValue(of({ items: [
        { rowNumber: 1, name: 'Plancha', videoUrl: 'https://youtu.be/abcdefghijk', description: 'Core' },
        { rowNumber: 2, name: '', videoUrl: 'enlace incorrecto', description: 'Corregir' }
      ], sheetName: 'Ejercicios', skipped: 0, headerSkipped: false })),
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
  it('previews a file without saving, flags invalid rows and imports corrected columns', async () => {
    const fixture = TestBed.createComponent(YoutubePlaylistImportComponent);
    const component = fixture.componentInstance;
    component.changeSource('file');
    component.file = new File(['a,b,c'], 'ejercicios.csv');
    await component.previewFile();
    fixture.detectChanges();
    expect(service.createExercise).not.toHaveBeenCalled();
    expect(component.selectedRows()).toHaveLength(1);
    expect(fixture.nativeElement.textContent).toContain('Fila 2');
    expect(fixture.nativeElement.textContent).toContain('Completá el nombre');
    const row = component.rows()[1];
    row.name = 'Remo'; row.videoUrl = 'https://example.com/remo.mp4';
    component.updateVideo(row); row.selected = true;
    await component.importSelected();
    expect(service.createExercise).toHaveBeenCalledTimes(2);
    expect(service.createExercise).toHaveBeenCalledWith(expect.objectContaining({ name: 'Plancha', description: 'Core', videoUrl: 'https://youtu.be/abcdefghijk' }));
    expect(service.createExercise).toHaveBeenCalledWith(expect.objectContaining({ name: 'Remo', description: 'Corregir', videoUrl: 'https://example.com/remo.mp4' }));
  });

  it('clears stale previews when switching source and rejects unsupported files', async () => {
    const component = TestBed.createComponent(YoutubePlaylistImportComponent).componentInstance;
    component.playlistUrl = 'https://youtube.com/playlist?list=PLabcdefghij';
    await component.preview();
    component.changeSource('file');
    expect(component.rows()).toHaveLength(0);
    component.file = new File(['test'], 'test.pdf');
    await component.previewFile();
    expect(service.previewExerciseFile).not.toHaveBeenCalled();
    expect(component.error()).toContain('CSV, XLS o XLSX');
    component.file = new File(['test'], 'test.xlsx');
    service.previewExerciseFile.mockReturnValue(throwError(() => ({ error: { message: 'Archivo dañado' } })));
    await component.previewFile();
    expect(component.error()).toBe('Archivo dañado');
    expect(component.busy()).toBe(false);
  });

  it('checks edited links, repeated file rows and existing non-YouTube videos', async () => {
    service.previewExerciseFile.mockReturnValue(of({ items: [
      { rowNumber: 1, name: 'Plancha', videoUrl: 'https://youtu.be/abcdefghijk', description: 'Core' },
      { rowNumber: 2, name: 'Plancha', videoUrl: 'https://youtube.com/shorts/abcdefghijk', description: 'Core' },
      { rowNumber: 3, name: 'Remo', videoUrl: 'https://example.com/remo.mp4', description: 'Espalda' }
    ], sheetName: 'Ejercicios', skipped: 0, headerSkipped: false }));
    service.getExercises.mockReturnValue(of([{ name: 'Remo', videoUrl: 'https://example.com/remo.mp4', media: [] }]));
    const fixture = TestBed.createComponent(YoutubePlaylistImportComponent);
    const component = fixture.componentInstance;
    component.file = new File(['test'], 'test.xlsx');
    await component.previewFile(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('article')).toHaveLength(3);
    expect(component.rows()[2].state).toBe('existing');
    component.rows()[0].videoUrl = 'javascript:alert(1)';
    expect(component.canImport()).toBe(false);
    component.rows()[0].videoUrl = 'https://youtu.be/abcdefghijk';
    await component.importSelected();
    expect(service.createExercise).toHaveBeenCalledTimes(1);
    expect(component.rows().map(row => row.state)).toEqual(['created', 'existing', 'existing']);
  });

  it('plays only the clicked row when multiple exercises share a video', async () => {
    service.previewExerciseFile.mockReturnValue(of({ items: [1, 2].map(rowNumber => ({
      rowNumber, name: 'Ejercicio ' + rowNumber, description: 'Core', videoUrl: 'https://youtu.be/abcdefghijk'
    })), sheetName: 'CSV', skipped: 0, headerSkipped: false }));
    const fixture = TestBed.createComponent(YoutubePlaylistImportComponent);
    const component = fixture.componentInstance;
    component.file = new File(['test'], 'test.csv');
    await component.previewFile(); fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    (root.querySelector('.video-thumbnail') as HTMLButtonElement).click(); fixture.detectChanges();
    expect(root.querySelectorAll('iframe')).toHaveLength(1);
    expect(root.querySelectorAll('article')[0].querySelector('iframe')).not.toBeNull();
    (root.querySelector('.video-thumbnail') as HTMLButtonElement).click(); fixture.detectChanges();
    expect(root.querySelectorAll('iframe')).toHaveLength(1);
    expect(root.querySelectorAll('article')[1].querySelector('iframe')).not.toBeNull();
    component.selectAll(false); fixture.detectChanges();
    expect(root.querySelectorAll('iframe')).toHaveLength(1);
  });

});
