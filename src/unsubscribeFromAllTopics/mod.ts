import unsubscribe from "../unsubscribe/mod.ts";
import { PUBSUB_ALL_TOPICS } from "../constants.ts";

export default function unsubscribeFromAllTopics(
  token?: string,
  options?: {
    onlyFromOnce?: boolean;
  },
): void {
  return unsubscribe(token, PUBSUB_ALL_TOPICS, options);
}
