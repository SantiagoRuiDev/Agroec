<template>
  <Splide :options="{ rewind: true, wheel: true, arrows: false, gap: '15px' }" aria-label="Agroec Product Images Carousel"
    class="h-64 md:w-1/2 mx-auto mb-3 max-h-64">
    <SplideSlide v-for="image in images" :key="image.id">
      <a :href="image.url_imagen" target="_blank" class="bg-green-700 h-full w-full">
        <img :src="image.url_imagen" :alt="'Insumo Imagen'" class="h-64 w-full object-cover">
      </a>
    </SplideSlide>
  </Splide>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { defineComponent } from "vue";
import "@splidejs/vue-splide/css";

export default defineComponent({
  props: {
    images: Array
  },
  components: { Splide, SplideSlide },
});
</script>
