import { Account } from "./Account.js"


export class Album {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.coverImg = data.coverImg
    this.category = data.category
    this.creatorId = data.creatorId
    this.archived = data.archived
    this.creator = data.creator ? new Account(data.creator) : null
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    // NOTE added a virtual
    this.memberCount = data.memberCount
  }
}
