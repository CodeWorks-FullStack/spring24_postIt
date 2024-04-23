<script setup>
import { Picture } from '../models/Picture.js';


defineProps({picture: {type: Picture, required: true}})

</script>


<template>
  <div :title="`Posted by ${picture.creator.name}`" >
    <img :src="picture.imgUrl" class="img-fluid rounded" :alt="`A beautiful picture posted by ${picture.creator.name}`">
  </div>
</template>


<style lang="scss" scoped>

</style>
