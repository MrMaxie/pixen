import { implement } from '@orpc/server';
import { contract } from '@shared/contract';
import { RuntimeData } from './RuntimeData';
import _ from 'lodash';

const os = implement(contract);
const data = new RuntimeData();

export const rpcRouter = os.router({
    auth: {
        getUsers: os.auth.getUsers.handler(async () =>
            _.map(data.users, user => ({
                id: user.id,
                name: user.name,
                avatar: user.avatar,
            }))
        ),
        login: os.auth.login.handler(async ({ input }) => {
            const { id, password } = input;
            const user = _.find(data.users, { id, password });

            if (!user) {
                throw new Error('Invalid credentials');
            }

            const token = _.uniqueId('token_');

            data.sessions = data.sessions.filter(session => session.userId !== user.id);

            const session = {
                userId: user.id,
                token,
                expiresAt: new Date(Date.now() + 3600000), // 1 hour
            };

            data.sessions.push(session);

            return {
                userId: user.id,
                token,
            };
        }),
    }
});