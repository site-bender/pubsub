import * as dntShim from "../_dnt.test_shims.js";
import { assertEquals } from "../deps/deno_land_std_0_121_0/testing/asserts.js";
import { getSubscriberCount, subscribe, subscribeToAllTopics, unsubscribe, unsubscribeFromAllTopics, } from "../mod.js";
dntShim.Deno.test("it unsubscribes without token", function () {
    subscribe("jane", () => null, { topic: "blue" });
    subscribe("jane", () => null, { topic: "red" });
    subscribeToAllTopics("julie", () => null);
    assertEquals(getSubscriberCount(), 3);
    unsubscribeFromAllTopics();
    assertEquals(getSubscriberCount(), 2);
    unsubscribe();
});
