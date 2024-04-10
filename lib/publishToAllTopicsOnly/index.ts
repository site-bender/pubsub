import type { Temporal } from "temporal-polyfill"
import { PUBSUB_ALL_TOPICS } from "../constants"
import publish from "../publish"

type PublishToAllTopicsOnlyF = (
	event: PubSubEvent,
) => (options: Options) => Temporal.ZonedDateTime | Error

const publishToAllTopicsOnly: PublishToAllTopicsOnlyF =
	event =>
	(options = {}) =>
		publish(event)({
			...options,
			topic: PUBSUB_ALL_TOPICS,
		})

export default publishToAllTopicsOnly
