declare namespace Intl {
	type ListType = "conjunction" | "disjunction" | "unit"

	interface ListFormatOptions {
		localeMatcher?: "lookup" | "best fit"
		type?: ListType
		style?: "long" | "short" | "narrow"
	}

	interface ListFormatPart {
		type: "element" | "literal"
		value: string
	}

	class ListFormat {
		constructor(locales?: string | string[], options?: ListFormatOptions)
		format(values: string[]): string
		formatToParts(values: string[]): ListFormatPart[]
		supportedLocalesOf(
			locales: string | string[],
			options?: ListFormatOptions,
		): string[]
	}
}

// There's gotta be a better way.
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

type Subscribers = {
	once?: Topics
	always?: Topics
}
