import { hasSubscribers, subscribe, unsubscribe } from "../"

describe("[hasSubscribers]", function () {
	test("has subscribers from an empty cache is false", function () {
		expect(hasSubscribers()).toBe(false)
	})

	test("has subscribers from empty topic is false", function () {
		subscribe("bob", () => null, { topic: "red" })

		expect(hasSubscribers({ topic: "blue" })).toBe(false)
		unsubscribe()
	})

	test("has subscribers from full topic is true", function () {
		subscribe("bob", () => null, { topic: "red" })

		expect(hasSubscribers({ topic: "red" })).toBe(true)
		unsubscribe()
	})

	test("has subscribers from an empty once cache is false", function () {
		subscribe("bob", () => null, { topic: "red" })
		subscribe("bill", () => null, { topic: "blue" })
		subscribe("betty", () => null, { topic: "green", once: true })

		expect(hasSubscribers({ topic: "red", onlyFromOnce: true })).toBe(false)
		expect(hasSubscribers({ topic: "red" })).toBe(true)
		unsubscribe()
	})

	test("has subscribers from a full once cache is true", function () {
		subscribe("bob", () => null, { topic: "red", once: true })

		expect(hasSubscribers({ topic: "red", onlyFromOnce: true })).toBe(true)
		expect(hasSubscribers({ topic: "red" })).toBe(true)
		expect(hasSubscribers({ topic: "red", onlyFromOnce: false })).toBe(false)
		unsubscribe()
	})
})
