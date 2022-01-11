import { subscribe } from "../index.ts"

describe("[subscribe]", function () {
	test("it returns an error when not given the correct params", function () {
		/* eslint-disable @typescript-eslint/ban-ts-comment */
		// @ts-ignore: for testing purposes
		const err = subscribe() as Error
		/* eslint-enable @typescript-eslint/ban-ts-comment */

		expect(err).toBeInstanceOf(Error)
		expect(err.message).toBe(
			"Must provide a token, callback, and topic to subscribe.",
		)
	})
})
