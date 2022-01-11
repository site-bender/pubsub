import { subscribe } from "../index.ts"
import { PUBSUB_ALL_TOPICS } from "../constants.ts"

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
