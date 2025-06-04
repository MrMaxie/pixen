import { oc } from '@orpc/contract';
import { z } from 'zod';
import { UserRole } from './types';

const getUsers = oc
    .output(z.object({
        id: z.string(),
        name: z.string(),
        avatar: z.string(),
        role: z.nativeEnum(UserRole),
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
        role: z.nativeEnum(UserRole),
    }),
);

const logout = oc.output(z.void());

export const contract = {
    auth: {
        getUsers,
        login,
        whoami,
        logout,
    },
};