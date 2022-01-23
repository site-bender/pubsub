import * as dntShim from "../_dnt.test_shims.js";
import { assertEquals } from "../deps/deno_land_std_0_121_0/testing/asserts.js";
import { subscribe } from "../mod.js";
dntShim.Deno.test("it returns an error when not given the correct params", function () {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore: for testing purposes
    const err = subscribe();
    /* eslint-enable @typescript-eslint/ban-ts-comment */
    // assertEquals(err).toBeInstanceOf(Error)
    assertEquals(err.message, "Must provide a token, callback, and topic to subscribe.");
});
