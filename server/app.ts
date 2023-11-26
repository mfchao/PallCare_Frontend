import FriendConcept from "./concepts/friend";
import PostConcept from "./concepts/post";
import TopicConcept from "./concepts/topic";
import UserConcept from "./concepts/user";
import WebSessionConcept from "./concepts/websession";
import WishConcept from "./concepts/wish";

// App Definition using concepts
export const WebSession = new WebSessionConcept();
export const User = new UserConcept();
export const Post = new PostConcept();
export const Friend = new FriendConcept();
export const Wish = new WishConcept();
export const Topic = new TopicConcept();
