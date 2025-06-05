import { promises as fs } from 'fs';
import path from 'path';
import type { Low } from 'lowdb';
import _ from 'lodash';
import type { DbData } from './db';

export class Migrator {
    constructor(private db: Low<DbData>, private dir = path.join(process.cwd(), 'migrations')) {}

    async migrate() {
        await this.db.read();
        this.db.data ||= { users: [], sessions: [], _migrations: [] };

        const applied = this.db.data!._migrations || [];
        let files: string[] = [];
        try {
            files = await fs.readdir(this.dir);
        } catch {
            return;
        }

        const migrations = files.filter(f => f.endsWith('.ts')).sort();
        const pending = _.difference(migrations, applied);
        if (pending.length === 0) return;

        for (const file of pending) {
            const modulePath = path.join(this.dir, file);
            const migration = await import(modulePath);
            if (typeof migration.default === 'function') {
                await migration.default(this.db);
            }
            applied.push(file);
        }
        await this.db.write();
    }
}
