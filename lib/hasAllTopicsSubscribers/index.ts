import { PUBSUB_ALL_TOPICS } from "../constants"

import getSubscriberCount from "../getSubscriberCount"

type HasAllTopicsSubscribersF = (options: Options) => boolean

const hasAllTopicsSubscribers: HasAllTopicsSubscribersF = (options = {}) =>
	Boolean(
		getSubscriberCount({
			...options,
			topic: PUBSUB_ALL_TOPICS,
		}),
	)

export default hasAllTopicsSubscribers
