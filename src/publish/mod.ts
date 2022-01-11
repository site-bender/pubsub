import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import { nanoid } from 'https://cdn.skypack.dev/nanoid?dts';
import not from "../utilities/not/mod.ts"
import subscribers from "../subscribers/mod.ts"

export default function publish(
	event: PubSubEvent,
	options: {
		topic?: string
	} = {},
): Temporal.ZonedDateTime | Error {
	if (not(event?.eventName)) {
		return new Error(`Published events must have a topic (event name).`)
	}

	const { topic } = options
	const timestamp = Temporal.Now.zonedDateTimeISO()
	const fullEvent = {
		id: nanoid(),
		...event,
		timestamp,
	}

	if (topic) {
		const { [topic]: callbacks = {}, ...rest } = subscribers.once

		Object.keys(callbacks).forEach((key) => callbacks[key](fullEvent))

		subscribers.once = rest

		const { [topic]: cbs = {} } = subscribers.always

		Object.keys(cbs).forEach((key) => {
			cbs[key](fullEvent)
		})
	} else {
		Object.keys(subscribers.once).forEach((t) =>
			Object.keys(subscribers.once[t]).forEach((key) =>
				subscribers.once[t][key](fullEvent),
			),
		)

		subscribers.once = {}

		Object.keys(subscribers.always).forEach((t) =>
			Object.keys(subscribers.always[t]).forEach((key) =>
				subscribers.always[t][key](fullEvent),
			),
		)
	}

	return timestamp
}
