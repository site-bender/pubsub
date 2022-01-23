import getSubscriberCount from "../getSubscriberCount/mod.js";
export default function hasSubscribers(options = {}) {
    return Boolean(getSubscriberCount(options));
}
