import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";



export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
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
}
