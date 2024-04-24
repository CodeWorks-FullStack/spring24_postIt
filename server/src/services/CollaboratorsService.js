import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class CollaboratorsService {
  async createCollaborator(collaboratorData) {
    const collaborator = await dbContext.Collaborators.create(collaboratorData)
    // await collaborator.populate({ path: 'profile' })
    // await collaborator.populate('profile album', 'name picture') careful combining populates, you have less control
    await collaborator.populate('profile album', '-email')
    // await collaborator.populate(['profile', 'album'])
    // await collaborator.populate('album')
    return collaborator
  }
  async getAlbumCollaborators(albumId) {
    const collaborators = await dbContext.Collaborators.find({ albumId: albumId }).populate('profile')
    return collaborators
  }
  async getAccountCollaborators(userId) {
    const collaborators = await dbContext.Collaborators.find({ accountId: userId }).populate('album')
    return collaborators
  }
  async deleteCollaborator(collaboratorId, userId) {
    const collaboratorToDelete = await dbContext.Collaborators.findById(collaboratorId)
    if (!collaboratorToDelete) throw new Error(`No collaborator with id ${collaboratorId}`)
    if (collaboratorToDelete.accountId != userId) throw new Forbidden("This action is forbidden! 🧙‍♂️")

    await collaboratorToDelete.populate('profile album', 'name title')
    await collaboratorToDelete.deleteOne()
    // @ts-ignore
    return `Collaboration between ${collaboratorToDelete.profile.name} and ${collaboratorToDelete.album.title} has ended`
  }

}

export const collaboratorsService = new CollaboratorsService()
