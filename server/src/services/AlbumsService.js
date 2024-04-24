import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class AlbumsService {


  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator memberCount')
    return album
  }
  async getAlbums() {
    const albums = await dbContext.Albums.find().populate('creator memberCount')
    return albums
  }

  async getOneById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator memberCount')
    if (!album) throw new Error(`No album with the id: ${albumId}`)
    return album
  }

  async archiveAlbum(albumId, userId) {
    const albumToArchive = await this.getOneById(albumId)
    if (albumToArchive.creatorId != userId) throw new Forbidden(`You cannot archive what is not yours`)

    // await albumToArchive.deleteOne() // if you wanted to delete it
    // albumToArchive.archived = true // make the change
    albumToArchive.archived = !albumToArchive.archived // flips the bool
    await albumToArchive.save() // save the changes
    return `${albumToArchive.title} has been archived`
  }

}

export const albumsService = new AlbumsService()
