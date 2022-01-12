import {
  getAllTopicsSubscriberCount,
  subscribe,
  subscribeToAllTopics,
  unsubscribe,
} from "../index.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("subscriber count from an empty cache is zero", function () {
  assertEquals(getAllTopicsSubscriberCount(), 0);
});

Deno.test("subscriber count from a full cache is correct", function () {
  subscribeToAllTopics("bob", () => null);
  subscribeToAllTopics("bill", () => null);
  subscribeToAllTopics("sam", () => null, { once: true });
  subscribe("jane", () => null, { topic: "blue" });
  subscribe("sally", () => null, { topic: "blue", once: true });

  assertEquals(getAllTopicsSubscriberCount(), 3);
  assertEquals(getAllTopicsSubscriberCount({ onlyFromOnce: false }), 2);
  assertEquals(getAllTopicsSubscriberCount({ onlyFromOnce: true }), 1);
  unsubscribe();
});
