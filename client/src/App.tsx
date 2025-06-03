import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Center, Loader } from '@mantine/core';
import { Login } from '@/pages/Login';
import { Home } from '@/pages/Home';
import { store } from '@/store';
import { autorun } from 'mobx';
import { client } from '@/client';
import type { FrontendUser } from '@shared/types';


export const App = () => {
    const [token, setToken] = useState(store.token);
    const [user, setUser] = useState<FrontendUser | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const dispose = autorun(() => {
            setToken(store.token);
        });
        return dispose;
    }, []);

    useEffect(() => {
        if (!token) {
            setUser(null);
            return;
        }

        setLoading(true);
        client.auth
            .whoami()
            .then(u => {
                setUser(u);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                store.setToken(null);
                setLoading(false);
            });
    }, [token]);

    if (!token) {
        return <Login />;
    }

    if (loading || user === null) {
        return (
            <Center h="100vh">
                <Loader size="md" type="dots" color="blue" />
            </Center>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};
