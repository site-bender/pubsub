import { Temporal } from "@js-temporal/polyfill"
import { publish, subscribe, subscribeToAllTopics, unsubscribe } from "../"

describe("[publish]", function () {
	test("it returns an error when no event name", function () {
		const topic = "blue"

		const err: Error = publish(
			/* eslint-disable @typescript-eslint/ban-ts-comment */
			// @ts-ignore: for testing purposes
			undefined,
			{
				topic,
			},
			/* eslint-enable @typescript-eslint/ban-ts-comment */
		) as Error

		expect(err).toBeInstanceOf(Error)
		expect(err.message).toBe("Published events must have a topic (event name).")
	})

	test("it publishes correctly with topic", function () {
		const id = "my-id"
		const topic = "blue"
		const eventName = "PUBLISHED"
		const data = {
			color: "cyan",
		}
		const cb = jest.fn()
		const cbOnce = jest.fn()

		subscribe("jane", cb, { topic })
		subscribe("julie", cbOnce, { topic, once: true })

		publish(
			{
				eventName,
				data,
			},
			{
				topic,
			},
		)

		publish(
			{
				id,
				eventName,
				data,
			},
			{
				topic,
			},
		)

		publish(
			{
				id,
				eventName,
				data,
			},
			{
				topic: "green",
			},
		)

		const one = cb.mock.calls[0][0]
		const two = cb.mock.calls[1][0]

		expect(one.id.length).toBe(21)
		expect(one.eventName).toBe(eventName)
		expect(one.timestamp instanceof Temporal.ZonedDateTime).toBe(true)
		expect(one.data).toEqual(data)

		expect(two.id).toBe(id)
		expect(two.eventName).toBe(eventName)
		expect(two.timestamp instanceof Temporal.ZonedDateTime).toBe(true)
		expect(two.data).toEqual(data)

		expect(cbOnce).toHaveBeenCalledTimes(1)
		unsubscribe()
	})

	test("it publishes correctly without topic", function () {
		const id = "my-id"
		const eventName = "PUBLISHED"
		const data = {
			color: "cyan",
		}
		const cb = jest.fn()
		const cbOnce = jest.fn()

		subscribeToAllTopics("jane", cb, {})
		subscribeToAllTopics("julie", cbOnce, { once: true })

		publish(
			{
				eventName,
				data,
			},
			{},
		)

		publish({
			id,
			eventName,
			data,
		})

		const one = cb.mock.calls[0][0]
		const two = cb.mock.calls[1][0]

		expect(one.id.length).toBe(21)
		expect(one.eventName).toBe(eventName)
		expect(one.timestamp instanceof Temporal.ZonedDateTime).toBe(true)
		expect(one.data).toEqual(data)

		expect(two.id).toBe(id)
		expect(two.eventName).toBe(eventName)
		expect(two.timestamp instanceof Temporal.ZonedDateTime).toBe(true)
		expect(two.data).toEqual(data)
		unsubscribe()
	})
})
