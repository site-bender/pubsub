import type { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import { PUBSUB_ALL_TOPICS } from "../constants"
import { publish } from ".."

export default function publishToAllTopicsOnly(
	event: PubSubEvent,
	options = {},
): Temporal.ZonedDateTime | Error {
	return publish(event, {
		...options,
		topic: PUBSUB_ALL_TOPICS,
	})
}
