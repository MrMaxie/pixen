import { BrowserRouter, Routes, Route } from 'react-router';
import { Center, Loader } from '@mantine/core';
import { Login } from '@/pages/Login';
import { Gallery } from '@/pages/Gallery';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Shell } from './components/Shell';
import { Tags } from './pages/Tags';
import { Upload } from './pages/Upload';
import { InteractiveGallery } from './pages/InteractiveGallery';

export const App = observer(() => {
    const store = useStore();

    useEffect(() => {
        store.initWhoamiReaction();
    }, []);

    if (store.isWhoamiLoading) {
        return (
            <Center h="100vh">
                <Loader size="md" type="dots" color="blue" />
            </Center>
        );
    }

    if (!store.loggedUser) {
        return <Login />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Shell />}>
                    <Route index element={<Gallery />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="tags" element={<Tags />} />
                    <Route path="upload" element={<Upload />} />
                </Route>
                <Route path="interactive-gallery" element={<InteractiveGallery />} />
                <Route path="*" element={<Gallery />} />
            </Routes>
        </BrowserRouter>
    );
});
