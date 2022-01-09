import {
	getSubscriberCount,
	subscribe,
	subscribeToAllTopics,
	unsubscribe,
	unsubscribeFromAllTopics,
} from "../"

describe("[unsubscribeFromAllTopics]", function () {
	test("it unsubscribes without token", function () {
		subscribe("jane", () => null, { topic: "blue" })
		subscribe("jane", () => null, { topic: "red" })
		subscribeToAllTopics("julie", () => null)

		expect(getSubscriberCount()).toBe(3)

		unsubscribeFromAllTopics()

		expect(getSubscriberCount()).toBe(2)
		unsubscribe()
	})
})
