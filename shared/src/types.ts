export enum UserRole {
    Admin = 'admin',
    User = 'user',
    Guest = 'readonly',
}

export type User = {
    id: string;
    name: string;
    password: string;
    avatar: string;
    role: UserRole;
};

export type FrontendUser = Omit<User, 'password'>;

export type Session = {
    userId: string;
    token: string;
    expiresAt: Date;
};
