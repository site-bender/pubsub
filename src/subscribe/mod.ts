import subscribers from "../subscribers/mod.ts"
import type { PubSubEvent } from "../types.ts"
import not from "../utilities/not/mod.ts"

declare namespace Intl {
	type ListType = "conjunction" | "disjunction" | "unit"

	interface ListFormatOptions {
		localeMatcher?: "lookup" | "best fit"
		type?: ListType
		style?: "long" | "short" | "narrow"
	}

	interface ListFormatPart {
		type: "element" | "literal"
		value: string
	}

	export class ListFormat {
		constructor(locales?: string | string[], options?: ListFormatOptions)
		format(values: string[]): string
		formatToParts(values: string[]): ListFormatPart[]
		supportedLocalesOf(
			locales: string | string[],
			options?: ListFormatOptions,
		): string[]
	}
}

const listFormatter = new Intl.ListFormat("en", {
	style: "long",
	type: "conjunction",
})

export default function subscribe(
	token: string,
	callback: (event: PubSubEvent) => void,
	options: {
		topic: string
		once?: boolean
	},
): string | Error {
	const { once, topic } = options || {}

	if (not(token && callback && topic)) {
		/* eslint-disable @typescript-eslint/ban-ts-comment */
		// @ts-ignore: this is a guard
		const errors: Array<string> = [
			token || "token",
			callback || "callback",
			topic || "topic",
		].filter((e) => e)
		/* eslint-enable @typescript-eslint/ban-ts-comment */

		return new Error(
			`Must provide a ${listFormatter.format(errors)} to subscribe.`,
		)
	}

	if (once) {
		subscribers.once[topic] = {
			...(subscribers.once[topic] || {}),
			[token]: callback,
		}
	} else {
		subscribers.always[topic] = {
			...(subscribers.always[topic] || {}),
			[token]: callback,
		}
	}

	return token
}
