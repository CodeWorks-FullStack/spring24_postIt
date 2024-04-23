import { dbContext } from "../db/DbContext.js"



class PicturesService {
  async getAlbumPictures(albumId) {
    // ---------------------------------------------{ albumId: '6626aca51298c57188f8b3f6' }
    const pictures = await dbContext.Pictures.find({ albumId: albumId }).populate('creator')
    return pictures
  }
  async createPicture(pictureData) {
    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator')
    return picture
  }

}


export const picturesService = new PicturesService()
