export enum WeeklyShift { Morning = 1, Afternoon = 2, Night = 3 }
export interface ScheduleSlot { dayOfWeek: number; shift: WeeklyShift; }
export interface TrainerSchedule { employeeId: number; trainerName: string; branchId: number; active: boolean; slots: ScheduleSlot[]; }
export interface WeeklyAssignment {
  id: number; clientId: number; clientName: string; branchId: number; clientActive: boolean;
  dayOfWeek: number; shift: WeeklyShift; attendanceTime?: string | null; employeeId: number;
  trainerName: string; trainerActive: boolean; hasCoverage: boolean; hasAlert: boolean;
}
export interface BulkAssignmentPayload { clientIds: number[]; days: number[]; shift: WeeklyShift; employeeId: number; attendanceTime?: string | null; }
export interface BulkAssignmentPreview { newCount: number; replacedCount: number; skippedCount: number; invalidCount: number; errors: string[]; }
