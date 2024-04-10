import subscribers from "../../subscribers"
import { u } from "@sitebender/fp"

type UnsubscribeByTopicF = (topic: string) => (onlyFromOnce?: boolean) => void

const unsubscribeByTopic: UnsubscribeByTopicF = topic => onlyFromOnce => {
	if (onlyFromOnce || typeof onlyFromOnce === "undefined") {
		const { [topic]: _once, ...otherOnce } = subscribers.once

		subscribers.once = otherOnce
	}

	if (u.not(onlyFromOnce) || typeof onlyFromOnce === "undefined") {
		const { [topic]: _always, ...otherAlways } = subscribers.always

		subscribers.always = otherAlways
	}
}

export default unsubscribeByTopic
