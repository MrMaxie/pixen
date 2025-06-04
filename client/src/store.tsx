import type { FrontendUser } from '@shared/types';
import { autorun, makeAutoObservable, observable, runInAction } from 'mobx';
import { client } from './client';
import { createContext, useContext, type PropsWithChildren } from 'react';
import { observer } from 'mobx-react';

const TOKEN_KEY = 'token';

class Store {
    token: string | null = null;

    loggedUser: FrontendUser | null = null;

    isWhoamiLoading = false;

    constructor() {
        makeAutoObservable(this);
        const stored = window.localStorage.getItem(TOKEN_KEY);
        this.token = stored ? stored : null;
    }

    isWhoamiReactionSetupped = false;

    initWhoamiReaction() {
        if (this.isWhoamiReactionSetupped) return;

        this.isWhoamiReactionSetupped = true;

        autorun(() => {
            const token = this.token;

            console.log('Token changed:', token);

            if (token) {
                this.loadWhoami();
            } else {
                runInAction(() => {
                    this.setLoggedUser(null);
                });
            }
        });
    }

    setToken(token: string | null) {
        this.token = token;
        if (token === null) {
            window.localStorage.removeItem(TOKEN_KEY);
        } else {
            window.localStorage.setItem(TOKEN_KEY, token);
        }
    }

    setLoggedUser(user: FrontendUser | null) {
        this.loggedUser = user;

        if (!user) {
            this.setToken(null);
        }
    }

    getCurrentUser() {
        if (!this.loggedUser) {
            throw new Error('User is not logged in');
        }

        return this.loggedUser;
    }

    logout() {
        client.auth.logout().catch(() => {
            // swallow error
        });
        this.setLoggedUser(null);
        this.setToken(null);
    }

    async loadWhoami() {
        runInAction(() => {
            this.isWhoamiLoading = true;
        });

        const token = this.token;

        if (!token) {
            runInAction(() => {
                this.setLoggedUser(null);
                this.isWhoamiLoading = false;
            });
            return;
        }

        try {
            const response = await client.auth.whoami();
            runInAction(() => {
                this.setLoggedUser(response);
            });
        } catch (error) {
            console.error('Failed to load user info:', error);
            this.setLoggedUser(null);
        } finally {
            runInAction(() => {
                this.isWhoamiLoading = false;
            });
        }
    }
}

const storeReference = observable({
    store: null as Store | null,
});
const storeContext = createContext<Store | null>(null);

export const StoreProvider = observer((props: PropsWithChildren) => {
    let store = storeReference.store;
    if (!store) {
        store = new Store();
        runInAction(() => {
            storeReference.store = store;
        });
    }
    return <storeContext.Provider value={store}>{props.children}</storeContext.Provider>;
});

export const useStore = () => {
    const context = useContext(storeContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};

export const getStore = () => {
    let store = storeReference.store;
    if (!store) {
        store = new Store();
        runInAction(() => {
            storeReference.store = store;
        });
    }
    return store;
};
