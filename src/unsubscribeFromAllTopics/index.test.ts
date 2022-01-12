import {
  getSubscriberCount,
  subscribe,
  subscribeToAllTopics,
  unsubscribe,
  unsubscribeFromAllTopics,
} from "../index.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("it unsubscribes without token", function () {
  subscribe("jane", () => null, { topic: "blue" });
  subscribe("jane", () => null, { topic: "red" });
  subscribeToAllTopics("julie", () => null);

  assertEquals(getSubscriberCount(), 3);

  unsubscribeFromAllTopics();

  assertEquals(getSubscriberCount(), 2);
  unsubscribe();
});
