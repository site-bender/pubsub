import subscribers from "../subscribers"

type SubscribeF = (
	token: string,
) => (callback: (event: PubSubEvent) => void) => (options: Options) => string

const subscribe: SubscribeF =
	token =>
	callback =>
	(options = {}) => {
		const { once, topic } = options

		if (once) {
			subscribers.once[topic as string] = {
				...subscribers.once[topic as string],
				[token]: callback,
			}
		} else {
			subscribers.always[topic as string] = {
				...subscribers.always[topic as string],
				[token]: callback,
			}
		}

		return token
	}

export default subscribe
