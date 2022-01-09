import { Temporal } from "@js-temporal/polyfill"
import {
	publish,
	publishToAllTopicsOnly,
	subscribe,
	subscribeToAllTopics,
	unsubscribe,
} from "../"

describe("[publishToAllTopicsOnly]", function () {
	test("it publishes to All Topics only correctly", function () {
		const id = "my-id"
		const topic = "blue"
		const eventName = "PUBLISHED"
		const data = {
			color: "cyan",
		}
		const cb = jest.fn()
		const cbAllTopics = jest.fn()

		subscribe("jane", cb, { topic })
		subscribeToAllTopics("bob", cbAllTopics)

		const t1 = publishToAllTopicsOnly({
			eventName,
			data,
		})

		const t2 = publish(
			{
				id,
				eventName,
				data,
			},
			{
				topic,
			},
		)

		const one = cbAllTopics.mock.calls[0][0]
		const two = cb.mock.calls[0][0]

		expect(t1 instanceof Temporal.ZonedDateTime).toBe(true)
		expect(one.id.length).toBe(21)
		expect(one.eventName).toBe(eventName)
		expect(one.timestamp instanceof Temporal.ZonedDateTime).toBe(true)
		expect(one.data).toEqual(data)

		expect(t2 instanceof Temporal.ZonedDateTime).toBe(true)
		expect(two.id).toBe(id)
		expect(two.eventName).toBe(eventName)
		expect(two.timestamp instanceof Temporal.ZonedDateTime).toBe(true)
		expect(two.data).toEqual(data)
		unsubscribe()
	})

	test("it returns an error when no event name", function () {
		const topic = "blue"
		const data = {}

		const cbAllTopics = jest.fn()

		subscribeToAllTopics("bob", cbAllTopics)

		const err: Error = publishToAllTopicsOnly(
			/* eslint-disable @typescript-eslint/ban-ts-comment */
			// @ts-ignore: for testing purposes
			{
				data,
			},
			{
				topic,
			},
			/* eslint-enable @typescript-eslint/ban-ts-comment */
		) as Error

		expect(err).toBeInstanceOf(Error)
		expect(err.message).toBe("Published events must have a topic (event name).")
	})
})
