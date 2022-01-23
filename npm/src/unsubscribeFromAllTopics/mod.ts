import { PUBSUB_ALL_TOPICS } from "../constants.js"
import unsubscribe from "../unsubscribe/mod.js"

export default function unsubscribeFromAllTopics(
	token?: string,
	options?: {
		onlyFromOnce?: boolean
	},
): void {
	return unsubscribe(token, PUBSUB_ALL_TOPICS, options)
}
