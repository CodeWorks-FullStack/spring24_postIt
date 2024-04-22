import { AppState } from "../AppState.js"
import { Album } from "../models/Album.js"
import { api } from "./AxiosService.js"




class AlbumsService {
  async getAlbumById(albumId) {
    const response = await api.get(`api/albums/${albumId}`)
    console.log('📷🦧', response.data)
    const album = new Album(response.data) // DO NOT FORGET TO CLASS YOUR DATA 🙎‍♂️
    AppState.activeAlbum = album
  }
  async getAlbums() {
    const response = await api.get('api/albums')
    console.log('📷📔', response.data)
    const albums = response.data.map(albumData => new Album(albumData))
    AppState.albums = albums
  }

}

export const albumsService = new AlbumsService()
