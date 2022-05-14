import type { Temporal } from "@js-temporal/polyfill";
import type { PubSubEvent } from "../types.js";
export default function publishToAllTopicsOnly(event: PubSubEvent, options?: {}): Temporal.ZonedDateTime | Error;
