import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TrainingBatchBuilderComponent } from '../../components/training-batch-builder/training-batch-builder';

@Component({
  selector: 'app-training-plan-create-page',
  standalone: true,
  imports: [TrainingBatchBuilderComponent],
  template: '<app-training-batch-builder mode="plans" />',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingPlanCreatePageComponent {}
