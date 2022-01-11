import getSubscriberCount from "../getSubscriberCount"
import { PUBSUB_ALL_TOPICS } from "../constants"

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
