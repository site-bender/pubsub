import { getSubscriberCount, hasSubscribers, subscribe, unsubscribe } from "../"

describe("[unsubscribe]", function () {
	test("it unsubscribes by topic and token", function () {
		const token = "jane"
		const topic = "blue"

		subscribe(token, () => null, { topic })
		subscribe(token, () => null, { topic, once: true })

		expect(hasSubscribers()).toBe(true)

		unsubscribe(token, topic)

		expect(hasSubscribers()).toBe(false)
		unsubscribe()
	})

	test("it unsubscribes by topic and token only from once", function () {
		const token = "jane"
		const topic = "blue"

		subscribe(token, () => null, { topic })
		subscribe(token, () => null, { topic, once: true })

		expect(getSubscriberCount()).toBe(2)

		unsubscribe(token, topic, { onlyFromOnce: true })

		expect(getSubscriberCount()).toBe(1)
		unsubscribe()
	})

	test("it unsubscribes by token only", function () {
		const token = "jane"

		subscribe(token, () => null, { topic: "blue" })
		subscribe(token, () => null, { topic: "red" })
		subscribe("julie", () => null, { topic: "red" })

		expect(getSubscriberCount()).toBe(3)

		unsubscribe(token)

		expect(getSubscriberCount()).toBe(1)
		unsubscribe()
	})

	test("it unsubscribes by token only from once", function () {
		const token = "jane"

		subscribe(token, () => null, { topic: "blue" })
		subscribe(token, () => null, { topic: "red", once: true })
		subscribe("julie", () => null, { topic: "red" })

		expect(getSubscriberCount()).toBe(3)

		unsubscribe(token, undefined, { onlyFromOnce: true })

		expect(getSubscriberCount()).toBe(2)
		unsubscribe()
	})

	test("it unsubscribes by topic only", function () {
		const topic = "green"

		subscribe("jane", () => null, { topic })
		subscribe("julie", () => null, { topic })
		subscribe("julie", () => null, { topic: "yellow" })

		expect(getSubscriberCount()).toBe(3)

		unsubscribe(undefined, topic)

		expect(getSubscriberCount()).toBe(1)
		unsubscribe()
	})

	test("it unsubscribes by topic only from once", function () {
		const topic = "green"

		subscribe("jane", () => null, { topic })
		subscribe("julie", () => null, { topic, once: true })
		subscribe("julie", () => null, { topic: "yellow" })

		expect(getSubscriberCount()).toBe(3)

		unsubscribe(undefined, topic, { onlyFromOnce: true })

		expect(getSubscriberCount()).toBe(2)
		unsubscribe()
	})

	test("it unsubscribes from all", function () {
		subscribe("jane", () => null, { topic: "red" })
		subscribe("julie", () => null, { topic: "red" })
		subscribe("jane", () => null, { topic: "blue", once: true })
		subscribe("julie", () => null, { topic: "blue", once: true })

		expect(getSubscriberCount()).toBe(4)

		unsubscribe()

		expect(hasSubscribers()).toBe(false)
	})

	test("it unsubscribes all only from once", function () {
		subscribe("jane", () => null, { topic: "red" })
		subscribe("julie", () => null, { topic: "red" })
		subscribe("jane", () => null, { topic: "blue", once: true })
		subscribe("julie", () => null, { topic: "blue", once: true })

		expect(getSubscriberCount()).toBe(4)

		unsubscribe(undefined, undefined, { onlyFromOnce: true })

		expect(getSubscriberCount()).toBe(2)
		unsubscribe()
	})
})
