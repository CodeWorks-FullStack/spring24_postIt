<script setup>
import { computed } from 'vue';
import { Album } from '../models/Album.js';


const props = defineProps({album: {type: Album, required: true}})// passing one marker

// const albums = computed(()=> AppState.albums) // how does it know which one it is? (answer: it doesn't)

const bgStyle = computed(()=> `url(${props.album.coverImg})`)

const borderColor = computed(()=>{
  switch(props.album.category){
    case 'aesthetics':
      return '#3DA69F'
    case 'animals':
      return '#54C58F'
    case 'games':
      return '#6951CA'
    case 'food':
      return '#EAB222'
    default:
    return '#CFD8DC'
  }
})

</script>


<template>

<RouterLink :to="{name: 'Album Details', params: {albumId: album.id}}">
  <div class="card border p-2 d-flex">
    <div class="h-100 d-flex align-items-end">
      <!-- 📔Album Title -->
      <!-- 📔{{ album.title}} -->
      <div class="card-body p-2 bg-glass rounded text-light">
      <div class="color-border">
        <h4 class="mb-1">{{ album.title }}</h4>
        <div class="d-flex">
          <img :src="album.creator.picture" class="profile-img" alt="`A beautiful picture of ${album.creator.name}`">
          <div class="text-secondary ms-1">{{ album.creator.name }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</RouterLink>
</template>


<style lang="scss" scoped>
.card{
  height: 25vh;
  background-image: v-bind(bgStyle);
  background-position: center;
  background-size: cover;
}




.color-border{
  border-left: 4.5px solid v-bind(borderColor);
  padding-left: 6px;
}
</style>
