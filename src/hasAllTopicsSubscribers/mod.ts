import { PUBSUB_ALL_TOPICS } from "../constants.ts"
import getSubscriberCount from "../getSubscriberCount/mod.ts"

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
