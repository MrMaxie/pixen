import { UserRole } from '@shared/types';

export const getRoleName = (role: UserRole): string => {
    switch (role) {
        case UserRole.Admin:
            return 'Admin';
        case UserRole.User:
            return 'User';
        case UserRole.Guest:
            return 'Guest';
        default:
            return 'Unknown Role';
    }
};