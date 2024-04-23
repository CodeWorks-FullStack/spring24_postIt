import { AppState } from "../AppState.js";
import { Picture } from "../models/Picture.js";
import { api } from "./AxiosService.js"




class PicturesService {
  async createPicture(pictureData) {
    const response = await api.post('api/pictures', pictureData)
    console.log('✨🖼️', response.data);
    const picture = new Picture(response.data)
    AppState.activeAlbumPictures.push(picture)
  }
  async getAlbumPictures(albumId) {
    const response = await api.get(`api/albums/${albumId}/pictures`)
    console.log('📔🖼️', response.data);
    const pictures = response.data.map(pictureData => new Picture(pictureData))
    AppState.activeAlbumPictures = pictures
  }

}

export const picturesService = new PicturesService()
