import { PUBSUB_ALL_TOPICS } from "../constants.js";
import { publish } from "../mod.js";
export default function publishToAllTopicsOnly(event, options = {}) {
    return publish(event, {
        ...options,
        topic: PUBSUB_ALL_TOPICS,
    });
}
