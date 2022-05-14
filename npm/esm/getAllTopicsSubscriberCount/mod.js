import { PUBSUB_ALL_TOPICS } from "../constants.js";
import getSubscriberCount from "../getSubscriberCount/mod.js";
export default function getAllTopicsSubscriberCount(options = {}) {
    return getSubscriberCount({
        ...options,
        topic: PUBSUB_ALL_TOPICS,
    });
}
