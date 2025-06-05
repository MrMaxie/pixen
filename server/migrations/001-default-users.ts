import type { Low } from 'lowdb';
import { UserRole } from '@shared/types';
import _ from 'lodash';
import { generateUniqueId } from '../src/utils/generateUniqueId';

export default async (db: Low<unknown>) => {
    const data =
        (db.data as {
            users?: Array<{
                id: string;
                name: string;
                password: string;
                avatar?: string;
                role: UserRole;
            }>;
            sessions?: unknown[];
        }) || {};

    data.users ||= [];
    data.sessions ||= [];

    if (data.users.length > 0) {
        return;
    }

    const uniqueId = () => generateUniqueId(_.map(data.users ?? [], 'id'));

    data.users.push({
        id: uniqueId(),
        name: 'Admin',
        password: 'admin',
        role: UserRole.Admin,
    });
};
