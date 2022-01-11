import {
	getAllTopicsSubscriberCount,
	subscribe,
	subscribeToAllTopics,
	unsubscribe,
} from "../index.ts"

describe("[getAllTopicsSubscriberCount]", function () {
	test("subscriber count from an empty cache is zero", function () {
		expect(getAllTopicsSubscriberCount()).toBe(0)
	})

	test("subscriber count from a full cache is correct", function () {
		subscribeToAllTopics("bob", () => null)
		subscribeToAllTopics("bill", () => null)
		subscribeToAllTopics("sam", () => null, { once: true })
		subscribe("jane", () => null, { topic: "blue" })
		subscribe("sally", () => null, { topic: "blue", once: true })

		expect(getAllTopicsSubscriberCount()).toBe(3)
		expect(getAllTopicsSubscriberCount({ onlyFromOnce: false })).toBe(2)
		expect(getAllTopicsSubscriberCount({ onlyFromOnce: true })).toBe(1)
		unsubscribe()
	})
})
