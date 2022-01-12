import {
  hasAllTopicsSubscribers,
  subscribe,
  subscribeToAllTopics,
  unsubscribe,
} from "../index.ts";

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("has subscribers from an empty cache is false", function () {
  subscribe("jane", () => null, { topic: "blue" });

  assertEquals(hasAllTopicsSubscribers(), false);
  unsubscribe();
});

Deno.test("has subscribers from all topics cache is true", function () {
  subscribeToAllTopics("bob", () => null);

  assertEquals(hasAllTopicsSubscribers(), true);
  unsubscribe();
});

Deno.test("has subscribers from an empty once cache is false", function () {
  subscribeToAllTopics("bob", () => null);

  assertEquals(hasAllTopicsSubscribers({ onlyFromOnce: true }), false);
  assertEquals(hasAllTopicsSubscribers(), true);
  unsubscribe();
});

Deno.test("has subscribers from all topics once cache is true", function () {
  subscribeToAllTopics("sam", () => null, { once: true });

  assertEquals(hasAllTopicsSubscribers({ onlyFromOnce: true }), true);
  unsubscribe();
});

Deno.test("has subscribers from an empty always cache is false", function () {
  subscribeToAllTopics("sam", () => null, { once: true });

  assertEquals(hasAllTopicsSubscribers({ onlyFromOnce: false }), false);
  unsubscribe();
});

Deno.test("has subscribers from all topics always cache is true", function () {
  subscribeToAllTopics("bob", () => null);

  assertEquals(hasAllTopicsSubscribers({ onlyFromOnce: false }), true);
  unsubscribe();
});
