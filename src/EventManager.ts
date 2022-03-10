import {matchPattern, MatchParams} from './matchPattern';

export type EventType = string | number | boolean | RegExp | null | undefined;
export type EventHandler = (event?: EventPayload, type?: EventType, matchParams?: MatchParams) => void;

export type Event<T extends EventPayload = {}> = T & {
    type: EventType;
    params?: MatchParams;
};

export type EventPayload = {
    [key: string]: any;
};

export type EventListener = {
    id: string;
    type: EventType | EventType[];
    handler: EventHandler;
    remove: () => void;
};

export class EventManager {
    listeners: EventListener[];
    constructor() {
        this.listeners = [];
    }
    addListener(type: EventType | EventType[], handler: EventHandler): EventListener {
        if (typeof handler !== 'function')
            throw new Error('handler is not a function');

        let id = Math.random().toString(36).slice(2);
        let remove = () => {
            for (let i = this.listeners.length - 1; i >= 0; i--) {
                if (this.listeners[i].id === id)
                    this.listeners.splice(i, 1);
            }
        };

        let listener = {id, type, handler, remove};
        this.listeners.push(listener);

        return listener;
    }
    dispatch(type: EventType, payload?: EventPayload): void {
        for (let listener of this.listeners) {
            if (this.shouldCallListener(listener, type)) {
                const matchedParams = this.toHandlerPayload(listener, type);
                listener.handler(payload, type, matchedParams);
            }
        }
    }
    shouldCallListener(listener: EventListener, eventType: EventType): boolean {
        return matchPattern(listener.type, eventType) !== null;
    }
    toHandlerPayload(listener: EventListener, eventType: EventType): MatchParams {
        let params = matchPattern(listener.type, eventType);
        return params;
    }
}
