import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

type BodyMapZoneKey =
  | 'pectorals'
  | 'obliques'
  | 'posterior_tibialis'
  | 'extensors'
  | 'triceps'
  | 'rotators'
  | 'traps'
  | 'lats'
  | 'hamstrings'
  | 'iliotibial_bands'
  | 'glutes'
  | 'lower_back'
  | 'shoulders'
  | 'flexors'
  | 'biceps'
  | 'abs'
  | 'adductors'
  | 'quads'
  | 'shins'
  | 'feet'
  | 'calves';

interface CalibrationPoint {
  x: number;
  y: number;
}

@Component({
  selector: 'app-body-map-calibrator-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body-map-calibrator-page.html',
  styleUrl: './body-map-calibrator-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyMapCalibratorPageComponent implements AfterViewInit {
  @ViewChild('overlay', { static: true }) private overlayRef!: ElementRef<SVGSVGElement>;
  @ViewChild('savedPaths', { static: true }) private savedPathsRef!: ElementRef<SVGGElement>;
  @ViewChild('activeLine', { static: true }) private activeLineRef!: ElementRef<SVGPolylineElement>;
  @ViewChild('activePoints', { static: true }) private activePointsRef!: ElementRef<SVGGElement>;

  readonly zones: Array<{ key: BodyMapZoneKey; label: string }> = [
    { key: 'pectorals', label: 'Pectorales' },
    { key: 'obliques', label: 'Oblicuos' },
    { key: 'posterior_tibialis', label: 'Tibiales posteriores' },
    { key: 'extensors', label: 'Extensores' },
    { key: 'triceps', label: 'Triceps' },
    { key: 'rotators', label: 'Rotadores' },
    { key: 'traps', label: 'Trapecios' },
    { key: 'lats', label: 'Laterales' },
    { key: 'hamstrings', label: 'Isquiotibiales' },
    { key: 'iliotibial_bands', label: 'Cintillas iliotibiales' },
    { key: 'glutes', label: 'Gluteos' },
    { key: 'lower_back', label: 'Musculos lumbares' },
    { key: 'shoulders', label: 'Hombros' },
    { key: 'flexors', label: 'Flexores' },
    { key: 'biceps', label: 'Biceps' },
    { key: 'abs', label: 'Abdominales' },
    { key: 'adductors', label: 'Aductores' },
    { key: 'quads', label: 'Cuadriceps' },
    { key: 'shins', label: 'Espinillas' },
    { key: 'feet', label: 'Pies' },
    { key: 'calves', label: 'Pantorrillas' }
  ];

  selectedZone: BodyMapZoneKey = 'pectorals';
  coordsText = 'x: -, y: -';
  pathOutput = '';
  private readonly storageKey = 'gym-body-map-calibration-v1';
  private activePoints: CalibrationPoint[] = [];
  private pathsByZone: Partial<Record<BodyMapZoneKey, string[]>> = {};

  ngAfterViewInit(): void {
    this.pathsByZone = this.migrateLegacyZones(JSON.parse(localStorage.getItem(this.storageKey) || '{}'));
    this.renderActive();
    this.renderSaved();
    this.updateOutput();
  }

  selectZone(value: string): void {
    this.selectedZone = value as BodyMapZoneKey;
    this.activePoints = [];
    this.renderActive();
    this.renderSaved();
    this.updateOutput();
  }

  addPoint(event: MouseEvent): void {
    if (event.detail > 1) return;
    const point = this.toSvgPoint(event);
    this.activePoints.push(point);
    this.coordsText = `x: ${point.x}, y: ${point.y}`;
    this.renderActive();
  }

  updateCoords(event: MouseEvent): void {
    const point = this.toSvgPoint(event);
    this.coordsText = `x: ${point.x}, y: ${point.y}`;
  }

  closeCurrentPath(): void {
    if (this.activePoints.length < 3) return;
    const current = this.pathsByZone[this.selectedZone] ?? [];
    this.pathsByZone[this.selectedZone] = [...current, this.pointsToPath(this.activePoints)];
    this.activePoints = [];
    this.save();
    this.renderActive();
  }

  startNewPath(): void {
    this.activePoints = [];
    this.renderActive();
  }

  undoPoint(): void {
    this.activePoints.pop();
    this.renderActive();
  }

  clearZone(): void {
    delete this.pathsByZone[this.selectedZone];
    this.activePoints = [];
    this.save();
    this.renderActive();
  }

  async copyPath(): Promise<void> {
    await navigator.clipboard.writeText(this.pathOutput);
  }

  async exportJson(): Promise<void> {
    await navigator.clipboard.writeText(JSON.stringify(this.pathsByZone, null, 2));
  }

  pathCount(zoneKey: BodyMapZoneKey): number {
    return this.pathsByZone[zoneKey]?.length ?? 0;
  }

  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.pathsByZone));
    this.renderSaved();
    this.updateOutput();
  }

  private toSvgPoint(event: MouseEvent): CalibrationPoint {
    const overlay = this.overlayRef.nativeElement;
    const point = overlay.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const transformed = point.matrixTransform(overlay.getScreenCTM()!.inverse());
    return { x: Math.round(transformed.x), y: Math.round(transformed.y) };
  }

  private pointsToPath(points: CalibrationPoint[]): string {
    return `M${points.map(point => `${point.x} ${point.y}`).join(' L')} Z`;
  }

  private renderActive(): void {
    this.activeLineRef.nativeElement.setAttribute('points', this.activePoints.map(point => `${point.x},${point.y}`).join(' '));
    this.activePointsRef.nativeElement.innerHTML = this.activePoints
      .map(point => `<circle cx="${point.x}" cy="${point.y}" r="8" fill="#ef4444" stroke="#fff" stroke-width="2"></circle>`)
      .join('');
  }

  private renderSaved(): void {
    this.savedPathsRef.nativeElement.innerHTML = Object.entries(this.pathsByZone)
      .flatMap(([key, paths]) => (paths ?? []).map(path =>
        `<path d="${path}" fill="${key === this.selectedZone ? 'rgba(93,143,240,.42)' : 'rgba(148,163,184,.16)'}" stroke="${key === this.selectedZone ? '#2563eb' : '#64748b'}" stroke-width="4"></path>`
      ))
      .join('');
  }

  private updateOutput(): void {
    this.pathOutput = (this.pathsByZone[this.selectedZone] ?? []).join(' ');
  }

  private migrateLegacyZones(paths: Record<string, string[]>): Partial<Record<BodyMapZoneKey, string[]>> {
    const migrated = { ...paths };
    const legacyZoneKeys: Record<string, BodyMapZoneKey> = {
      chest: 'pectorals',
      back: 'lats',
      forearms: 'flexors',
      core: 'abs'
    };

    for (const [legacyKey, nextKey] of Object.entries(legacyZoneKeys)) {
      if (!migrated[legacyKey]?.length) continue;
      migrated[nextKey] = [...(migrated[nextKey] ?? []), ...migrated[legacyKey]];
      delete migrated[legacyKey];
    }

    localStorage.setItem(this.storageKey, JSON.stringify(migrated));
    return migrated as Partial<Record<BodyMapZoneKey, string[]>>;
  }
}
