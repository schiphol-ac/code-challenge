import { AbstractMessageHandler, EventHandlers } from './message-handler';
import { DictionaryStore } from './dictionary-store';
import { StreamDefinition } from './stream';

type Projector<Store, Message> = (store: DictionaryStore<Store>, message: Message) =>
    Promise<void> | void;

export type DictionaryEventHandlers<Stream extends StreamDefinition<any>, Store> = {
    [K in keyof Stream['messages']]: Projector<Store, Stream['messages'][K]>;
};

export class DictionaryProjection<Stream extends StreamDefinition<any>, Store> extends AbstractMessageHandler<Stream> {
    constructor(private store: DictionaryStore<Store>) {
        super();
    }

    public when(projectors: DictionaryEventHandlers<Stream, Store>): void {
        this.handlers = (Object.keys(projectors) as (keyof DictionaryEventHandlers<Stream, Store>)[]).reduce(
            (handlers, messageType) => {
                handlers[messageType] = async message => {
                    const projector = projectors[messageType];
                    await projector(this.store, message);
                };

                return handlers;
            },
            {} as EventHandlers<Stream>,
        );
    }

    public async clear() {
        await this.store.clear();
    }
}
