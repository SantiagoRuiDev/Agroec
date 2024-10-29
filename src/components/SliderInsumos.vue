<template>
  <Carousel v-if="images.length > 0">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url_imagen" alt="Insumo Imagen" class="h-64 md:h-96 w-full object-cover">
    </Slide>
    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { defineProps } from "vue";
import 'vue3-carousel/dist/carousel.css'

const props = defineProps({
  images: Array
})
</script>
