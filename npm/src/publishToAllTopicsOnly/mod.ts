import type { Temporal } from "@js-temporal/polyfill"
import { PUBSUB_ALL_TOPICS } from "../constants.js"
import { publish } from "../mod.js"
import type { PubSubEvent } from "../types.js"

export default function publishToAllTopicsOnly(
	event: PubSubEvent,
	options = {},
): Temporal.ZonedDateTime | Error {
	return publish(event, {
		...options,
		topic: PUBSUB_ALL_TOPICS,
	})
}
