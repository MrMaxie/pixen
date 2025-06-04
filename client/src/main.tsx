import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import './index.css';
import { App } from './App.tsx';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { StoreProvider } from '@/store';

const main = () => {
    const $root = document.getElementById('root');

    if (!$root) {
        throw new Error('Root element not found');
    }

    createRoot($root).render(
        <StrictMode>
            <StoreProvider>
                <MantineProvider theme={theme} defaultColorScheme="dark">
                    <App />
                </MantineProvider>
            </StoreProvider>
        </StrictMode>,
    );
};

main();
