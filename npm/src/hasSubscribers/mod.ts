import getSubscriberCount from "../getSubscriberCount/mod.js"

export default function hasSubscribers(
	options: {
		topic?: string
		onlyFromOnce?: boolean
	} = {},
): boolean {
	return Boolean(getSubscriberCount(options))
}
