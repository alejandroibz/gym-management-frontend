export interface UserProfile {
  id: number;
  profileType: 'Student' | 'Employee' | 'User';
  role: string;
  nombre: string;
  apellido: string;
  email?: string | null;
  telefono?: string | null;
  direccion?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
}

export interface UserProfilePayload {
  nombre: string;
  apellido: string;
  telefono?: string | null;
  direccion?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
}

export interface UploadedFile {
  url: string;
  downloadUrl: string;
  blobName: string;
  fileName: string;
  contentType: string;
  size: number;
}
