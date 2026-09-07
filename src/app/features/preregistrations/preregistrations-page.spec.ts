import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { PreregistrationDetailComponent } from './preregistrations-page';
import { ApplicantDetail, PreregistrationsService } from './preregistrations.service';

describe('Preregistration admin detail', () => {
  let row: ApplicantDetail;
  const get = vi.fn();
  const edit = vi.fn();
  const close = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    row = {
      id: 901, firstName: 'Ficticia', lastName: 'Local', documentNumber: '99009001',
      whatsapp: '1100000000', email: 'ficticia@example.invalid', desiredStartDate: '2090-09-04',
      weeklyFrequency: '2', preferredShift: 'Mañana (07:00 a 12:00)', receivedAtUtc: '2026-09-06T12:00:00Z',
      status: 'Pending', clientId: null, version: 'version-original', birthDate: '1995-01-02',
      address: 'Domicilio ficticio', goalsAndBackground: 'Objetivo ficticio de entrenamiento',
      healthConsiderations: 'Antecedente ficticio declarado', consent: true, sensitiveDataConsent: true,
      consentVersion: 'landing-v1', source: 'landing', followUpNotes: '', updatedAtUtc: null,
      updatedBy: null, matchingClients: [], original: { firstName: 'Ficticia' }, history: []
    };
    get.mockImplementation(() => of(structuredClone(row)));
    edit.mockReturnValue(of(undefined));
    TestBed.configureTestingModule({
      imports: [PreregistrationDetailComponent],
      providers: [
        provideRouter([]),
        { provide: MAT_DIALOG_DATA, useValue: 901 },
        { provide: MatDialogRef, useValue: { close, disableClose: false } },
        { provide: MatDialog, useValue: { open: vi.fn() } },
        { provide: PreregistrationsService, useValue: { get, edit } }
      ]
    });
  });
  async function render() {
    const fixture = TestBed.createComponent(PreregistrationDetailComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }
  it('renders declared data and preserves the original when saving a correction', async () => {
    const fixture = await render();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain(row.documentNumber);
    expect(text).toContain(row.healthConsiderations);
    expect(text).toContain(row.goalsAndBackground);
    const button = Array.from(fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>)
      .find(x => x.textContent?.includes('Editar datos'));
    button!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('input[name="firstName"]') as HTMLInputElement;
    input.value = 'Corregida';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    row = { ...row, firstName: 'Corregida', version: 'version-nueva',
      history: [{ id: 1, changedAtUtc: '2026-09-06T13:00:00Z', changedBy: 'admin-test', action: 'Edited', data: { firstName: 'Corregida' } }] };
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(edit).toHaveBeenCalledWith(901, 'version-original', expect.objectContaining({ firstName: 'Corregida' }));
    expect(fixture.componentInstance.item()!.original['firstName']).toBe('Ficticia');
    expect(fixture.nativeElement.textContent).toContain('Historial de cambios (1)');
  });
  it('opens client creation with the selected preregistration', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = await render();
    const button = Array.from(fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>)
      .find(x => x.textContent?.includes('Dar de alta como cliente'));
    button!.click();
    expect(close).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/clients/new'], { queryParams: { preregistrationId: 901, returnUrl: '/preregistrations' } });
  });
  it('keeps a failed edit available and displays the server conflict', async () => {
    edit.mockReturnValue(throwError(() => ({ error: { message: 'La ficha cambió; recargá antes de guardar.' } })));
    const fixture = await render();
    fixture.componentInstance.startEdit();
    fixture.componentInstance.save();
    fixture.detectChanges();
    expect(fixture.componentInstance.editing()).toBe(true);
    expect(fixture.componentInstance.saving()).toBe(false);
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('La ficha cambió');
  });
  it('does not offer another enrollment or editing after the client is linked', async () => {
    row.clientId = 123;
    row.status = 'Enrolled';
    const fixture = await render();
    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    expect(Array.from(buttons).some(x => x.textContent?.includes('Dar de alta'))).toBe(false);
    expect(Array.from(buttons).some(x => x.textContent?.includes('Editar datos'))).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('Ver cliente #123');
  });
});
