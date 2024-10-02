<template>
  <Splide :options="{ rewind: true, wheel: true, arrows: false, gap: '15px' }" aria-label="Agroec Adversiting Banner"
    class="my-3 gap-2">
    <SplideSlide v-for="ad in advertising" :key="ad.id">
      <a :href="ad.url" target="_blank" class="bg-green-700 w-full h-48 md:h-64 mx-auto rounded-xl">
        <img :src="ad.imagen" :alt="ad.nombre" class="rounded-xl h-48 md:h-64 w-full object-cover">
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
    advertising: Array
  },
  components: { Splide, SplideSlide },
});
</script>
