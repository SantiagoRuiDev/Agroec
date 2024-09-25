<template>
  <div class="content w-11/12 mx-auto grid my-5 gap-2 md:w-1/2">
    <div
      v-if="!deleteProducts"
      class="content-cards grid grid-cols-3 gap-2 items-center justify-center"
    >
      <RouterLink :to="'/app/product/' + product.id" v-for="product in products" :key="product.id">
        <div
          class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center"
        >
          <img
            :src="product.imagen"
            alt="App Icon"
            class="w-12 h-12 mx-auto"
          />
          <h1 class="text-gray-500 text-sm">{{product.nombre}}</h1>
        </div>
      </RouterLink>
    </div>

    <div
      v-if="deleteProducts"
      class="content-cards grid grid-cols-3 gap-2 items-center justify-center"
    >
      <button v-for="product in products" :key="product.id">
        <div
          class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center text-gray-500 hover:border-red-300 hover:bg-red-100 hover:text-red-300">
          <img :src="product.imagen" alt="App Icon" class="w-12 h-12 mx-auto" />
          <h1 class="text-gray-500 text-sm">{{ product.nombre }}</h1>
        </div>
      </button>
    </div>

    <div class="flex gap-3">
      <RouterLink
        to="/app/add/product"
        class="p-2 default-bar mx-auto my-6 rounded text-center"
      >
        Agregar productos
      </RouterLink>
      <RouterLink
        to="/app/licitar"
        class="p-2 dark-bar mx-auto my-6 rounded text-center"
      >
        Enviar una licitación
      </RouterLink>
    </div>
  </div>
</template>

<script allowJs>
import { emitAlert } from "@/libs/alert.js";
import event from "../libs/event.js";
import * as productService from '../services/product.service.js';
export default {
  data() {
    return {
      deleteProducts: false,
      products: [],
    };
  },
  created: async function () {
    event.on("change-deleteProduct", this.changeDeleteProduct);
    await this.getMarketProducts();
  },
  methods: {
    changeDeleteProduct() {
      this.deleteProducts = !this.deleteProducts;
    },
    async getMarketProducts(){
      try {
        this.products = await productService.getMarketProducts();
      } catch (error) {
        return emitAlert(error.message, "error");
      }
    }
  },
};
</script>
