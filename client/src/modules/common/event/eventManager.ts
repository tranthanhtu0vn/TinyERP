import { EventEmitter } from "@angular/core";
import { Hashtable } from "../models/list/hashtable";
import { IEventManager, IGenericEventManager, GenericEventHandler } from "./ieventManager";
import { BaseEvent } from "./baseEvent";
import { EventHandlerNotFoundArg } from "./eventHandlerNotFoundArg";
import { IoCNames } from "../ioc/enum";
import { ErrorType, LoadingIndicatorEvent, EventHandlerType } from "../enum";

export class EventManager implements IEventManager {
    private eventEmitterMap: Hashtable<EventEmitter<any>> = new Hashtable<EventEmitter<any>>();
    //private ignoreIfNotFoundHandlerEventTypes: Hashtable<boolean>;
    // constructor() {
    //     this.initIgnoreEventTypes();
    // }
    // private initIgnoreEventTypes() {
    //     this.ignoreIfNotFoundHandlerEventTypes = new Hashtable<boolean>();
    //     this.ignoreIfNotFoundHandlerEventTypes.set(LoadingIndicatorEvent.Show, true);
    //     this.ignoreIfNotFoundHandlerEventTypes.set(LoadingIndicatorEvent.Hide, true);
    // }
    public subscribe(eventType: string, eventHandler: any): any {
        if (false === this.eventEmitterMap.exist(eventType)) {
            this.eventEmitterMap.set(eventType, new EventEmitter<any>());
        }
        return this.eventEmitterMap.get(eventType).subscribe(eventHandler);
    }
    public subscribeIfNotExist(eventType: string, eventHandler: any):any {
        if (true === this.eventEmitterMap.exist(eventType)) {
            return;
            //throw String.format("handler for '{0}' eventtype was already existed", eventType);
        }
        this.eventEmitterMap.set(eventType, new EventEmitter<any>());
        return this.eventEmitterMap.get(eventType).subscribe(eventHandler);
    }
    public unsubscribe(eventType: string) {
        this.eventEmitterMap.remove(eventType);
    }
    public publish(eventType: string, eventArgs: any = null) {
        if (false === this.eventEmitterMap.exist(eventType)) {
            this.publish(ErrorType.OnEventHandlerNotFound, new EventHandlerNotFoundArg(eventType, eventArgs));
            return;
        }
        let eventHandlers = this.eventEmitterMap.get(eventType);
        if ((!eventHandlers.observers || eventHandlers.observers.length <= 0)) {
            this.publish(ErrorType.OnEventHandlerNotFound, new EventHandlerNotFoundArg(eventType, eventArgs));
            return;
        }
        //console.log(eventType, this.eventEmitterMap);
        eventHandlers.emit(eventArgs);
    }
    // private ignoreIfNotFoundHandler(eventType: string): boolean {
    //     return this.ignoreIfNotFoundHandlerEventTypes.exist(eventType) === true && this.ignoreIfNotFoundHandlerEventTypes.get(eventType) == true;
    // }
}

export class GenericEventManager implements IGenericEventManager {
    private eventManager: IEventManager;
    constructor() {
        this.eventManager = window.ioc.resolve(IoCNames.IEventManager);
    }
    public subscribe<EventType extends BaseEvent>(obj: EventType, eventHandler: GenericEventHandler<EventType>) {
        let eventKey = obj.getKey();
        if (obj.handlerType == EventHandlerType.OnlyOne) {
            return this.eventManager.subscribeIfNotExist(eventKey, eventHandler);
        }
        return this.eventManager.subscribe(eventKey, eventHandler);
    }
    public unsubscribe<EventType extends BaseEvent>(obj: EventType) {
        this.eventManager.unsubscribe(obj.getKey());
    }
    public publish<EventType extends BaseEvent>(obj: EventType) {
        this.eventManager.publish(obj.getKey(), obj);
    }
}