<script setup>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { picturesService } from '../services/PicturesService.js';
import { useRoute } from 'vue-router';
import { Modal } from 'bootstrap';

const route = useRoute()

const pictureData = ref(
  {
    imgUrl: '',
    albumId: route.params.albumId // we need the albumId here, so this picture is associated with this album
  }
)

async function createPicture(){
  try {
    // pictureData.value.albumId = route.params.albumId // right before we send it to the service, give it the albumId
    await picturesService.createPicture(pictureData.value)
    Modal.getOrCreateInstance('#create-picture-modal').hide()
    Pop.toast("Picture Added", 'success')
    resetForm()
  } catch (error) {
    Pop.toast("Could not add picture", 'error')
  }
}

function resetForm(){
  pictureData.value = {
    imgUrl: '',
    albumId: route.params.albumId // don't forget to reuse the id on the reset
  }
}

</script>


<template>
  <div class="container-fluid">
    <form @submit.prevent="createPicture()" class="row">
      <div class="mb-3 col-6">
        <label for="picture-img-url">Image Url</label>
        <input v-model="pictureData.imgUrl" type="url" class="form-control" required placeholder="http://....">
      </div>
      <div class="mb-2 col-6">
        <label for="picture-preview">Preview</label>
        <img class="img-fluid" :src="pictureData.imgUrl || 'https://images.unsplash.com/photo-1556888335-95371827d5fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxhY2Vob2xkZXJ8ZW58MHx8MHx8fDA%3D'" alt="">
      </div>
      <div class="mb-2 col-12 text-end">
        <button class="btn btn-primary" >Add Picture <i class="mdi mdi-plus"></i></button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped>
form{
  img{
    height: 15vh;
    object-fit: contain;
  }
}
</style>
