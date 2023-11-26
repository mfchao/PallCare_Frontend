import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotFoundError } from "./errors";

export interface DiaryDoc extends BaseDoc {
  author: ObjectId;
  content: string; // could add extra types if necessary for images / video / audio recordings
  revealed: Boolean;
}

export default class DiaryConcept {
  public readonly diaries = new DocCollection<DiaryDoc>("diaries");

  /**
   * Create a new diary entry
   * @param author ObjectId associated w/ the author
   * @param content string representing the diary entry
   * @returns adds a new DiaryDoc to 'this.diaries'
   */
  async create(author: ObjectId, content: string) {
    const _id = await this.diaries.createOne({ author, content, revealed: false });
    return { msg: "Created a diary entry.", diary: await this.diaries.readOne({ _id }) };
  }

  /**
   * Update the content of a diary entry
   * @param _id ObjectId associated with a specific diary entry
   * @param newContent updated content to associate w/ a diary entry
   * @returns updates 'this.diaries.content' to 'newContent'
   */
  async modify(_id: ObjectId, newContent: string) {
    await this.diaries.updateOne({ _id }, { content: newContent });
    return { msg: "Updated diary entry." };
  }

  /**
   * Delete a diary entry
   * @param _id ObjectId associated with a specific diary entry
   * @returns deletes diary w/ '_id' from 'this.diaries'
   */
  async delete(_id: ObjectId) {
    await this.diaries.deleteOne({ _id });
    return { msg: "Deleted diary entry." };
  }

  /**
   * Find all diary entries written by a specific user
   * @param author ObjectId associated w/ the author
   * @returns all DiaryDocs in 'this.diaries' with 'this.diaries.author' === 'author'
   */
  async getEntriesByAuthor(author: ObjectId) {
    return await this.diaries.readMany({ author });
  }

  /**
   * Reveal a diary entry to be seen by others
   * @param _id ObjectId associated with a specific diary entry
   * @returns sets 'this.diaries.revealed' = true
   */
  async revealEntry(_id: ObjectId) {
    await this.diaries.updateOne({ _id }, { revealed: true });
    return { msg: "Revealed diary entry." };
  }

  /**
   * Hides a diary entry so it can not be seen by others
   * @param _id ObjectId associated with a specific diary entry
   * @returns sets 'this.diaries.revealed' = false
   */
  async hideEntry(_id: ObjectId) {
    await this.diaries.updateOne({ _id }, { revealed: false });
    return { msg: "Hid diary entry." };
  }

  /**
   * Checks whether a particular diary entry is hidden or not
   * @param _id ObjectId associated with a specific diary entry
   * @returns true iff 'this.diaries.revealed' === false
   */
  async isHidden(_id: ObjectId) {
    const diary = await this.diaries.readOne({ _id });
    if (!diary) {
      throw new NotFoundError(`Diary entry with id=${_id} DNE.`);
    } else {
      return diary.revealed === false;
    }
  }
}
