export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  avatarUrl?: string;
  password?: string;
  newPassword?: string;
}
