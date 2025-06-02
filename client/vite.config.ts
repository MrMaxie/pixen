import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@client': path.resolve(__dirname, './src'),
            '@server': path.resolve(__dirname, '../server/src'),
            '@shared': path.resolve(__dirname, '../shared/src'),
        },
    },
});
