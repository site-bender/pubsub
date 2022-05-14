import { PUBSUB_ALL_TOPICS } from "../constants.js";
import unsubscribe from "../unsubscribe/mod.js";
export default function unsubscribeFromAllTopics(token, options) {
    return unsubscribe(token, PUBSUB_ALL_TOPICS, options);
}
