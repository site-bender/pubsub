import * as dntShim from "../_dnt.test_shims.js";
import { Temporal } from "@js-temporal/polyfill"
import { assertEquals } from "../deps/deno_land_std_0_121_0/testing/asserts.js"
import {
	publish,
	subscribe,
	subscribeToAllTopics,
	unsubscribe,
} from "../mod.js"
import { PubSubEvent } from "../types.js"

dntShim.Deno.test("it returns an error when no event name", function() {
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

dntShim.Deno.test("it publishes correctly with topic", function() {
	const id = "my-id"
	const topic = "blue"
	const eventName = "PUBLISHED"
	const data = {
		color: "cyan",
	}

	// TODO: Find a better way to create a mocked callback
	let cbArgs = [] as PubSubEvent[]
	const cb = (event: PubSubEvent) => {
		cbArgs.push(event)
	}
	let cbOnceExecuteCount = 0
	const cbOnce = (event: PubSubEvent) => {
		cbOnceExecuteCount++
	}

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

	const one = cbArgs[0]
	const two = cbArgs[1]

	assertEquals(one?.id?.length, 21)
	assertEquals(one.eventName, eventName)
	assertEquals(one.timestamp instanceof Temporal.ZonedDateTime, true)
	assertEquals(one.data, data)

	assertEquals(two.id, id)
	assertEquals(two.eventName, eventName)
	assertEquals(two.timestamp instanceof Temporal.ZonedDateTime, true)
	assertEquals(two.data, data)

	assertEquals(cbOnceExecuteCount, 1)
	unsubscribe()
})

dntShim.Deno.test("it publishes correctly without topic", function() {
	const id = "my-id"
	const eventName = "PUBLISHED"
	const data = {
		color: "cyan",
	}
	// TODO: Find a better way to create a mocked callback
	const cbArgs = [] as PubSubEvent[]
	const cb = (event: PubSubEvent) => {
		cbArgs.push(event)
	}
	let cbOnceExecuteCount = 0
	const cbOnce = () => {
		cbOnceExecuteCount++
	}

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

	const one = cbArgs[0]
	const two = cbArgs[1]

	assertEquals(one?.id?.length, 21)
	assertEquals(one.eventName, eventName)
	assertEquals(one.timestamp instanceof Temporal.ZonedDateTime, true)
	assertEquals(one.data, data)

	assertEquals(two.id, id)
	assertEquals(two.eventName, eventName)
	assertEquals(two.timestamp instanceof Temporal.ZonedDateTime, true)
	assertEquals(two.data, data)
	unsubscribe()
})
