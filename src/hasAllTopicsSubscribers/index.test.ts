import {
	hasAllTopicsSubscribers,
	subscribe,
	subscribeToAllTopics,
	unsubscribe,
} from "../"

describe("[hasAllTopicsSubscribers]", function () {
	test("has subscribers from an empty cache is false", function () {
		subscribe("jane", () => null, { topic: "blue" })

		expect(hasAllTopicsSubscribers()).toBe(false)
		unsubscribe()
	})

	test("has subscribers from all topics cache is true", function () {
		subscribeToAllTopics("bob", () => null)

		expect(hasAllTopicsSubscribers()).toBe(true)
		unsubscribe()
	})

	test("has subscribers from an empty once cache is false", function () {
		subscribeToAllTopics("bob", () => null)

		expect(hasAllTopicsSubscribers({ onlyFromOnce: true })).toBe(false)
		expect(hasAllTopicsSubscribers()).toBe(true)
		unsubscribe()
	})

	test("has subscribers from all topics once cache is true", function () {
		subscribeToAllTopics("sam", () => null, { once: true })

		expect(hasAllTopicsSubscribers({ onlyFromOnce: true })).toBe(true)
		unsubscribe()
	})

	test("has subscribers from an empty always cache is false", function () {
		subscribeToAllTopics("sam", () => null, { once: true })

		expect(hasAllTopicsSubscribers({ onlyFromOnce: false })).toBe(false)
		unsubscribe()
	})

	test("has subscribers from all topics always cache is true", function () {
		subscribeToAllTopics("bob", () => null)

		expect(hasAllTopicsSubscribers({ onlyFromOnce: false })).toBe(true)
		unsubscribe()
	})
})
