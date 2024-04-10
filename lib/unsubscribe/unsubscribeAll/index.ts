import subscribers from "../../subscribers"
import { u } from "@sitebender/fp"

type UnsubscribeAllF = (onlyFromOnce?: boolean) => void

const unsubscribeAll: UnsubscribeAllF = onlyFromOnce => {
	if (onlyFromOnce || typeof onlyFromOnce === "undefined") {
		subscribers.once = {}
	}

	if (u.not(onlyFromOnce) || typeof onlyFromOnce === "undefined") {
		subscribers.always = {}
	}
}

export default unsubscribeAll
