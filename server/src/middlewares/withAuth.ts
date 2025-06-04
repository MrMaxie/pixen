import { implement } from '@orpc/server';
import { contract } from '@shared/contract';
import type { RuntimeData } from '../RuntimeData';

export const osWithHeaders = implement(contract).$context<{ headers: Headers }>();

export const withAuth = (data: RuntimeData) =>
    osWithHeaders.middleware(async ({ context, next }) => {
        const token = context.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            throw new Error('Unauthorized');
        }

        const user = await data.whoami(token);

        return next({
            context: {
                user: {
                    ...user,
                },
            },
        });
    });



