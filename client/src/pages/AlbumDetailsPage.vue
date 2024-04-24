<script setup>
import { useRoute } from 'vue-router';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';
import { computed, onBeforeMount, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { picturesService } from '../services/PicturesService.js';
import PictureCard from '../components/PictureCard.vue';
import PictureForm from '../components/PictureForm.vue';
import ModalWrapper from '../components/ModalWrapper.vue';
import { collaboratorsService } from '../services/CollaboratorsService.js';

const route = useRoute()

const album = computed(()=> AppState.activeAlbum)
const coverImg = computed(()=> `url(${AppState.activeAlbum?.coverImg}`)
const pictures = computed(()=> AppState.activeAlbumPictures)
const collaborators = computed(()=> AppState.activeAlbumCollaborators)
const youAreACollaborator = computed(()=> collaborators.value.find(collaborator => collaborator.accountId == AppState.account?.id)) // this will find whether or not the currently logged in person, is within the array of collaborators

async function getAlbumById(){
  try {
    await albumsService.getAlbumById(route.params.albumId)
  } catch (error) {
    Pop.toast("Could not get thee album", 'error')
    console.error(error);
  }
}

async function getAlbumPictures(){
  try {
    await picturesService.getAlbumPictures(route.params.albumId)
  } catch (error) {
    Pop.toast("Could not get Album Pictures", 'error')
    console.error(error);
  }
}

async function getAlbumCollaborators(){
  try {
    await collaboratorsService.getAlbumCollaborators(route.params.albumId)
  } catch (error) {
    Pop.toast("Could not get album collaborators", 'error')
    console.error(error);
  }
}

async function becomeCollaborator(){
  try {
    const albumData = {albumId: route.params.albumId}
    await collaboratorsService.becomeCollaborator(albumData)
  } catch (error) {
    Pop.toast("Could not join! 🙎‍♂️", 'error')
    console.error(error);
  }
}

// NOTE works i guess? lets just keep an eye on it
onBeforeMount(()=>{
  getAlbumById()
  getAlbumPictures()
  getAlbumCollaborators()
})

</script>


<template>
  <div v-if="album" class="container-fluid p-3 px-5">
    <div class="row cover-img justify-content-center align-items-end py-3 rounded">
      <div class="col-md-8 bg-glass rounded text-light p-3">
        <div class="text-center p-2">
          <h1>{{ album.title }}</h1>
          <p>{{ album.description }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <div>
            <span >{{album.category}}</span>
            <button class="btn btn-danger rounded-pill">archive album <i class="mdi mdi-close-circle"></i></button>
          </div>
          <div class="d-flex align-items-center">
            <span class="me-2">{{album.creator.name}}</span>
            <img class="profile-img" :src="album.creator.picture" alt="">
          </div>
        </div>
      </div>

    </div>
<!-- SECTION pictures -->
    <!-- <PictureForm/> -->

    <div class="row my-3">
      <div class="col-3">
        <div class="text-info" v-if="youAreACollaborator" >You're a collaborator!</div>
        <div class="bg-glass rounded p-2 d-flex justify-content-between">
          <div>
            <div>{{ album.memberCount }}</div>
            <div>Collaborators</div>
          </div>
          <button v-if="!album.archived && AppState.account != null" :disabled="youAreACollaborator != undefined" class="btn btn-info" title="become a collaborator" @click="becomeCollaborator()" ><i class="mdi mdi-account-plus"></i></button>
          <button v-else disabled class="btn btn-info" title="Album is archvied"  ><i class="mdi mdi-account-lock"></i></button>

        </div>
        <div class="row g-1">

          <div v-for="collaborator in collaborators" :key="collaborator.id" class="col-4">
            <img class="square-image" :src="collaborator.profile.picture" :title="collaborator.profile.name" alt="">
          </div>

        </div>
      </div>

      <div class="col-9">
        <section class="masonry my-2">
          <div v-for="picture in pictures" :key="picture.id" class="mb-2">
            <!-- <img class="img-fluid" :src="picture.imgUrl" alt=""> -->
            <PictureCard :picture="picture" />
          </div>
        </section>
      </div>
    </div>


  </div>
  <ModalWrapper modalId="create-picture-modal">
      <PictureForm/>
  </ModalWrapper>
  <button v-if="!album?.archived && AppState.account != null" class="add-picture-button btn btn-success rounded-pill" data-bs-toggle="modal" data-bs-target="#create-picture-modal">Add Picture <i class="mdi mdi-plus"></i></button>
</template>


<style lang="scss" scoped>

.profile-img{
  height: 40px;
  width: 40px;
}

.square-image{
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
}

.cover-img{
  height: 40vh;
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
}

.add-picture-button{
  position: fixed;
  bottom: 1em;
  right: 1em;
}

.masonry{
  columns: 200px;
  column-gap: .5em;
}

</style>
