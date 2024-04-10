import subscribers from "../../subscribers"
import not from "../../utilities/not"

type UnsubscribeByTopicF = (topic: string) => (onlyFromOnce?: boolean) => void

const unsubscribeByTopic: UnsubscribeByTopicF = topic => onlyFromOnce => {
	if (onlyFromOnce || typeof onlyFromOnce === "undefined") {
		const { [topic]: _once, ...otherOnce } = subscribers.once

		subscribers.once = otherOnce
	}

	if (not(onlyFromOnce) || typeof onlyFromOnce === "undefined") {
		const { [topic]: _always, ...otherAlways } = subscribers.always

		subscribers.always = otherAlways
	}
}

export default unsubscribeByTopic
