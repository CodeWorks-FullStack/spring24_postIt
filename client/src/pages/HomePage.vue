<script setup>
import { computed, onMounted } from 'vue';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import AlbumCard from '../components/AlbumCard.vue';

const albums = computed(()=> AppState.albums)

async function getAlbums(){
  try {
    await albumsService.getAlbums()
  } catch (error) {
    Pop.toast("Could not get albums", 'error')
    console.error(error)
  }
}

onMounted(()=>{ // when this component is loaded in, get the albums
  getAlbums()
})

</script>

<template>
 <div class="container">
  <section class="row g-2 my-2">
    <!-- {{ albums }} -->
    <div v-for="album in albums" :key="album.id" class="col-12 col-md-4">
      <!-- {{ album.title }} -->
      <AlbumCard :album="album"/>
    </div>
  </section>
 </div>
</template>

<style scoped lang="scss">

</style>
