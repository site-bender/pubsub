import { PUBSUB_ALL_TOPICS } from "../constants"

import getSubscriberCount from "../getSubscriberCount"

type GetAllTopicsSubscriberCountF = (options: Options) => number

const getAllTopicsSubscriberCount: GetAllTopicsSubscriberCountF = (
	options = {},
) =>
	getSubscriberCount({
		...options,
		topic: PUBSUB_ALL_TOPICS,
	})

export default getAllTopicsSubscriberCount
