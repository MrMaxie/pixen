import { UserRole, type FrontendUser, type Session, type User } from '@shared/types';
import _ from 'lodash';

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

    async getUsers(): Promise<FrontendUser[]> {
        return this.users.map(user => ({
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
        }));
    }

    async whoami(token: string): Promise<FrontendUser> {
        const session = this.sessions.find(session => session.token === token);
        if (!session) {
            throw new Error('Unauthorized');
        }
        const user = this.users.find(user => user.id === session.userId);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
        };
    }

    async login(userId: string, password: string) {
        const user = _.find(this.users, { id: userId, password });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return await this.spawnSession(user.id);
    }

    async spawnSession(userId: string) {
        const existingSession = _.find(this.sessions, { userId });

        if (existingSession) {
            this.sessions = this.sessions.filter(session => session.userId !== userId);
        }

        const token = _.uniqueId('token_');
        const session: Session = {
            userId,
            token,
            expiresAt: new Date(Date.now() + 3600000), // 1 hour
        };

        this.sessions.push(session);
        return session;
    }

    async removeSession(userId: string) {
        this.sessions = this.sessions.filter(session => session.userId !== userId);
    }
}