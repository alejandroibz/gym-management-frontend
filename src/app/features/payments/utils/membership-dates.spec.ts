import { describe, expect, it } from 'vitest';
import { membershipEnd, nextDay } from './membership-dates';
describe('Cobertura por fechas',()=>{
it('un pase diario incluye un solo día',()=>expect(membershipEnd('2026-09-02','Days',1)).toBe('2026-09-02'));
it('mensual con continuidad del 2/9 al 1/10',()=>expect(membershipEnd(nextDay('2026-09-01'),'Months',1,2)).toBe('2026-10-01'));
it('reinicio el 4/9',()=>expect(membershipEnd('2026-09-04','Months',1)).toBe('2026-10-03'));
it('trimestral',()=>expect(membershipEnd('2026-09-04','Months',3)).toBe('2026-12-03'));
it('recupera el ancla después de febrero',()=>expect(membershipEnd('2026-02-28','Months',1,31)).toBe('2026-03-30'));
it('año bisiesto',()=>expect(membershipEnd('2024-02-29','Years',1)).toBe('2025-02-27'));
});