<script setup>
import { computed, onMounted, ref } from 'vue';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import AlbumCard from '../components/AlbumCard.vue';
import AlbumForm from '../components/AlbumForm.vue';
import ModalWrapper from '../components/ModalWrapper.vue';

const filterBy = ref('all')

const albums = computed(()=> {
  if(filterBy.value == 'all') return AppState.albums
  return AppState.albums.filter(album => album.category == filterBy.value)
})

const filters = [
  {
    name: 'all',
    backgroundImage: 'https://images.unsplash.com/photo-1597242051386-c0a24ceae025?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHVycGxlJTIwY2xvdWRzfGVufDB8fDB8fHww'
  },
  {
    name: 'animals',
    backgroundImage: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFuaW1hbHN8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'crocs',
    backgroundImage: 'https://plus.unsplash.com/premium_photo-1667667845996-c8f8f4719ac7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3JvY3N8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'aesthetics',
    backgroundImage: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bnQlMjBmdWppfGVufDB8fDB8fHww'
  },
  {
    name: 'food',
    backgroundImage: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'games',
    backgroundImage: 'https://plus.unsplash.com/premium_photo-1665203485797-6fe4e8755beb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHZpZGVvJTIwZ2FtZXN8ZW58MHx8MHx8fDA%3D'
  },
  {
    name: 'misc',
    backgroundImage: 'https://images.unsplash.com/photo-1541356665065-22676f35dd40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGFic3RyYWN0fGVufDB8fDB8fHww'
  }
]

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

  <!-- <AlbumForm/> -->

  <section class="row g-2 my-2">
    <div class="col-6 col-sm-4 col-md-3" v-for="filterObj in filters" :key="filterObj.name">
      <div @click="filterBy = filterObj.name" role="button" class="filter-card rounded selectable" :style="`--bg-img: url(${filterObj.backgroundImage})`">{{ filterObj.name }}</div>
    </div>
    <div class="col" >
      <div class="filter-card rounded selectable" style="--bg-img: url(https://images.unsplash.com/photo-1546099969-7383ab0f676f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWJzdHJhY3QlMjBncmVlbnxlbnwwfHwwfHx8MA%3D%3D)" data-bs-toggle="modal" data-bs-target="#create-album-modal" >
        <i class="mdi mdi-plus"></i> create
      </div>
    </div>
  </section>


  <h2 class="mb-1">Popular Albums</h2>
  <hr/>
  <section class="row g-2 my-2">
    <!-- {{ albums }} -->
    <div v-for="album in albums" :key="album.id" class="col-12 col-md-4">
      <!-- {{ album.title }} -->
      <AlbumCard :album="album"/>
    </div>
  </section>

</div>
<!-- NOTE the modal has to be here, it's just hidden from view -->
<ModalWrapper modalId="create-album-modal">
<!-- <form action="">
  <label for="">Get Creating!</label>
  <input type="text">
</form> -->
  <AlbumForm/>
</ModalWrapper>
</template>

<style scoped lang="scss">

.filter-card{
  height: 10vh;
  background-color: purple;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: var(--bg-img);
  background-position: center;
  background-size: cover;
  color: white;
  font-weight: bold;
  text-shadow: 0px 0px 10px black;
  filter: contrast(.8);
}

</style>
