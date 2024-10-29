<template>
  <div class="content w-full mx-auto grid my-2 gap-2">
    <div class="grid gap-2 w-11/12 mx-auto mt-2">
      <p class="text-gray-500 font-bold text-md">Si deseas comercializar insumos contactarse al +593 96 319 5377</p>
      <button class="default-bar h-12 rounded-md p-2 text-center text-white font-bold">Contactar</button>
    </div>

    <RouterLink :to="'/app/insumos/' + category.id" class="p-2 mx-auto w-full items-center shadow-md h-16 flex" v-for="category in categories">
      <div class="w-11/12 mx-auto flex items-center">
        <img :src="category.icono" alt="Fertilizer Icon" />
        <p class="text-gray-500 text-sm font-semibold w-3/4 ml-3">
          {{category.id}}
        </p>
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
            fill="#000000"
          />
        </svg>
    </RouterLink>
  </div>
</template>

<script>
import { emitAlert } from "@/libs/alert.js";
import * as inputService from '../services/input.service.js';
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from "@coreui/vue";
export default {
  components: {
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
  },
  data() {
    return {
      insumos: false,
      categories: []
    };
  },
  async created (){
    await this.getInputCategories();
  },
  methods: {
    async getInputCategories (){
      try {
        this.categories = await inputService.getCategories();
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