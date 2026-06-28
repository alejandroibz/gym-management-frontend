import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { UploadedFile, UserProfile, UserProfilePayload } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/Profile`;
  private readonly filesUrl = `${environment.apiUrl}/api/files`;

  getMe(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/me`);
  }

  updateMe(payload: UserProfilePayload): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/me`, payload);
  }

  uploadAvatar(file: File): Observable<UploadedFile> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadedFile>(`${this.filesUrl}?folder=profiles`, formData);
  }
}
