<template>
  <div class="content w-11/12 mx-auto grid my-5 gap-2 md:w-1/2">
    <div
      class="content-cards grid grid-cols-3 gap-2 items-center justify-center"
    >
      <!--TOP GRID-->
      <RouterLink :to="'/app/tutorials/' + category.id" v-for="category in categories" :key="category.id">
        <div
          class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center"
        >
          <img
            :src="category.imagen"
            alt="App Icon"
            class="w-12 h-12 mx-auto"
          />
          <h1 class="text-gray-500 text-sm">{{category.nombre}}</h1>
        </div>
      </RouterLink>
      <!--TOP GRID-->
    </div>
  </div>
</template>

<script>
import * as categoryService from '../../services/category.service.js';
export default {
  name: 'Categories',
  data(){
    return {
      categories: [],
    }
  },
  methods: {
    async getCategories(){
      this.categories = await categoryService.getCategories();
    }
  },
  created: async function () {
    await this.getCategories();
  },
}
</script>
