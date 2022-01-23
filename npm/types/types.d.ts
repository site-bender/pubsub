export declare namespace Temporal {
    type ZonedDateTime = unknown;
}
export declare type PubSubEvent = {
    id?: string;
    eventName: string;
    timestamp?: Temporal.ZonedDateTime;
    data?: {
        [key: string]: unknown;
    };
};
export declare type Subscriptions = {
    [token: string]: (event: PubSubEvent) => void;
};
export declare type Topics = {
    [topic: string]: Subscriptions;
};
