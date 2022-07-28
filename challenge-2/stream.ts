export interface StreamDefinition<MessageTypes extends {}> {
    messages: {
        [T: string]: Message<string, any>
    };
}

export interface Message<MessageType extends string | number, Payload extends any> {
    messageType: MessageType;
    payload: Payload;
}

export type anyMessageFrom<Stream extends StreamDefinition<any>> = Stream['messages'][keyof Stream['messages'] & string];
