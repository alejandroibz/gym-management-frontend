import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  readonly exercise = inject<Exercise>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<ExerciseDetailDialogComponent>);

  readonly images = this.exercise.media?.filter(item => item.mediaType === 'Image').map(item => item.url) ?? [];
  readonly videos = this.exercise.media?.filter(item => item.mediaType === 'Video').map(item => item.url) ?? [];
  readonly primaryImage = this.exercise.photoUrl || this.images[0] || null;
  readonly primaryVideo = this.exercise.videoUrl || this.videos[0] || null;

  close(): void {
    this.dialogRef.close();
  }

  isDirectVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
  }
}
