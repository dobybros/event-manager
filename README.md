# event-manager

*Custom event manager*

## `class EventManager`

### Constructor

#### `EventManager()`

Returns an `EventManager` object instance.

### Methods

#### `addEventListener(type: string, handler: function | function[]): object | object[]`

Subscribes a `handler` function (or an array of functions) to the specified event `type` and returns an event listener object (or an array thereof) with a `remove()` method that removes the subscription. If a handler is not a function, it is silently ignored.

Handlers added to the wildcard `'*'` event type will be triggered whenever any event is dispatched.

#### `removeEventListener(type: string, handler?: function | function[])`

Removes an event subscription with the specified event `type` and event `handler` (or an array of handlers). If the handler is not specified, all subscriptions of the specified event `type` are removed.

#### `dispatchEvent(type: string, props?: object)`

Dispatches an event of the specified `type` with the specified properties.
