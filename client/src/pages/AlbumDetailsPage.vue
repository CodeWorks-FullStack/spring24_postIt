<script setup>
import { useRoute } from 'vue-router';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';
import { computed, onBeforeMount, onMounted } from 'vue';
import { AppState } from '../AppState.js';

const route = useRoute()

const album = computed(()=> AppState.activeAlbum)
const coverImg = computed(()=> `url(${AppState.activeAlbum?.coverImg}`)

async function getAlbumById(){
  try {
    await albumsService.getAlbumById(route.params.albumId)
  } catch (error) {
    Pop.toast("Could not get thee album", 'error')
    console.error(error);
  }
}

// NOTE works i guess? lets just keep an eye on it
onBeforeMount(()=>{
  getAlbumById()
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
  </div>
</template>


<style lang="scss" scoped>

.profile-img{
  height: 40px;
  width: 40px;
}

.cover-img{
  height: 40vh;
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
}

</style>
