import { hasSubscribers, subscribe, unsubscribe } from "../index.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("has subscribers from an empty cache is false", function () {
  assertEquals(hasSubscribers(), false);
});

Deno.test("has subscribers from empty topic is false", function () {
  subscribe("bob", () => null, { topic: "red" });

  assertEquals(hasSubscribers({ topic: "blue" }), false);
  unsubscribe();
});

Deno.test("has subscribers from full topic is true", function () {
  subscribe("bob", () => null, { topic: "red" });

  assertEquals(hasSubscribers({ topic: "red" }), true);
  unsubscribe();
});

Deno.test("has subscribers from an empty once cache is false", function () {
  subscribe("bob", () => null, { topic: "red" });
  subscribe("bill", () => null, { topic: "blue" });
  subscribe("betty", () => null, { topic: "green", once: true });

  assertEquals(hasSubscribers({ topic: "red", onlyFromOnce: true }), false);
  assertEquals(hasSubscribers({ topic: "red" }), true);
  unsubscribe();
});

Deno.test("has subscribers from a full once cache is true", function () {
  subscribe("bob", () => null, { topic: "red", once: true });

  assertEquals(hasSubscribers({ topic: "red", onlyFromOnce: true }), true);
  assertEquals(hasSubscribers({ topic: "red" }), true);
  assertEquals(hasSubscribers({ topic: "red", onlyFromOnce: false }), false);
  unsubscribe();
});
