export interface Dictionary<T> {
    [key: string]: T;
}

export interface DictionaryStore<State extends Dictionary<any>> {
    get(): Promise<State>;

    getItem<K extends keyof State>(key: K): Promise<State[K] | undefined>;

    setItem<K extends keyof State>(key: K, item: State[K]): Promise<void>;

    removeItem(key: string): Promise<void>;

    clear(): Promise<void>;
}
