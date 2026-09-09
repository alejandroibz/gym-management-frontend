import { Client, ClientMembership } from '../../clients/models/client.model';
export interface PaymentPeriod {
  continuePreviousPeriod?: boolean;
  clientMembershipId: number;
  coverageMode: string;
  membershipStartDate: string;
  membershipEndDate: string;
  contractAmount: number;
  monto: number;
}
export function activeContracts(client: Client | null): ClientMembership[] {
  return (
    client?.membershipsHistory?.length
      ? client.membershipsHistory
      : client?.membership
        ? [client.membership]
        : []
  )
    .filter((m) => !!m.id && m.activo !== false && m.estado === 'Active')
    .sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));
}
export function availableBalance(client: Client | null, m: ClientMembership): number {
  const paid = (client?.payments ?? [])
    .filter((p) => Number(p['clientMembershipId']) === m.id && p['activo'] !== false)
    .reduce((sum, p) => sum + Number(p['monto'] ?? 0), 0);
  return Math.max(0, Math.round((m.precioFinal - paid) * 100) / 100);
}
export function isMembershipIncome(name: string): boolean {
  return (
    name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase() === 'cobro membresias'
  );
}
