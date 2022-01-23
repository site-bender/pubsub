import * as dntShim from "../_dnt.test_shims.js";
import { assertEquals } from "../deps/deno_land_std_0_121_0/testing/asserts.js";
import { getSubscriberCount, subscribe, subscribeToAllTopics, unsubscribe, } from "../mod.js";
dntShim.Deno.test("subscriber count from an empty cache is zero", function () {
    assertEquals(getSubscriberCount(), 0);
});
dntShim.Deno.test("subscriber count from a full cache is correct", function () {
    subscribeToAllTopics("bob", () => null);
    subscribeToAllTopics("bill", () => null);
    subscribeToAllTopics("sam", () => null, { once: true });
    subscribe("jane", () => null, { topic: "blue" });
    subscribe("sally", () => null, { topic: "blue", once: true });
    assertEquals(getSubscriberCount(), 5);
    assertEquals(getSubscriberCount({ onlyFromOnce: false }), 3);
    assertEquals(getSubscriberCount({ onlyFromOnce: true }), 2);
    unsubscribe();
});
