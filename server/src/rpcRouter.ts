import { RuntimeData } from './RuntimeData';
import { withAuth, osWithHeaders } from './middleware/withAuth';
import _ from 'lodash';

const osHeaders = osWithHeaders;
const data = new RuntimeData();


export const rpcRouter = osHeaders.router({
    auth: {
        getUsers: osHeaders.auth.getUsers.handler(async () =>
            _.map(data.users, user => ({
                id: user.id,
                name: user.name,
                avatar: user.avatar,
            }))
        ),
        login: osHeaders.auth.login.handler(async ({ input }) => {
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
        whoami: osHeaders.auth.whoami
            .use(withAuth(data))
            .handler(async ({ context }) => context.user),
    }
});
