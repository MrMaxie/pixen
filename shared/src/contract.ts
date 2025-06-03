import { oc } from '@orpc/contract';
import { z } from 'zod';

const getUsers = oc
    .output(z.object({
        id: z.string(),
        name: z.string(),
        avatar: z.string(),
    }).array());

const login = oc
    .input(z.object({
        id: z.string(),
        password: z.string().min(2, {
            message: 'Password must be at least 2 characters long',
        }),
    }))
    .output(z.object({
        userId: z.string(),
        token: z.string(),
    }));

const whoami = oc.output(
    z.object({
        id: z.string(),
        name: z.string(),
        avatar: z.string(),
    }),
);

export const contract = {
    auth: {
        getUsers,
        login,
        whoami,
    },
};