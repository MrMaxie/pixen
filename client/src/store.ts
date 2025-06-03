import { makeAutoObservable } from 'mobx';

const TOKEN_KEY = 'token';

export class Store {
    token: string | null = null;

    constructor() {
        makeAutoObservable(this);

        if (typeof window !== 'undefined') {
            const stored = window.localStorage.getItem(TOKEN_KEY);
            this.token = stored ? stored : null;
        }
    }

    setToken(token: string | null) {
        this.token = token;
        if (typeof window !== 'undefined') {
            if (token === null) {
                window.localStorage.removeItem(TOKEN_KEY);
            } else {
                window.localStorage.setItem(TOKEN_KEY, token);
            }
        }
    }
}

export const store = new Store();
