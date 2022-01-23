import { PUBSUB_ALL_TOPICS } from "../constants.js"
import getSubscriberCount from "../getSubscriberCount/mod.js"

export default function getAllTopicsSubscriberCount(
	options: {
		onlyFromOnce?: boolean
	} = {},
): number {
	return getSubscriberCount({
		...options,
		topic: PUBSUB_ALL_TOPICS,
	})
}
