import { PUBSUB_ALL_TOPICS } from "../constants.ts"
import unsubscribe from "../unsubscribe/index.ts"

type UnsubscribeFromAllTopicsF = (token?: string) => (options?: Options) => void

const unsubscribeFromAllTopics: UnsubscribeFromAllTopicsF =
	token =>
	(options = {}) =>
		unsubscribe(options)(token)(PUBSUB_ALL_TOPICS)

export default unsubscribeFromAllTopics
