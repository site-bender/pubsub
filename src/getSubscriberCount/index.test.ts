import {
	getSubscriberCount,
	subscribe,
	subscribeToAllTopics,
	unsubscribe,
} from "../"

describe("[getSubscriberCount]", function () {
	test("subscriber count from an empty cache is zero", function () {
		expect(getSubscriberCount()).toBe(0)
	})

	test("subscriber count from a full cache is correct", function () {
		subscribeToAllTopics("bob", () => null)
		subscribeToAllTopics("bill", () => null)
		subscribeToAllTopics("sam", () => null, { once: true })
		subscribe("jane", () => null, { topic: "blue" })
		subscribe("sally", () => null, { topic: "blue", once: true })

		expect(getSubscriberCount()).toBe(5)
		expect(getSubscriberCount({ onlyFromOnce: false })).toBe(3)
		expect(getSubscriberCount({ onlyFromOnce: true })).toBe(2)
		unsubscribe()
	})
})
