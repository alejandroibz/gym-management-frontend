export interface Exercise {
  id: number;
  name: string;
  description: string;
  muscleGroup: string;
  musclesInvolved?: string | null;
  primaryMuscleGroupId?: number | null;
  primaryMuscleGroupName?: string | null;
  secondaryMuscleGroupId?: number | null;
  secondaryMuscleGroupName?: string | null;
  muscles: Muscle[];
  media: ExerciseMedia[];
  photoUrl?: string | null;
  videoUrl?: string | null;
  qrSlug?: string | null;
  qrUrl: string;
}

export interface ExerciseMedia {
  id?: number;
  mediaType: 'Image' | 'Video';
  url: string;
  title?: string | null;
  sortOrder: number;
}

export interface MuscleGroup {
  id: number;
  name: string;
  description?: string | null;
  sortOrder: number;
  muscles: Muscle[];
}

export interface Muscle {
  id: number;
  muscleGroupId: number;
  muscleGroupName: string;
  name: string;
  description?: string | null;
  sortOrder: number;
}

export interface ExercisePayload {
  name: string;
  description: string;
  muscleGroup: string;
  musclesInvolved?: string | null;
  primaryMuscleGroupId?: number | null;
  secondaryMuscleGroupId?: number | null;
  muscleIds: number[];
  media?: ExerciseMedia[];
  photoUrl?: string | null;
  videoUrl?: string | null;
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
  scheduleDays: number[];
  clientIds: number[];
  exercises: RoutineExercisePayload[];
}

export interface RoutineAssignment {
  id: number;
  routineId: number;
  clientId: number;
  clientNombre: string;
  clientApellido: string;
  clientDni?: string | null;
  clientAvatarUrl?: string | null;
  name: string;
  description?: string | null;
  level: string;
  goal: string;
  assignedAt: string;
  startsAt?: string | null;
  endsAt?: string | null;
  status: string;
  completionPercent: number;
  scheduleDays: number[];
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

export interface RoutineTemplate {
  id: number;
  name: string;
  description?: string | null;
  level: string;
  goal: string;
  assignmentCount: number;
  planCount: number;
  plans: RoutineTemplatePlan[];
  exercises: RoutineAssignment['exercises'];
}

export interface RoutineTemplatePlan {
  id: number;
  name: string;
  goal: string;
  level: string;
  sortOrder: number;
  dayLabel?: string | null;
}

export interface TrainingPlan {
  id: number;
  name: string;
  description?: string | null;
  level: string;
  goal: string;
  workoutCount: number;
  assignmentCount: number;
  workouts: TrainingPlanWorkout[];
}

export interface TrainingPlanWorkout {
  id: number;
  routineId: number;
  routineName: string;
  goal: string;
  level: string;
  sortOrder: number;
  dayLabel?: string | null;
  notes?: string | null;
  suggestedDayOfWeek?: number | null;
  exerciseCount: number;
}

export interface TrainingPlanAssignment {
  id: number;
  trainingPlanId: number;
  trainingPlanName: string;
  trainingPlanGoal: string;
  trainingPlanLevel: string;
  workoutCount: number;
  clientId: number;
  clientNombre: string;
  clientApellido: string;
  clientDni?: string | null;
  clientAvatarUrl?: string | null;
  assignedAt: string;
  startsAt?: string | null;
  endsAt?: string | null;
  status: string;
}

export interface TrainingPlanPayload {
  name: string;
  description?: string | null;
  level?: string | null;
  goal?: string | null;
  workouts: Array<{
    routineId: number;
    sortOrder: number;
    dayLabel?: string | null;
    notes?: string | null;
    suggestedDayOfWeek?: number | null;
  }>;
}

export interface AssignRoutinePayload {
  clientIds: number[];
  startsAt?: string | null;
  endsAt?: string | null;
  scheduleDays: number[];
}

export interface AssignTrainingPlanPayload {
  clientIds: number[];
  startsAt?: string | null;
  endsAt?: string | null;
}

export interface WorkoutSessionPayload {
  clientId?: number | null;
  routineAssignmentId: number;
  trainingDate: string;
  notes?: string | null;
  exercises: Array<{
    exerciseId: number;
    sortOrder: number;
    notes?: string | null;
    sets: Array<{
      setNumber: number;
      reps?: number | null;
      weight?: number | null;
      restSeconds?: number | null;
      notes?: string | null;
    }>;
  }>;
}

export interface WorkoutSession {
  id: number;
  clientId: number;
  routineAssignmentId: number;
  routineName: string;
  trainingDate: string;
  completedAt: string;
  notes?: string | null;
  exercises: WorkoutSessionPayload['exercises'];
}

export interface AttendanceLog {
  id: number;
  clientId: number;
  date: string;
  source: string;
  workoutSessionId?: number | null;
  notes?: string | null;
}

export interface ExerciseProgressHistory {
  clientId: number;
  exerciseId: number;
  exerciseName: string;
  points: Array<{
    trainingDate: string;
    routineName: string;
    setNumber: number;
    reps?: number | null;
    weight?: number | null;
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
    attendanceCount: number;
    achievementCount: number;
    habitCount: number;
    verifiedPoints: number;
    habitPoints: number;
    totalPoints: number;
  }>;
}

export interface AchievementTemplate {
  id: number;
  code: string;
  name: string;
  description: string;
  points: number;
  icon?: string | null;
  routineId?: number | null;
  routineName?: string | null;
  triggerType: string;
  requiredCount: number;
  tier: string;
  badgeImageUrl?: string | null;
  unlockedCount: number;
}

export interface GamificationMetrics {
  activeAchievements: number;
  badgesEarned: number;
  pointsDelivered: number;
  rankedStudents: number;
  habitEntries: number;
  activeStreaks: number;
}

export interface AchievementPayload {
  code: string;
  name: string;
  description: string;
  points: number;
  icon?: string | null;
  routineId?: number | null;
  triggerType: 'Attendance' | 'WorkoutCompletions' | 'CompletedWorkouts' | 'Streak' | 'Habit' | 'Manual';
  requiredCount: number;
  tier: string;
  badgeImageUrl?: string | null;
}

export interface HabitDefinition {
  id: number;
  code: string;
  name: string;
  description: string;
  category: 'Hydration' | 'Nutrition' | 'Sleep' | 'Mobility' | 'Wellbeing' | 'Other';
  frequency: 'Daily' | 'Weekly' | 'Custom';
  pointsPerEntry: number;
  dailyLimit: number;
  weeklyLimit: number;
  countsForStreak: boolean;
  addsToRanking: boolean;
  isActive: boolean;
  entryCount: number;
}

export type HabitDefinitionPayload = Omit<HabitDefinition, 'id' | 'entryCount'>;

export interface BranchAttendanceSettings {
  id: number;
  nombre: string;
  direccion?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  attendanceRadiusMeters: number;
  attendanceQrToken: string;
}

export interface PointRule {
  id: number;
  code: string;
  name: string;
  description: string;
  points: number;
  isVerified: boolean;
  isActive: boolean;
}
