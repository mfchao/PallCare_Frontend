import { ObjectId } from "mongodb";

import { Router, getExpressRouter } from "./framework/router";

import { Delay, Diary, Friend, Letter, Post, User, WebSession, Wish } from "./app";
import { NotAllowedError } from "./concepts/errors";
import { PostDoc, PostOptions } from "./concepts/post";
import { UserDoc } from "./concepts/user";
import { WebSessionDoc } from "./concepts/websession";
import { WishDoc } from "./concepts/wish";
import Responses from "./responses";

//===============================================================
// HELPER FUNCTIONS FOR ROUTES
//===============================================================
async function timeCapsuleByOwner(user: ObjectId) {
  return (await Delay.getDelaysByOwner(user)).filter((delay) => Delay.isTimeCapsule(delay._id));
}

class Routes {
  // ############################################################
  // session
  // ############################################################
  @Router.get("/session")
  async getSessionUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.getUserById(user);
  }

  // ############################################################
  // user
  // ############################################################
  @Router.get("/users")
  async getUsers() {
    return await User.getUsers();
  }

  @Router.get("/users/:username")
  async getUser(username: string) {
    return await User.getUserByUsername(username);
  }

  @Router.post("/users")
  async createUser(session: WebSessionDoc, username: string, password: string, userType: string) {
    WebSession.isLoggedOut(session);
    return await User.create(username, password, userType);
  }

  @Router.patch("/users")
  async updateUser(session: WebSessionDoc, update: Partial<UserDoc>) {
    const user = WebSession.getUser(session);
    return await User.update(user, update);
  }

  @Router.delete("/users")
  async deleteUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    WebSession.end(session);
    return await User.delete(user);
  }

  @Router.post("/login")
  async logIn(session: WebSessionDoc, username: string, password: string) {
    const u = await User.authenticate(username, password);
    WebSession.start(session, u._id);
    return { msg: "Logged in!" };
  }

  @Router.post("/logout")
  async logOut(session: WebSessionDoc) {
    WebSession.end(session);
    return { msg: "Logged out!" };
  }

  // ############################################################
  // post
  // ############################################################
  @Router.get("/posts")
  async getPosts(author?: string) {
    let posts;
    if (author) {
      const id = (await User.getUserByUsername(author))._id;
      posts = await Post.getByAuthor(id);
    } else {
      posts = await Post.getPosts({});
    }
    return Responses.posts(posts);
  }

  @Router.post("/posts")
  async createPost(session: WebSessionDoc, content: string, options?: PostOptions) {
    const user = WebSession.getUser(session);
    const created = await Post.create(user, content, options);
    return { msg: created.msg, post: await Responses.post(created.post) };
  }

  @Router.patch("/posts/:_id")
  async updatePost(session: WebSessionDoc, _id: ObjectId, update: Partial<PostDoc>) {
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    return await Post.update(_id, update);
  }

  @Router.delete("/posts/:_id")
  async deletePost(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    return Post.delete(_id);
  }

  // ############################################################
  // friend
  // ############################################################
  @Router.get("/friends")
  async getFriends(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.idsToUsernames(await Friend.getFriends(user));
  }

  @Router.delete("/friends/:friend")
  async removeFriend(session: WebSessionDoc, friend: string) {
    const user = WebSession.getUser(session);
    const friendId = (await User.getUserByUsername(friend))._id;
    return await Friend.removeFriend(user, friendId);
  }

  @Router.get("/friend/requests")
  async getRequests(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Responses.friendRequests(await Friend.getRequests(user));
  }

  @Router.post("/friend/requests/:to")
  async sendFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.sendRequest(user, toId);
  }

  @Router.delete("/friend/requests/:to")
  async removeFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.removeRequest(user, toId);
  }

  @Router.put("/friend/accept/:from")
  async acceptFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.acceptRequest(fromId, user);
  }

  @Router.put("/friend/reject/:from")
  async rejectFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.rejectRequest(fromId, user);
  }

  // ############################################################
  // wish
  // ############################################################
  @Router.get("/wishes")
  async getWishes(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Responses.wishes(await Wish.getByAuthor(user));
  }

  @Router.post("/wishes")
  async createWish(session: WebSessionDoc, content: string, visibility: "public" | ObjectId[] | "private") {
    const user = WebSession.getUser(session);
    const created = await Wish.create(user, content, visibility);
    return { msg: created.msg, wish: await Responses.wish(created.wish) };
  }

  @Router.patch("/wishes/:_id")
  async updatewish(session: WebSessionDoc, _id: ObjectId, update: Partial<WishDoc>) {
    const user = WebSession.getUser(session);
    await Wish.isAuthor(user, _id);
    return await Wish.update(_id, update);
  }

  @Router.delete("/wishes/:_id")
  async deletewish(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Wish.isAuthor(user, _id);
    return Wish.delete(_id);
  }

  // ############################################################
  // Topic/Forum
  // ############################################################
  @Router.get("/topics")
  async getAllTopics() {
    //pagination
  }
  // ############################################################
  // Diary
  // ############################################################
  @Router.post("/diaries")
  async createDiary(session: WebSessionDoc, content: string) {
    const user = WebSession.getUser(session);
    return await Diary.create(user, content);
  }

  @Router.get("/diaries/entries/:author")
  async getEntriesByAuthor(session: WebSessionDoc, author: ObjectId) {
    const user = WebSession.getUser(session);
    return await Diary.getEntriesByAuthor(user, author);
  }

  @Router.get("/diaries/:_id")
  async getDiaryById(_id: ObjectId) {
    return await Diary.getEntryById(_id);
  }

  @Router.get("/diaries/revealed/:_id")
  async isDiaryHidden(_id: ObjectId) {
    return await Diary.isHidden(_id);
  }

  @Router.delete("/diaries/:_id")
  async deleteDiary(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Diary.checkRep(user, _id);
    return await Diary.delete(_id);
  }

  @Router.patch("/diaries/:_id&content")
  async modifyDiaryContent(session: WebSessionDoc, _id: ObjectId, content: string) {
    const user = WebSession.getUser(session);
    await Diary.checkRep(user, _id);
    const update = { content };
    return await Diary.update(_id, update);
  }

  @Router.patch("/diaries/reveal/:_id")
  async revealDiary(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Diary.checkRep(user, _id);
    const update = { revealed: true };
    return await Diary.update(_id, update);
  }

  @Router.patch("/diaries/hide/:_id")
  async hideDiary(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Diary.checkRep(user, _id);
    const update = { revealed: false };
    return await Diary.update(_id, update);
  }
  // ############################################################
  // Delay
  // ############################################################
  @Router.post("/delay")
  async createDelay(session: WebSessionDoc, content: ObjectId, type: "Diary" | "Letter", behavior: "send" | "delete" | "reveal" | "hide", activation: Date) {
    const user = WebSession.getUser(session);
    return await Delay.create(user, content, type, behavior, activation);
  }

  @Router.get("/delay/:_id")
  async getDelayById(_id: ObjectId) {
    return await Delay.getDelayByContent(_id);
  }

  @Router.get("/delay/content/:_id")
  async getDelayByContent(content: ObjectId) {
    return await Delay.getDelayByContent(content);
  }

  @Router.get("/delay/owner")
  async getDelaysByUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Delay.getDelaysByOwner(user);
  }

  @Router.get("/delay/expired/:_id")
  async isDelayExpired(_id: ObjectId) {
    return await Delay.isExpired(_id);
  }

  @Router.delete("delay/:_id")
  async deleteDelay(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Delay.checkRep(user, _id);
    return await Delay.delete(_id);
  }

  /**System function**/
  @Router.delete("/delay/executed/:_id")
  async executeDelay(_id: ObjectId) {
    const delay = await Delay.getDelayById(_id);
    await Delay.delete(_id); // want to delete Delay upon execution (whether it throws error or not)
    switch (delay.type) {
      case "Diary":
        switch (delay.behavior) {
          case "hide":
            return await Diary.update(delay.content, { revealed: false });
          case "reveal":
            return await Diary.update(delay.content, { revealed: true });
          case "delete":
            return await Diary.delete(delay.content);
          default:
            throw new NotAllowedError(`Behavior "${delay.behavior}" is not supported for a Delayed Diary.`);
        }
      case "Letter":
        switch (delay.behavior) {
          case "send":
            return await Letter.sendLetter(delay.content);
          case "delete":
            return await Letter.deleteLetter_server(delay.content);
          default:
            throw new NotAllowedError(`Behavior "${delay.behavior}" is not supported for a Delayed Letter.`);
        }
      default:
        throw new NotAllowedError(`Delay does not currently support content of type ${delay.type}.`);
    }
  }

  @Router.patch("/delay/activation/:_id&time")
  async updateDelayExpiration(session: WebSessionDoc, _id: ObjectId, activation: Date) {
    const user = WebSession.getUser(session);
    await Delay.checkRep(user, _id);
    return await Delay.updateActivation(_id, activation);
  }

  // ############################################################
  // Time Capsule: Delay + Diary + Letter
  // ############################################################
  @Router.post("/delay/timecapsule")
  async addToTimeCapsule(session: WebSessionDoc, content: ObjectId, type: "Diary" | "Letter") {
    const user = WebSession.getUser(session);
    const behavior = type === "Diary" ? "reveal" : "send";
    return await Delay.create(user, content, type, behavior, new Date(0));
  }

  @Router.get("delay/timecapsule")
  async getUserTimeCapsule(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await timeCapsuleByOwner(user);
  }

  /**System function**/
  @Router.delete("delay/timecapsule")
  async releaseTimeCapsule(user: ObjectId) {
    const timeCapsule = await timeCapsuleByOwner(user);
    for (const delay of timeCapsule) {
      await Delay.delete(delay._id);
      switch (delay.type) {
        case "Diary":
          await Diary.update(delay.content, { revealed: true });
          break;
        case "Letter":
          await Letter.sendLetter(delay.content);
          break;
        default:
          throw new NotAllowedError(`Delay does not currently support content of type ${delay.type}.`);
      }
    }
  }
}

export default getExpressRouter(new Routes());
