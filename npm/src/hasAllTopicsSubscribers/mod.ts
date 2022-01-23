import { PUBSUB_ALL_TOPICS } from "../constants.js"
import getSubscriberCount from "../getSubscriberCount/mod.js"

export default function hasAllTopicsSubscribers(
	options: {
		onlyFromOnce?: boolean
	} = {},
): boolean {
	return Boolean(
		getSubscriberCount({
			...options,
			topic: PUBSUB_ALL_TOPICS,
		}),
	)
}
