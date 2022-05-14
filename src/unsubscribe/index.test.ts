import { assertEquals } from "testing/asserts.ts"
import {
	getSubscriberCount,
	hasSubscribers,
	subscribe,
	unsubscribe,
} from "../mod.ts"

Deno.test("it unsubscribes by topic and token", function() {
	const token = "jane"
	const topic = "blue"

	subscribe(token, () => null, { topic })
	subscribe(token, () => null, { topic, once: true })

	assertEquals(hasSubscribers(), true)

	unsubscribe(token, topic)

	assertEquals(hasSubscribers(), false)
	unsubscribe()
})

Deno.test("it unsubscribes by topic and token only from once", function() {
	const token = "jane"
	const topic = "blue"

	subscribe(token, () => null, { topic })
	subscribe(token, () => null, { topic, once: true })

	assertEquals(getSubscriberCount(), 2)

	unsubscribe(token, topic, { onlyFromOnce: true })

	assertEquals(getSubscriberCount(), 1)
	unsubscribe()
})

Deno.test("it unsubscribes by token only", function() {
	const token = "jane"

	subscribe(token, () => null, { topic: "blue" })
	subscribe(token, () => null, { topic: "red" })
	subscribe("julie", () => null, { topic: "red" })

	assertEquals(getSubscriberCount(), 3)

	unsubscribe(token)

	assertEquals(getSubscriberCount(), 1)
	unsubscribe()
})

Deno.test("it unsubscribes by token only from once", function() {
	const token = "jane"

	subscribe(token, () => null, { topic: "blue" })
	subscribe(token, () => null, { topic: "red", once: true })
	subscribe("julie", () => null, { topic: "red" })

	assertEquals(getSubscriberCount(), 3)

	unsubscribe(token, undefined, { onlyFromOnce: true })

	assertEquals(getSubscriberCount(), 2)
	unsubscribe()
})

Deno.test("it unsubscribes by topic only", function() {
	const topic = "green"

	subscribe("jane", () => null, { topic })
	subscribe("julie", () => null, { topic })
	subscribe("julie", () => null, { topic: "yellow" })

	assertEquals(getSubscriberCount(), 3)

	unsubscribe(undefined, topic)

	assertEquals(getSubscriberCount(), 1)
	unsubscribe()
})

Deno.test("it unsubscribes by topic only from once", function() {
	const topic = "green"

	subscribe("jane", () => null, { topic })
	subscribe("julie", () => null, { topic, once: true })
	subscribe("julie", () => null, { topic: "yellow" })

	assertEquals(getSubscriberCount(), 3)

	unsubscribe(undefined, topic, { onlyFromOnce: true })

	assertEquals(getSubscriberCount(), 2)
	unsubscribe()
})

Deno.test("it unsubscribes from all", function() {
	subscribe("jane", () => null, { topic: "red" })
	subscribe("julie", () => null, { topic: "red" })
	subscribe("jane", () => null, { topic: "blue", once: true })
	subscribe("julie", () => null, { topic: "blue", once: true })

	assertEquals(getSubscriberCount(), 4)

	unsubscribe()

	assertEquals(hasSubscribers(), false)
})

Deno.test("it unsubscribes all only from once", function() {
	subscribe("jane", () => null, { topic: "red" })
	subscribe("julie", () => null, { topic: "red" })
	subscribe("jane", () => null, { topic: "blue", once: true })
	subscribe("julie", () => null, { topic: "blue", once: true })

	assertEquals(getSubscriberCount(), 4)

	unsubscribe(undefined, undefined, { onlyFromOnce: true })

	assertEquals(getSubscriberCount(), 2)
	unsubscribe()
})
