import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { ContractRouterClient } from '@orpc/contract';
import { contract } from '@shared/contract';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const link = new RPCLink({
    url: `${SERVER_URL}/rpc`,
    headers: () => ({}),
});

export const client: ContractRouterClient<typeof contract> = createORPCClient(link);
