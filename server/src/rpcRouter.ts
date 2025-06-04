import { RuntimeData } from './RuntimeData';
import { withAuth, osWithHeaders } from './middlewares/withAuth';
import _ from 'lodash';

const osHeaders = osWithHeaders;
const data = new RuntimeData();

export const rpcRouter = osHeaders.router({
    auth: {
        getUsers: osHeaders.auth.getUsers.handler(async () => {
            return await data.getUsers();
        }),
        login: osHeaders.auth.login.handler(async ({ input }) => {
            const { id, password } = input;
            const user = _.find(data.users, { id, password });

            if (!user) {
                throw new Error('Invalid credentials');
            }

            return await data.spawnSession(user.id);
        }),
        whoami: osHeaders.auth.whoami
            .use(withAuth(data))
            .handler(async ({ context }) => context.user),
        logout: osHeaders.auth.logout
            .use(withAuth(data))
            .handler(async ({ context }) => {
                await data.removeSession(context.user.id);
            })
    }
});
