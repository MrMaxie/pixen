import { RuntimeData } from './RuntimeData';
import { withAuth, osWithHeaders } from './middlewares/withAuth';

const osHeaders = osWithHeaders;
const data = new RuntimeData();

export const rpcRouter = osHeaders.router({
    auth: {
        getUsers: osHeaders.auth.getUsers.handler(async () => {
            return await data.getUsers();
        }),
        login: osHeaders.auth.login.handler(async ({ input }) => {
            const { id, password } = input;
            return await data.login(id, password);
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
