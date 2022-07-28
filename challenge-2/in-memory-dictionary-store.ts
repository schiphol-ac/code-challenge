import { DictionaryStore, Dictionary } from './dictionary-store';

export class InMemoryDictionaryStore<State extends Dictionary<any>> implements DictionaryStore<State> {
    private items: State;

    constructor(private initialState: State) {
        this.items = { ...initialState };
    }

    public async get(): Promise<State> {
        return { ...this.items };
    }

    public async getItem<K extends keyof State>(key: K): Promise<State[K] | undefined> {
        return this.items[key];
    }

    public async setItem<K extends keyof State>(key: K, item: State[K]) {
        this.items[key] = item;
    }

    public async removeItem(key: string) {
        delete this.items[key];
    }

    public async clear() {
        this.items = { ...this.initialState };
    }
}
