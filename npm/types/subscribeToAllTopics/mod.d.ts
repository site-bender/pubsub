import type { PubSubEvent } from "../types.js";
export default function subscribeToAllTopics(token: string, callback: (event: PubSubEvent) => void, options?: {
    once?: boolean;
}): string | Error;
