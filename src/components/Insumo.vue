<template>
  <div class="content w-full mx-auto grid mb-5 gap-2 md:w-1/2">
    <RouterLink :to="'/app/insumos/details/' + input.id" v-for="input in inputs" :key="input.id"
      class="p-1 mx-auto w-full items-center h-20 flex border-bottom-2 border-top-2"
    >
      <div class="w-full flex items-center">
        <img :src="input.primera_imagen" class="h-20 w-20" alt="Insumo Icon">
        <p class="text-gray-500 text-md font-semibold w-3/4 ml-3">{{input.nombre_comercial}}</p>
      </div>
      <svg
        width="12"
        height="7"
        class="rotate"
        viewBox="0 0 12 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.43431 6.56569C5.74673 6.8781 6.25327 6.8781 6.56569 6.56569L11.6569 1.47452C11.9693 1.1621 11.9693 0.655565 11.6569 0.343146C11.3444 0.0307264 10.8379 0.0307264 10.5255 0.343146L6 4.86863L1.47452 0.343146C1.1621 0.0307265 0.655565 0.0307265 0.343146 0.343146C0.0307264 0.655565 0.0307264 1.1621 0.343146 1.47452L5.43431 6.56569ZM5.2 5L5.2 6L6.8 6L6.8 5L5.2 5Z"
          fill="#b3b3b3"
        />
      </svg>
    </RouterLink>
  </div>

</template>

<script allowjs>
import { emitAlert } from "@/libs/alert.js";
import * as inputService from '../services/input.service.js';
export default {
  data() {
    return {
      inputs: []
    };
  },
  async created (){
    await this.getInputByCategories();
  },
  methods: {
    async getInputByCategories (){
      try {
        this.inputs = await inputService.getByCategory(this.$route.params.id);
      } catch (error) {
        emitAlert(error, 'error');
      }
    }
  }
};
</script>

<style scoped>
.rotate {
  transform: rotate(-90deg);
}
</style>
