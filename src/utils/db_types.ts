export type UserRole = 
  | 'admin'
  | 'data_provider'
  | 'contributor'
  | 'user';

export interface UserProfile {
  id?: string;
  role: UserRole;
  created_at?: string;
  full_name: string | null;
  phone: string | null;
  organization: string | null;
}
