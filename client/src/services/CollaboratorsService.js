import { AppState } from "../AppState.js";
import { Collaborator } from "../models/Collaborator.js";
import { api } from "./AxiosService.js"




class CollaboratorsService {
  async deleteCollaboration(collaborationId) {
    const response = await api.delete(`api/collaborators/${collaborationId}`)
    console.log('💣🙎‍♂️', response.data);
    const indexToRemove = AppState.accountCollaborators.findIndex(collaborator => collaborator.id == collaborationId)
    AppState.accountCollaborators.splice(indexToRemove, 1)
  }
  async getAccountCollaboratorAlbums() {
    const response = await api.get('account/collaborators')
    console.log('🙎‍♂️🦧', response.data);
    const collaborators = response.data.map(collaboratorData => new Collaborator(collaboratorData))
    AppState.accountCollaborators = collaborators
  }
  async becomeCollaborator(albumData) {
    const response = await api.post('api/collaborators', albumData)
    console.log('✨🙎‍♂️📔', response.data);
    const collaborator = new Collaborator(response.data)
    AppState.activeAlbumCollaborators.push(collaborator)
  }
  async getAlbumCollaborators(albumId) {
    const response = await api.get(`api/albums/${albumId}/collaborators`)
    console.log('🙎‍♂️🙎‍♂️🙎‍♂️📔', response.data);
    // const collaborator = new Collaborator(response.data) this would be used, for a single item or a 'get by id'
    const collaborators = response.data.map(collaboratorData => new Collaborator(collaboratorData))
    AppState.activeAlbumCollaborators = collaborators
  }

}

export const collaboratorsService = new CollaboratorsService()
