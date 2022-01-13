# PubSub

## Topics

Examples of possible topics include:

- FIELD_UPDATED
- FIELD_FOCUSED
- FIELD_BLURRED
- FORM_SUBMITTED
- BUTTON_CLICKED
- MOUSE_MOVED
- And anything else needed to decouple components.

The "all topics" topic `PUBSUB_ALL_TOPICS` might be useful for, say, logging.

**Note: don't use "PUBSUB_ALL_TOPICS" as a topic!** You can set this to a
different value if necessary in the `constants.ts` file.

## Types

Here are the associated types:

```ts
type PubSubEvent = {
	id?: string
	eventName: string
	timestamp?: Temporal.ZonedDateTime
	data?: {
		[key: string]: unknown
	}
}

type Subscriptions = {
	[token: string]: (event: PubSubEvent) => void
}

type Topics = {
	[topic: string]: Subscriptions
}

type Subscribers = {
	once?: Topics
	always?: Topics
}
```

## Subscribing

```ts
subscribe(
  token: string,
  callback: (event: PubSubEvent) => void,
  options: {
    topic: string
    once?: boolean
  },
): string | Error
```

- The `token` is a unique ID that identifies the subscription.
- The `callback` is the function to be passed the event on `publish`.
- The `token` and the `callback` form a Subscription in the `subscribers`
  dictionary.
- The `topic` is required. It allows subscribers to subscribe to specific
  events. To subscribe to all events, see `subscribeToAllTopics` below.
- If `once` is set to true, the subscription will be cancelled after the first
  time the callback is called. Otherwise, it will respond until it is
  unsubscribed.

<!-- markdownlint-disable-next-line no-inline-html -->
<br />

```ts
subscribeToAllTopics(
  token: string,
  callback: (event: PubSubEvent) => void,
  options?: {
    once?: boolean
  },
): string | Error
```

- Sets the `topic` to PUBSUB_ALL_TOPICS internally. These subscribers are called
  for _every_ event, no matter what the topic.
- If `once` is `true`, then the subscription is automatically cancelled after
  the first event.

## Unsubscribing

```ts
unsubscribe(
  token?: string,
  topic?: string,
  options: {
    onlyFromOnce?: boolean
  } = {},
): void
```

- Both `token` and `topic` are optional.
- If neither is provided, _all_ subscriptions are cancelled.
- If only the `token` is provided, then all subscriptions for that `token` are
  cancelled.
- If only the `topic` is provided, then all subscriptions for that `topic` are
  cancelled.
- If both `token` and `topic` are provided, then only the subscription for that
  `token` on that `topic` is cancelled.
- To unsubscribe an AllTopics subscription, use the `unsubscribeFromAllTopics`
  function below.
- If `onlyFromOnce` is `true`, only subscriptions in the `once` dictionary are
  unsubscribed.
- If `onlyFromOnce` is `false`, only subscriptions in the `always` dictionary
  are unsubscribed.
- If `onlyFromOnce` is `undefined`, then subscriptions in both dictionaries are
  unsubscribed.

<!-- markdownlint-disable-next-line no-inline-html -->
<br />

```ts
unsubscribeFromAllTopics(
  token?: string,
  options?: {
    onlyFromOnce?: boolean
  },
): void
```

- If the `token` is provided, then all AllTopics subscriptions for that `token`
  are cancelled.
- If `onlyFromOnce` is `true`, only subscriptions for AllTopics in the `once`
  dictionary are unsubscribed.
- If `onlyFromOnce` is `false`, only subscriptions for AllTopics in the `always`
  dictionary are unsubscribed.
- If `onlyFromOnce` is `undefined`, then subscriptions for AllTopics in both
  dictionaries are unsubscribed.

## Publishing

```ts
publish(
  event: PubSubEvent,
  options: {
    topic?: string
  } = {},
): Temporal.ZonedDateTime | Error
```

- The `event` is required. It should have a unique ID. ID (nanoid) and timestamp
  (Temporal.ZonedDateTime) are automatically generated.
  - ID can be overridden.
  - Timestamp cannot be overridden.
- If the optional `topic` is provided, then only subscribers to that topic
  receive the event.
- If the optional `topic` is not provided, then all subscribers receive the
  event.
- After calling `once` callbacks, they are unsubscribed (they never receive more
  than a single event).
- To publish only to AllTopics subscribers, use `publishToAllTopicsOnly` below.

<!-- markdownlint-disable-next-line no-inline-html -->
<br />

```ts
publishToAllTopicsOnly(
  event: PubSubEvent,
  options = {},
): Temporal.ZonedDateTime | Error
```

- The `event` is required (as above). It should have a unique ID. ID (nanoid)
  and timestamp (Temporal.ZonedDateTime) are automatically generated.
  - ID can be overridden.
  - Timestamp cannot be overridden.
- The event is published only to AllTopics subscribers.

## Utilities

```ts
getSubscriberCount(
  options: {
    topic?: string
    onlyFromOnce?: boolean
  } = {},
): number
```

- If `topic` is included, then only subscribes to that topic are counted.
- To count only "all topics" subscribers, use `getAllTopicsSubscriberCount`
  below.
- If `onlyOnce` is `true`, then only `once` (one time) subscriptions are
  counted.
- If `onlyOnce` is `false`, then only `always` subscriptions are counted.
- If `onlyOnce` is `undefined`, then both once and always are subscriptions are
  counted.

<!-- markdownlint-disable-next-line no-inline-html -->
<br />

```ts
getAllTopicsSubscriberCount(
  options: {
    onlyFromOnce?: boolean
  } = {},
): number
```

- Counts only PUBSUB_ALL_TOPICS subscriptions
- If `onlyOnce` is `true`, then only `once` (one time) subscriptions are
  counted.
- If `onlyOnce` is `false`, then only `always` subscriptions are counted.
- If `onlyOnce` is `undefined`, then both once and always are subscriptions are
  counted.

<!-- markdownlint-disable-next-line no-inline-html -->
<br />

```ts
hasSubscribers(
  options: {
    topic?: string
    onlyFromOnce?: boolean
  } = {},
): boolean
```

- Nothing more than sugar around the `getSubscriberCount` function to return a
  boolean.
- Uses `getSubscriberCount` under the covers.

<!-- markdownlint-disable-next-line no-inline-html -->
<br />

```ts
hasAllTopicsSubscribers(
  options: {
    onlyFromOnce?: boolean
  } = {},
): boolean
```

- Nothing more than sugar around the `getAllTopicsSubscriberCount` function to
  return a boolean.
- Uses `getSubscriberCount` under the covers to avoid a second function call.
