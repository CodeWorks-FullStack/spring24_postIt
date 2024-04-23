import { Account } from "./Account.js"



export class Picture {
  constructor(data) {
    this.id = data.id
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.creator = new Account(data.creator)
    this.albumId = data.albumId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}
