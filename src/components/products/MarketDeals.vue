<template>
  <div class="content w-11/12 mx-auto grid my-5 gap-2 md:w-1/2">
    <div v-if="!deleteProducts && products.length > 0"
      class="content-cards grid grid-cols-3 gap-2 items-center justify-center">
      <RouterLink :to="'/app/product/' + product.id" v-for="product in filterMarketProducts()" :key="product.id">
        <div class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center">
          <img :src="product.imagen" alt="App Icon" class="w-12 h-12 mx-auto" />
          <h1 class="text-gray-500 text-sm">{{ product.nombre }}</h1>
        </div>
      </RouterLink>
    </div>

    <div v-if="deleteProducts" class="content-cards grid grid-cols-3 gap-2 items-center justify-center">
      <button v-for="product in products" :key="product.id" @click="deleteProduct(product.id)">
        <div class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center text-gray-500"
          :class="{
            'hover:border-red-300': !deletedList.includes(product.id), 'hover:bg-red-100': !deletedList.includes(product.id), 'hover:text-red-300': !deletedList.includes(product.id),
            'hover:border-green-300': deletedList.includes(product.id), 'hover:bg-green-100': deletedList.includes(product.id), 'hover:text-green-300': deletedList.includes(product.id)
          }">
          <img :src="product.imagen" alt="App Icon" class="w-12 h-12 mx-auto" />
          <h1 class="text-gray-500 text-sm">{{ product.nombre }}</h1>
        </div>
      </button>
    </div>

    <div class="flex gap-3">
      <RouterLink to="/app/add/product" class="p-2 default-bar mx-auto my-6 rounded text-center">
        Agregar productos
      </RouterLink>
      <RouterLink to="/app/licitar" class="p-2 dark-bar mx-auto my-6 rounded text-center">
        Enviar una licitación
      </RouterLink>
    </div>
  </div>
</template>

<script allowJs>
import { emitAlert } from "@/libs/alert.js";
import event from "../../libs/event.js";
import * as productService from '../../services/product.service.js';
export default {
  data() {
    return {
      deleteProducts: false,
      deletedList: [],
      products: [],
    };
  },
  created: async function () {
    event.on("change-deleteProduct", this.changeDeleteProduct);
    await this.getMarketProducts();
  },
  methods: {
    deleteProduct(uuid) {
      const products = localStorage.getItem('deleted-market-sales');
      if (products) {
        let parsed = Array.from(JSON.parse(products));
        if (!parsed.includes(uuid)) {
          parsed.push(uuid);
        } else {
          parsed = parsed.filter(product => product != uuid);
        }
        localStorage.removeItem('deleted-market-sales');
        localStorage.setItem('deleted-market-sales', JSON.stringify(parsed));
      } else {
        const list = [uuid];
        localStorage.setItem('deleted-market-sales', JSON.stringify(list));
      }
    },
    fetchDeletedProducts() {
      const products = localStorage.getItem('deleted-market-sales');
      if (products) {
        this.deletedList = JSON.parse(products);
      }
    },
    changeDeleteProduct() {
      this.deleteProducts = !this.deleteProducts;
      this.fetchDeletedProducts();
    },
    filterMarketProducts() {
      return this.products.filter((product) => !this.deletedList.includes(product.id))
    },
    async getMarketProducts() {
      try {
        this.products = await productService.getMarketProducts();
        this.fetchDeletedProducts();
      } catch (error) {
        return emitAlert(error.message, "error");
      }
    }
  },
};
</script>
