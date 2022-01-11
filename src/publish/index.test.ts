import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import { publish, subscribe, subscribeToAllTopics, unsubscribe } from "../index.ts"
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

	Deno.test("it returns an error when no event name", function () {
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

		// expect(err).toBeInstanceOf(Error)
		assertEquals(err.message, "Published events must have a topic (event name).")
	})

	Deno.test("it publishes correctly with topic", function () {
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

		assertEquals(one.id.length, 21)
		assertEquals(one.eventName, eventName)
		assertEquals(one.timestamp instanceof Temporal.ZonedDateTime, true)
		assertEquals(one.data, data)

		assertEquals(two.id, id)
		assertEquals(two.eventName, eventName)
		assertEquals(two.timestamp instanceof Temporal.ZonedDateTime, true)
		assertEquals(two.data, data)

		// expect(cbOnce).toHaveBeenCalledTimes(1)
		unsubscribe()
	})

	Deno.test("it publishes correctly without topic", function () {
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

		assertEquals(one.id.length, 21)
		assertEquals(one.eventName, eventName)
		assertEquals(one.timestamp instanceof Temporal.ZonedDateTime, true)
		assertEquals(one.data, data)

		assertEquals(two.id, id)
		assertEquals(two.eventName, eventName)
		assertEquals(two.timestamp instanceof Temporal.ZonedDateTime, true)
		assertEquals(two.data, data)
		unsubscribe()
	})
