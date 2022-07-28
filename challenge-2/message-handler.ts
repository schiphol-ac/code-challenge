import { StreamDefinition, anyMessageFrom } from './stream';

export interface MessageHandler<Stream extends StreamDefinition<any>> {
    handle(message: anyMessageFrom<Stream>): Promise<void>;

    clear(): Promise<void>;
}

export type EventHandlers<Stream extends StreamDefinition<any>> = {
    [K in keyof Stream['messages']]: (message: Stream['messages'][K]) => Promise<void> | void;
};

export abstract class AbstractMessageHandler<Stream extends StreamDefinition<any>> implements MessageHandler<Stream> {
    protected handlers!: EventHandlers<Stream>;

    public abstract when(handlers: object): void;

    public async handle(message: anyMessageFrom<Stream>): Promise<void> {
        const type = message.messageType;

        await this.handlers[type].call(undefined, message);
    }

    public abstract clear(): Promise<void>;
}
