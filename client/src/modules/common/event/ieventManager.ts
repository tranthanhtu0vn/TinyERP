import { BaseEvent } from "@app/common";
export type GenericEventHandler<EventType extends BaseEvent> = (obj: EventType) => void;

export interface IEventManager {
    subscribe(eventType: string, eventHandler: any): any;
    subscribeIfNotExist(eventType: string, eventHandler: any): any;
    unsubscribe(eventType: string): void;
    publish(eventType: string, eventArgs?: any): void;
}

export interface IGenericEventManager {
    subscribe<EventType extends BaseEvent>(obj: EventType, eventHandler: GenericEventHandler<EventType>): any;
    unsubscribe<EventType extends BaseEvent>(obj:EventType): void;
    publish<EventType extends BaseEvent>(obj: EventType): void;
}
