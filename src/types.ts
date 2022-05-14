// There's gotta be a better way.
export declare namespace Temporal {
	type ZonedDateTime = unknown
}

export type PubSubEvent = {
	id?: string
	eventName: string
	timestamp?: Temporal.ZonedDateTime
	data?: {
		[key: string]: unknown
	}
}

export type Subscriptions = {
	[token: string]: (event: PubSubEvent) => void
}

export type Topics = {
	[topic: string]: Subscriptions
}
