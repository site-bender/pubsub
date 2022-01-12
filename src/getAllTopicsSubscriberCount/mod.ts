import { PUBSUB_ALL_TOPICS } from "../constants.ts";
import getSubscriberCount from "../getSubscriberCount/mod.ts";

export default function getAllTopicsSubscriberCount(
  options: {
    onlyFromOnce?: boolean;
  } = {},
): number {
  return getSubscriberCount({
    ...options,
    topic: PUBSUB_ALL_TOPICS,
  });
}
