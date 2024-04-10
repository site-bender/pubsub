import removeToken from "../removeToken"
import subscribers from "../../subscribers"
import not from "../../utilities/not"

type UnsubscribeByTokenF = (token: string) => (onlyFromOnce?: boolean) => void

const unsubscribeByToken: UnsubscribeByTokenF = token => onlyFromOnce => {
	if (onlyFromOnce || typeof onlyFromOnce === "undefined") {
		subscribers.once = removeToken(token)(subscribers.once)
	}

	if (not(onlyFromOnce) || typeof onlyFromOnce === "undefined") {
		subscribers.always = removeToken(token)(subscribers.always)
	}
}

export default unsubscribeByToken
