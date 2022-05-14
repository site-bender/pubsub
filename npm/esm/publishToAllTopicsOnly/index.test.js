import * as dntShim from "../_dnt.test_shims.js";
import { Temporal } from "@js-temporal/polyfill";
import { assertEquals } from "../deps/deno_land_std_0_121_0/testing/asserts.js";
import { publish, publishToAllTopicsOnly, subscribe, subscribeToAllTopics, unsubscribe, } from "../mod.js";
dntShim.Deno.test("it publishes to All Topics only correctly", function () {
    const id = "my-id";
    const topic = "blue";
    const eventName = "PUBLISHED";
    const data = {
        color: "cyan",
    };
    // TODO: Find a better way to create a mocked callback
    const cbArgs = [];
    const cb = (event) => {
        cbArgs.push(event);
    };
    const cbAllTopicsArgs = [];
    const cbAllTopics = (event) => {
        cbAllTopicsArgs.push(event);
    };
    subscribe("jane", cb, { topic });
    subscribeToAllTopics("bob", cbAllTopics);
    const t1 = publishToAllTopicsOnly({
        eventName,
        data,
    });
    const t2 = publish({
        id,
        eventName,
        data,
    }, {
        topic,
    });
    const one = cbAllTopicsArgs[0];
    const two = cbArgs[0];
    assertEquals(t1 instanceof Temporal.ZonedDateTime, true);
    assertEquals(one?.id?.length, 21);
    assertEquals(one.eventName, eventName);
    assertEquals(one.timestamp instanceof Temporal.ZonedDateTime, true);
    assertEquals(one.data, data);
    assertEquals(t2 instanceof Temporal.ZonedDateTime, true);
    assertEquals(two.id, id);
    assertEquals(two.eventName, eventName);
    assertEquals(two.timestamp instanceof Temporal.ZonedDateTime, true);
    assertEquals(two.data, data);
    unsubscribe();
});
dntShim.Deno.test("it returns an error when no event name", function () {
    const topic = "blue";
    const data = {};
    const cbAllTopics = () => { };
    subscribeToAllTopics("bob", cbAllTopics);
    const err = publishToAllTopicsOnly(
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore: for testing purposes
    {
        data,
    }, {
        topic,
    });
    // assertEquals(err).toBeInstanceOf(Error)
    assertEquals(err.message, "Published events must have a topic (event name).");
});
