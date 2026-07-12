import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BODY_ZONE_PATHS, BodyZoneKey } from '../../pages/student-platform-page/body-zone-paths';

interface ExerciseBodyMapMuscle {
  name: string;
  muscleGroupName?: string | null;
}

interface BodyZone {
  key: BodyZoneKey;
  label: string;
  synonyms: string[];
}

const BODY_ZONES: BodyZone[] = [
  { key: 'pectorals', label: 'Pectorales', synonyms: ['pectorales', 'pectoral', 'pecho'] },
  { key: 'obliques', label: 'Oblicuos', synonyms: ['oblicuo', 'oblicuos'] },
  { key: 'posterior_tibialis', label: 'Tibiales posteriores', synonyms: ['tibial posterior', 'tibiales posteriores'] },
  { key: 'extensors', label: 'Extensores', synonyms: ['extensor', 'extensores'] },
  { key: 'triceps', label: 'Triceps', synonyms: ['tricep', 'triceps'] },
  { key: 'rotators', label: 'Rotadores', synonyms: ['rotador', 'rotadores', 'manguito rotador'] },
  { key: 'traps', label: 'Trapecios', synonyms: ['trapecio', 'trapecios'] },
  { key: 'lats', label: 'Laterales', synonyms: ['laterales', 'dorsal', 'dorsales', 'dorsal ancho'] },
  { key: 'hamstrings', label: 'Isquiotibiales', synonyms: ['isquio', 'isquios', 'femoral', 'isquiotibial', 'isquiotibiales'] },
  { key: 'iliotibial_bands', label: 'Cintillas iliotibiales', synonyms: ['cintilla iliotibial', 'cintillas iliotibiales', 'tracto iliotibial'] },
  { key: 'glutes', label: 'Gluteos', synonyms: ['gluteo', 'gluteos'] },
  { key: 'lower_back', label: 'Musculos lumbares', synonyms: ['musculo lumbar', 'musculos lumbares', 'lumbar', 'lumbares', 'erector', 'erectores'] },
  { key: 'shoulders', label: 'Hombros', synonyms: ['hombro', 'hombros', 'delto', 'deltoides'] },
  { key: 'flexors', label: 'Flexores', synonyms: ['flexor', 'flexores'] },
  { key: 'biceps', label: 'Biceps', synonyms: ['bicep', 'biceps', 'braquial'] },
  { key: 'abs', label: 'Abdominales', synonyms: ['abdomen', 'abdominal', 'abdominales', 'recto abdominal', 'core'] },
  { key: 'adductors', label: 'Aductores', synonyms: ['aductor', 'aductores'] },
  { key: 'quads', label: 'Cuadriceps', synonyms: ['cuadricep', 'cuadriceps'] },
  { key: 'shins', label: 'Espinillas', synonyms: ['espinilla', 'espinillas', 'tibial anterior'] },
  { key: 'feet', label: 'Pies', synonyms: ['pie', 'pies'] },
  { key: 'calves', label: 'Pantorrillas', synonyms: ['pantorrilla', 'pantorrillas', 'gemelo', 'gemelos', 'soleo'] }
];

@Component({
  selector: 'app-exercise-body-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-body-map.html',
  styleUrl: './exercise-body-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseBodyMapComponent {
  @Input() muscleGroup: string | null | undefined;
  @Input() secondaryMuscleGroup: string | null | undefined;
  @Input() musclesInvolved: string | null | undefined;
  @Input() muscles: ExerciseBodyMapMuscle[] | null | undefined;

  readonly zones = BODY_ZONES;
  readonly paths = BODY_ZONE_PATHS;

  activeZones(): BodyZone[] {
    const text = this.searchText();
    if (!text) return [];
    return BODY_ZONES.filter(zone => zone.synonyms.some(synonym => text.includes(this.normalize(synonym))));
  }

  hasActiveZone(key: BodyZoneKey): boolean {
    return this.activeZones().some(zone => zone.key === key);
  }

  private searchText(): string {
    const structuredMuscles = (this.muscles ?? [])
      .map(muscle => `${muscle.name} ${muscle.muscleGroupName ?? ''}`)
      .join(' ');

    return this.normalize([
      this.muscleGroup ?? '',
      this.secondaryMuscleGroup ?? '',
      this.musclesInvolved ?? '',
      structuredMuscles
    ].join(' '));
  }

  private normalize(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  }
}
