import { PUBSUB_ALL_TOPICS } from "../constants.js"
import { subscribe } from "../mod.js"
import type { PubSubEvent } from "../types.js"

export default function subscribeToAllTopics(
	token: string,
	callback: (event: PubSubEvent) => void,
	options: {
		once?: boolean
	} = {},
): string | Error {
	return subscribe(token, callback, {
		...options,
		topic: PUBSUB_ALL_TOPICS,
	})
}
