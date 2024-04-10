import getSubscriberCount from "../getSubscriberCount"

type HasSubscribersF = (options: Options) => boolean

const hasSubscribers: HasSubscribersF = (options = {}) =>
	Boolean(getSubscriberCount(options))

export default hasSubscribers
