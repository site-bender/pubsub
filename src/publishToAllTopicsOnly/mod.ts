import type { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import { PUBSUB_ALL_TOPICS } from "../constants.ts"
import { publish } from "../index.ts"
import type { PubSubEvent } from "../types.ts"

export default function publishToAllTopicsOnly(
	event: PubSubEvent,
	options = {},
): Temporal.ZonedDateTime | Error {
	return publish(event, {
		...options,
		topic: PUBSUB_ALL_TOPICS,
	})
}
