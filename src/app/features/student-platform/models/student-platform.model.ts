export interface Exercise {
  id: number;
  name: string;
  description: string;
  muscleGroup: string;
  musclesInvolved?: string | null;
  photoUrl?: string | null;
  videoUrl?: string | null;
  qrSlug?: string | null;
  qrUrl: string;
}

export interface ExercisePayload {
  name: string;
  description: string;
  muscleGroup: string;
  musclesInvolved?: string | null;
  photoUrl?: string | null;
  videoUrl?: string | null;
  qrSlug?: string | null;
}

export interface RoutineExercisePayload {
  exerciseId: number;
  sortOrder: number;
  sets?: number | null;
  reps?: number | null;
  weight?: number | null;
  restSeconds?: number | null;
  notes?: string | null;
}

export interface RoutinePayload {
  name: string;
  description?: string | null;
  level?: string | null;
  goal?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  clientIds: number[];
  exercises: RoutineExercisePayload[];
}

export interface RoutineAssignment {
  id: number;
  routineId: number;
  name: string;
  description?: string | null;
  level: string;
  goal: string;
  assignedAt: string;
  startsAt?: string | null;
  endsAt?: string | null;
  status: string;
  completionPercent: number;
  exercises: Array<{
    id: number;
    exerciseId: number;
    exerciseName: string;
    muscleGroup: string;
    sortOrder: number;
    sets?: number | null;
    reps?: number | null;
    weight?: number | null;
    restSeconds?: number | null;
    notes?: string | null;
  }>;
}

export interface RankingResponse {
  period: string;
  metric: string;
  from: string;
  to: string;
  items: Array<{
    position: number;
    clientId: number;
    nombre: string;
    apellido: string;
    avatarUrl?: string | null;
    score: number;
    metric: string;
  }>;
}
