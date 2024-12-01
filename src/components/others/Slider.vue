<template>
    <Carousel v-if="advertising.length > 0">
      <Slide v-for="ad in advertising" :key="ad.id">
        <a :href="ad.url" target="_blank" class="bg-green-700 w-full h-48 md:h-64 mx-auto rounded-xl">
        <img :src="ad.imagen" :alt="ad.nombre" class="rounded-xl h-48 md:h-64 w-full object-cover">
      </a>
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
  advertising: Array
})
</script>
