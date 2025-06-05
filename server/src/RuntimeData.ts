import type { FrontendUser, Session } from '@shared/types';
import _ from 'lodash';
import { db, getDatabase } from './db';

export class RuntimeData {
    async getUsers(): Promise<FrontendUser[]> {
        const db = getDatabase();
        return db.chain
            .get('users')
            .map((user) => ({
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                role: user.role,
            }))
            .value();
    }

    async whoami(token: string): Promise<FrontendUser> {
        const db = getDatabase();
        const session = db.chain.get('sessions').find({ token }).value();
        if (!session) {
            throw new Error('Unauthorized');
        }
        const user = db.chain.get('users').find({ id: session.userId }).value();
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
        const db = getDatabase();
        const user = db.chain.get('users').find({ id: userId, password }).value();
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return await this.spawnSession(user.id);
    }

    async spawnSession(userId: string) {
        const db = getDatabase();
        const existingSession = db.chain.get('sessions').find({ userId }).value();

        if (existingSession) {
            db.data.sessions = db.chain.get('sessions')
                .reject({ userId })
                .value();
        }

        const token = _.uniqueId('token_');
        const session: Session = {
            userId,
            token,
            expiresAt: new Date(Date.now() + 3600000), // 1 hour
        };

        db.data.sessions.push(session);
        await db.write();
        return session;
    }

    async removeSession(userId: string) {
        const db = getDatabase();
        db.data.sessions = db.chain.get('sessions')
            .reject({ userId })
            .value();
        await db.write();
    }
}
