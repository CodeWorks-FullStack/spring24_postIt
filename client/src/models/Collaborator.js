import { Account } from "./Account.js"
import { Album } from "./Album.js"



export class Collaborator {
  constructor(data) {
    this.id = data.id
    this.albumId = data.albumId
    this.accountId = data.accountId
    this.album = data.album ? new Album(data.album) : null // sometimes collaborators, don't have albums
    this.profile = data.profile ? new Account(data.profile) : null// i would create a separate model for the profile but we are a little strapped on time
  }
}
