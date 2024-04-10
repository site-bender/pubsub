import subscribers from "../../subscribers"
import not from "../../utilities/not"

type UnsubscribeAllF = (onlyFromOnce?: boolean) => void

const unsubscribeAll: UnsubscribeAllF = onlyFromOnce => {
	if (onlyFromOnce || typeof onlyFromOnce === "undefined") {
		subscribers.once = {}
	}

	if (not(onlyFromOnce) || typeof onlyFromOnce === "undefined") {
		subscribers.always = {}
	}
}

export default unsubscribeAll
