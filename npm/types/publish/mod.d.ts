import { Temporal } from "@js-temporal/polyfill";
import type { PubSubEvent } from "../types.js";
export default function publish(event: PubSubEvent, options?: {
    topic?: string;
}): Temporal.ZonedDateTime | Error;
