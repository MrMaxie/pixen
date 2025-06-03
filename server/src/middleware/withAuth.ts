import { implement } from '@orpc/server';
import { contract } from '@shared/contract';
import type { RuntimeData } from '../RuntimeData';

export const osWithHeaders = implement(contract).$context<{ headers: Headers }>();

export const withAuth = (data: RuntimeData) =>
    osWithHeaders.middleware(({ context, next }) => {
            const token = context.headers.get('authorization')?.split(' ')[1];

            if (!token) {
                throw new Error('Unauthorized');
            }

            const session = data.sessions.find(s => s.token === token);

            if (!session) {
                throw new Error('Unauthorized');
            }

            const user = data.users.find(u => u.id === session.userId);

            if (!user) {
                throw new Error('Unauthorized');
            }

            return next({
                context: {
                    user: {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                    },
                },
            });
        });



