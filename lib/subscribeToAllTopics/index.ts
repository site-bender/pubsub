import { PUBSUB_ALL_TOPICS } from "../constants"

import subscribe from "../subscribe"

type SubscribeToAllTopicsF = (
	token: string,
) => (callback: (event: PubSubEvent) => void) => (options: Options) => string

const subscribeToAllTopics: SubscribeToAllTopicsF =
	token =>
	callback =>
	(options = {}) =>
		subscribe(token)(callback)({
			...options,
			topic: PUBSUB_ALL_TOPICS,
		})

export default subscribeToAllTopics
