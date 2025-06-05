import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import lodash from 'lodash';
import type { User, Session } from '@shared/types';
import { Migrator } from './Migrator';

export type DbData = {
    users: User[];
    sessions: Session[];
    _migrations: string[];
};

const defaultData: DbData = {
    users: [],
    sessions: [],
    _migrations: [],
};

export class LowWithLodash<T> extends Low<T> {
    chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data');
}

const adapter = new JSONFile<DbData>('db.json');
export const db = new LowWithLodash<DbData>(adapter, defaultData);

export const initDatabase = async () => {
    await db.read();
    db.data ||= defaultData;
    await new Migrator(db).migrate();
    await db.write();
};

export const getDatabase = (): LowWithLodash<DbData> => {
    if (!db.data) {
        throw new Error('Database not initialized');
    }
    return db;
};
