import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

interface ExerciseBodyMapMuscle {
  id: number;
  name: string;
  muscleGroupName?: string | null;
  bodyMapCoordinates: string[];
}

interface ExerciseBodyMapGroup {
  id: number;
  name: string;
  bodyMapCoordinates: string[];
}

interface BodyArea {
  key: string;
  label: string;
  paths: string[];
}

@Component({
  selector: 'app-exercise-body-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-body-map.html',
  styleUrl: './exercise-body-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseBodyMapComponent {
  @Input() primaryGroup: ExerciseBodyMapGroup | null | undefined;
  @Input() secondaryGroup: ExerciseBodyMapGroup | null | undefined;
  @Input() muscles: ExerciseBodyMapMuscle[] | null | undefined;

  activeAreas(): BodyArea[] {
    const muscleAreas = (this.muscles ?? [])
      .filter(muscle => muscle.bodyMapCoordinates?.length)
      .map(muscle => ({ key: `muscle-${muscle.id}`, label: muscle.name, paths: muscle.bodyMapCoordinates }));
    const groupAreas = [this.primaryGroup, this.secondaryGroup]
      .filter((group): group is ExerciseBodyMapGroup => !!group?.bodyMapCoordinates?.length)
      .map(group => ({ key: `group-${group.id}`, label: group.name, paths: group.bodyMapCoordinates }));
    return [...muscleAreas, ...groupAreas];
  }
}
