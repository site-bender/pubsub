import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts";
import {
  publish,
  publishToAllTopicsOnly,
  subscribe,
  subscribeToAllTopics,
  unsubscribe,
} from "../index.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import type { PubSubEvent } from "../types.ts";

Deno.test("it publishes to All Topics only correctly", function () {
  const id = "my-id";
  const topic = "blue";
  const eventName = "PUBLISHED";
  const data = {
    color: "cyan",
  };

  // TODO: Find a better way to create a mocked callback
  const cbArgs = [] as PubSubEvent[];
  const cb = (event: PubSubEvent) => {
    cbArgs.push(event);
  };
  const cbAllTopicsArgs = [] as PubSubEvent[];
  const cbAllTopics = (event: PubSubEvent) => {
    cbAllTopicsArgs.push(event);
  };

  subscribe("jane", cb, { topic });
  subscribeToAllTopics("bob", cbAllTopics);

  const t1 = publishToAllTopicsOnly({
    eventName,
    data,
  });

  const t2 = publish(
    {
      id,
      eventName,
      data,
    },
    {
      topic,
    },
  );

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

Deno.test("it returns an error when no event name", function () {
  const topic = "blue";
  const data = {};

  const cbAllTopics = () => {};

  subscribeToAllTopics("bob", cbAllTopics);

  const err: Error = publishToAllTopicsOnly(
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore: for testing purposes
    {
      data,
    },
    {
      topic,
    },
    /* eslint-enable @typescript-eslint/ban-ts-comment */
  ) as Error;

  // assertEquals(err).toBeInstanceOf(Error)
  assertEquals(err.message, "Published events must have a topic (event name).");
});
