interface Options {
	once?: boolean
	onlyFromOnce?: boolean
	topic?: string
}

// FIXME
declare namespace Temporal {
	type ZonedDateTime = unknown
}

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
