import { UserRole, type Session, type User } from '@shared/types';

export class RuntimeData {
    users: User[] = [
        {
            id: '1',
            name: 'Alice',
            password: 'password1',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            role: UserRole.Admin,
        },
        {
            id: '2',
            name: 'Bob',
            password: 'password2',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            role: UserRole.User,
        },
        {
            id: '3',
            name: 'Charlie',
            password: 'password3',
            avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
            role: UserRole.ReadOnly,
        },
    ];

    sessions: Session[] = [];
}