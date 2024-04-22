import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";



export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .get('', this.getAlbums)
      .get('/:albumId', this.getOneById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
      .delete('/:albumId', this.archiveAlbum)
  }
  async createAlbum(request, response, next) {
    try {
      const user = request.userInfo
      const albumData = request.body
      albumData.creatorId = user.id
      const album = await albumsService.createAlbum(albumData)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  async getAlbums(request, response, next) {
    try {
      const albums = await albumsService.getAlbums()
      response.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async getOneById(request, response, next) {
    try {
      const albumId = request.params.albumId
      const album = await albumsService.getOneById(albumId)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  async archiveAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId
      const userId = request.userInfo.id
      const message = await albumsService.archiveAlbum(albumId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}
