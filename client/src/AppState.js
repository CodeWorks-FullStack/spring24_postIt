import { reactive } from 'vue'
import { Album } from './models/Album.js'
import { Picture } from './models/Picture.js'
import { Collaborator } from './models/Collaborator.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {{name, picture, id}} user info from Auth0*/
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {Album[]} */
  albums: [],

  /** @type {Album} */
  activeAlbum: null,

  /** @type {Picture[]} */
  activeAlbumPictures: [],


  /** @type {Collaborator[]} */
  activeAlbumCollaborators: [],

  /** @type {Collaborator[]} */
  accountCollaborators: []

  // NOTE there are lot of class names that are already used, modify them for your cases, or triple check your import is there
  // Comment,
  // Image
  // Event
  // Object
})
