import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { RPCHandler } from '@orpc/server/fetch';
import { rpcRouter } from './rpcRouter';

const app = new Hono();
app.use(cors());

const rpcHandler = new RPCHandler(rpcRouter);

app.use('/rpc/*', async (c, next) => {
    const { matched, response } = await rpcHandler.handle(c.req.raw, {
        prefix: '/rpc',
        context: { headers: c.req.raw.headers },
    });

    if (matched) {
        return c.newResponse(response.body, response);
    }

    await next();
});

export default app;
