import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import {
	getSubscriberCount,
	subscribe,
	subscribeToAllTopics,
	unsubscribe,
} from "../index.ts"

Deno.test("subscriber count from an empty cache is zero", function() {
	assertEquals(getSubscriberCount(), 0)
})

Deno.test("subscriber count from a full cache is correct", function() {
	subscribeToAllTopics("bob", () => null)
	subscribeToAllTopics("bill", () => null)
	subscribeToAllTopics("sam", () => null, { once: true })
	subscribe("jane", () => null, { topic: "blue" })
	subscribe("sally", () => null, { topic: "blue", once: true })

	assertEquals(getSubscriberCount(), 5)
	assertEquals(getSubscriberCount({ onlyFromOnce: false }), 3)
	assertEquals(getSubscriberCount({ onlyFromOnce: true }), 2)
	unsubscribe()
})
