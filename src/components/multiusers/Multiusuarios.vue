<template>
  <div class="content w-full mx-auto grid my-5 gap-1" v-if="multiusers.length > 0">
    <div class="shadow-md h-20 w-full mx-auto grid items-center" v-for="(user, index) in multiusers" :key="index">
      <div class="w-11/12 mx-auto flex gap-2 items-center justify-between">
        <div class="flex gap-3">
          <h1 class="text-2xl font-bold text-gray-700 text-center w-8">{{ index + 1 }}</h1>

          <div class="mx-auto grid items-center">
            <h1 class="font-bold text-gray-600">{{ user.id_rol }}</h1>
            <p class="text-gray-400">{{ user.nombre }}</p>
          </div>
        </div>

        <div class="justify-end flex items-center gap-1">
          <RouterLink :to="'/app/multiusuarios/editar/' + user.id"
            class="default-bar rounded-md p-2 h-8 w-8 grid items-center">
            <img src="@/assets/Licitaciones/Lapiz.svg" class="mx-auto" alt="Edit" />
          </RouterLink>
          <button class="bg-red-400 rounded-md p-2 h-8 w-8 grid items-center" @click="deleteMultiuser(user.id)">
            <img src="@/assets/Licitaciones/Eliminar.svg" class="mx-auto" alt="Delete" />
          </button>
        </div>
      </div>
    </div>



    <RouterLink to="/app/multiusuarios/crear"
      class="text-center text-white default-bar w-4/6 h-14 p-2 mx-auto rounded-md grid items-center mt-5 md:w-1/5">
      Agregar</RouterLink>
  </div>


  <div class="content w-full mx-auto grid my-5 gap-1" v-if="permissionError.enabled">
    <div class="mx-auto w-full grid gap-5 text-black justify-items-center">
      <h1 class="font-bold text-2xl opacity-65 text-center">{{ permissionError.message }}</h1>
      <RouterLink to="/app/home" class="default-bar text-center text-white rounded-md p-2">
        Volver al inicio
      </RouterLink>
    </div>
  </div>

  <div class="content w-full mx-auto grid my-5 gap-1" v-if="!permissionError.enabled && multiusers.length == 0">

    <div class="mx-auto w-full grid gap-5 text-black justify-items-center px-3">
      <h1 class="font-bold text-2xl opacity-65 text-center">No encontramos multiusuarios asociados</h1>
    </div>

    <RouterLink to="/app/multiusuarios/crear"
      class="text-center text-white default-bar w-4/6 h-14 p-2 mx-auto rounded-md grid items-center mt-5 md:w-1/5">
      Agregar</RouterLink>
  </div>
</template>


<script allowJs>
import { emitAlert } from "@/libs/alert.js";
import * as multiuserService from '@/services/multiuser.service.js';
export default {
  data() {
    return {
      multiusers: [],
      permissionError: {
        enabled: false,
        message: false,
      }
    }
  },
  async created() {
    await this.getMultiusers();
  },
  watch: {
    '$route.fullPath': async function () {
      if (this.$route.fullPath == '/app/multiusuarios') {
        await this.getMultiusers();  // Se ejecuta cada vez que el parámetro cambia
        return;
      }
    },
  },
  methods: {
    async getMultiusers() {
      try {
        this.multiusers = await multiuserService.getMultiusersByUser();
      } catch (error) {
        this.permissionError.enabled = true;
        this.permissionError.message = error;
        return emitAlert(error, 'error');
      }
    },
    async deleteMultiuser(uuid) {
      try {
        const data = await multiuserService.deleteMultiuser(uuid);
        await this.getMultiusers();
        return emitAlert(data.message, 'success');
      } catch (error) {
        return emitAlert(error, 'error');
      }
    }
  }
}
</script>