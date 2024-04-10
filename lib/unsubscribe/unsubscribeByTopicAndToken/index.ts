import subscribers from "../../subscribers"
import { u } from "@sitebender/fp"

type UnsubscribeByTopicAndTokenF = (
	topic: string,
) => (token: string) => (onlyFromOnce?: boolean) => void

const unsubscribeByTopicAndToken: UnsubscribeByTopicAndTokenF =
	topic => token => onlyFromOnce => {
		if (onlyFromOnce || typeof onlyFromOnce === "undefined") {
			const { [token]: _once, ...otherOnce } = subscribers.once[topic]
			subscribers.once[topic] = otherOnce
		}

		if (u.not(onlyFromOnce) || typeof onlyFromOnce === "undefined") {
			const { [token]: _always, ...otherAlways } = subscribers.always[topic]

			subscribers.always[topic] = otherAlways
		}
	}

export default unsubscribeByTopicAndToken
