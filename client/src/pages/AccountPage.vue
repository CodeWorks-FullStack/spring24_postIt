<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { collaboratorsService } from '../services/CollaboratorsService.js';
import AlbumCard from '../components/AlbumCard.vue';

const account = computed(() => AppState.account)
const collaborators = computed(()=> AppState.accountCollaborators)

async function getAccountCollaboratorAlbums(){
  try {
    await collaboratorsService.getAccountCollaboratorAlbums()
  } catch (error) {
    Pop.toast("Could not get account albums", 'error')
    console.error(error);
  }
}

async function deleteCollaboration(collaborationId){
  try {
    await collaboratorsService.deleteCollaboration(collaborationId)
  } catch (error) {
    Pop.toast("Could note leave album", 'error')
    console.error(error);
  }
}

onMounted(()=>{
  getAccountCollaboratorAlbums()
})

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>

      <section class="container">
        <div class="row">

          <!-- NOTE the delete button is here with the collaborator, not in with the album card -->
          <div v-for="collaborator in collaborators" :key="collaborator.id" class="col-6 col-md-4">
            <!-- {{collaborator}} -->
            <AlbumCard :album="collaborator.album"/>
            <div class="text-end">
              <button @click="deleteCollaboration(collaborator.id)" class="btn btn-danger rounded-pill">leave <i class="mdi mdi-logout"></i></button>
            </div>
          </div>


        </div>
      </section>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
