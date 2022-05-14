import type { PubSubEvent } from "../types.js";
export default function subscribe(token: string, callback: (event: PubSubEvent) => void, options: {
    topic: string;
    once?: boolean;
}): string | Error;
