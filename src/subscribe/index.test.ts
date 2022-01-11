import { subscribe } from "../index.ts"
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

	Deno.test("it returns an error when not given the correct params", function () {
		/* eslint-disable @typescript-eslint/ban-ts-comment */
		// @ts-ignore: for testing purposes
		const err = subscribe() as Error
		/* eslint-enable @typescript-eslint/ban-ts-comment */

		// assertEquals(err).toBeInstanceOf(Error)
		assertEquals(err.message,
			"Must provide a token, callback, and topic to subscribe.",
		)
	})
