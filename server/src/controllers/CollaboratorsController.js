import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";



export class CollaboratorsController extends BaseController {
  constructor() {
    super('api/collaborators')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCollaborator)
      .delete('/:collaboratorId', this.deleteCollaborator)
  }

  async createCollaborator(request, response, next) {
    try {
      const collaboratorData = request.body
      const user = request.userInfo // this is only here, if this request comes after the use
      collaboratorData.accountId = user.id
      const collaborator = await collaboratorsService.createCollaborator(collaboratorData)
      response.send(collaborator)
    } catch (error) {
      next(error)
    }
  }

  async deleteCollaborator(request, response, next) {
    try {
      const collaboratorId = request.params.collaboratorId
      const user = request.userInfo
      const message = await collaboratorsService.deleteCollaborator(collaboratorId, user.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}
