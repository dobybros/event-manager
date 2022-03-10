import { matchPattern } from './matchPattern';
export class EventManager {
    listeners;
    constructor() {
        this.listeners = [];
    }
    addListener(type, handler) {
        if (typeof handler !== 'function')
            throw new Error('handler is not a function');
        let id = Math.random().toString(36).slice(2);
        let remove = () => {
            for (let i = this.listeners.length - 1; i >= 0; i--) {
                if (this.listeners[i].id === id)
                    this.listeners.splice(i, 1);
            }
        };
        let listener = { id, type, handler, remove };
        this.listeners.push(listener);
        return listener;
    }
    dispatch(type, payload) {
        for (let listener of this.listeners) {
            if (this.shouldCallListener(listener, type)) {
                const matchedParams = this.toHandlerPayload(listener, type);
                listener.handler(payload, type, matchedParams);
            }
        }
    }
    shouldCallListener(listener, eventType) {
        return matchPattern(listener.type, eventType) !== null;
    }
    toHandlerPayload(listener, eventType) {
        let params = matchPattern(listener.type, eventType);
        return params;
    }
}
