import { PUBSUB_ALL_TOPICS } from "../constants.js";
import { subscribe } from "../mod.js";
export default function subscribeToAllTopics(token, callback, options = {}) {
    return subscribe(token, callback, {
        ...options,
        topic: PUBSUB_ALL_TOPICS,
    });
}
