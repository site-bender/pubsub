import * as dntShim from "../_dnt.test_shims.js";
import { assertEquals } from "../deps/deno_land_std_0_121_0/testing/asserts.js"
import { hasSubscribers, subscribe, unsubscribe } from "../mod.js"

dntShim.Deno.test("has subscribers from an empty cache is false", function() {
	assertEquals(hasSubscribers(), false)
})

dntShim.Deno.test("has subscribers from empty topic is false", function() {
	subscribe("bob", () => null, { topic: "red" })

	assertEquals(hasSubscribers({ topic: "blue" }), false)
	unsubscribe()
})

dntShim.Deno.test("has subscribers from full topic is true", function() {
	subscribe("bob", () => null, { topic: "red" })

	assertEquals(hasSubscribers({ topic: "red" }), true)
	unsubscribe()
})

dntShim.Deno.test("has subscribers from an empty once cache is false", function() {
	subscribe("bob", () => null, { topic: "red" })
	subscribe("bill", () => null, { topic: "blue" })
	subscribe("betty", () => null, { topic: "green", once: true })

	assertEquals(hasSubscribers({ topic: "red", onlyFromOnce: true }), false)
	assertEquals(hasSubscribers({ topic: "red" }), true)
	unsubscribe()
})

dntShim.Deno.test("has subscribers from a full once cache is true", function() {
	subscribe("bob", () => null, { topic: "red", once: true })

	assertEquals(hasSubscribers({ topic: "red", onlyFromOnce: true }), true)
	assertEquals(hasSubscribers({ topic: "red" }), true)
	assertEquals(hasSubscribers({ topic: "red", onlyFromOnce: false }), false)
	unsubscribe()
})
