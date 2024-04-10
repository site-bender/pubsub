import generateShortId from "../utilities/generateShortId"
import { Temporal } from "temporal-polyfill"
import subscribers from "../subscribers"
import not from "../utilities/not"

type PublishF = (
	event: PubSubEvent,
) => (options: Options) => Temporal.ZonedDateTime | Error

const publish: PublishF =
	event =>
	(options = {}) => {
		if (not(event?.eventName)) {
			return new Error(`Published events must have a topic (event name).`)
		}

		const { topic } = options
		const timestamp = Temporal.Now.zonedDateTimeISO()
		const fullEvent = {
			id: generateShortId(),
			...event,
			timestamp,
		}

		if (topic) {
			const { [topic]: callbacks = {}, ...rest } = subscribers.once

			Object.keys(callbacks).forEach(key => callbacks[key](fullEvent))

			subscribers.once = rest

			const { [topic]: cbs = {} } = subscribers.always

			Object.keys(cbs).forEach(key => {
				cbs[key](fullEvent)
			})
		} else {
			Object.keys(subscribers.once).forEach(t =>
				Object.keys(subscribers.once[t]).forEach(key =>
					subscribers.once[t][key](fullEvent),
				),
			)

			subscribers.once = {}

			Object.keys(subscribers.always).forEach(t =>
				Object.keys(subscribers.always[t]).forEach(key =>
					subscribers.always[t][key](fullEvent),
				),
			)
		}

		return timestamp
	}

export default publish
