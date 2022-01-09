import unsubscribe from "../unsubscribe"
import { PUBSUB_ALL_TOPICS } from "./../constants"

export default function unsubscribeFromAllTopics(
	token?: string,
	options?: {
		onlyFromOnce?: boolean
	},
): void {
	return unsubscribe(token, PUBSUB_ALL_TOPICS, options)
}
