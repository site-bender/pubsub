import unsubscribeByToken from "./unsubscribeByToken"
import unsubscribeAll from "./unsubscribeAll"
import unsubscribeByTopic from "./unsubscribeByTopic"
import unsubscribeByTopicAndToken from "./unsubscribeByTopicAndToken"

type UnsubscribeF = (
	options: Options,
) => (token?: string) => (topic?: string) => void

const unsubscribe: UnsubscribeF =
	(options = {}) =>
	token =>
	topic => {
		const { onlyFromOnce } = options

		if (token && topic) {
			unsubscribeByTopicAndToken(topic)(token)(onlyFromOnce)
		}

		if (token && !topic) {
			unsubscribeByToken(token)(onlyFromOnce)
		}

		if (!token && topic) {
			unsubscribeByTopic(topic)(onlyFromOnce)
		}

		if (!token && !topic) {
			unsubscribeAll(onlyFromOnce)
		}
	}

export default unsubscribe
