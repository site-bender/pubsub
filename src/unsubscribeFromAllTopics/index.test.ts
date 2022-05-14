import { assertEquals } from "testing/asserts.ts"
import {
	getSubscriberCount,
	subscribe,
	subscribeToAllTopics,
	unsubscribe,
	unsubscribeFromAllTopics,
} from "../mod.ts"

Deno.test("it unsubscribes without token", function() {
	subscribe("jane", () => null, { topic: "blue" })
	subscribe("jane", () => null, { topic: "red" })
	subscribeToAllTopics("julie", () => null)

	assertEquals(getSubscriberCount(), 3)

	unsubscribeFromAllTopics()

	assertEquals(getSubscriberCount(), 2)
	unsubscribe()
})
