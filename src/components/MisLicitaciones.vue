<template>
  <div class="content w-full mx-auto grid my-5 gap-2">
    <div class="border-2 w-11/12 mx-auto rounded grid items-center relative h-12 text-gray-500 md:w-1/3">
      <input placeholder="Filtrar por ID" class="text-left text-sm md:text-md bg-transparent h-full p-2" />
      <div class="absolute right-1 top-2.5">
        <img src="@/assets/Search.svg" alt="Search by Comerciante" class="h-6 w-6" />
      </div>
    </div>

    <div class="grid gap-1" v-if="status == 4">
      <div v-if="licitations.filter(licitation => licitation.estado == 'Cumplida').length > 0">
        <div class="order-card flex md:grid md:grid-cols-2 gap-3 shadow-md p-2"
          v-for="licitation in licitations.filter(licitation => licitation.estado == 'Cumplida')">

          <RouterLink :to="'/licitacion/' + licitation.id_producto" class="flex w-full gap-3" :key="licitation.id">
            <div class="Order grid items-center text-center">
              <img :src="licitation.imagen" alt="Orden Icon" class="h-16 w-16 mx-auto" />
            </div>

            <div class="Order-Text text-left">
              <h1 class="text-gray-600 text-xs font-bold">
                ID #{{ licitation.id.slice(0, 8) }} - <span class="default-color">{{ licitation.estado }}</span>
              </h1>
              <h1 class="text-gray-600 text-sm font-bold">
                {{ licitation.id_producto }}
              </h1>
              <p class="text-gray-500 text-xs">Cant: {{ licitation.cantidad }}{{ licitation.cantidad_unidad }}</p>
              <p class="text-gray-500 text-xs">{{ licitation.presentacion_entrega }}</p>
              <h1 class="text-yellow-400 text-xs font-bold mt-1">${{ licitation.precio.toFixed(2) }}</h1>
              <h1 class="text-yellow-400 text-xs font-bold">{{ licitation.precio_unidad }}</h1>
            </div>
          </RouterLink>

          <div class="Order-Price text-right mt-2 justify-end flex items-center gap-1 grid-cols-2">
            <RouterLink class="default-bar rounded-md p-2 h-8 w-8 grid items-center" :to="'/app/licitacion/editar/' + licitation.id_producto + '/' + licitation.id">
              <img src="@/assets/Licitaciones/Lapiz.svg" class="mx-auto" alt="Edit" />
            </RouterLink>
            <button class="bg-red-500 rounded-md p-2 h-8 w-8 grid items-center" @click="manageDeleteModal(licitation.id)">
              <img src="@/assets/Licitaciones/Eliminar.svg" class="mx-auto" alt="Delete" />
            </button>
          </div>
        </div>
      </div>
      <div class="mx-auto w-full grid gap-5 text-black justify-items-center text-center mt-5" v-else>
        <h1 class="font-bold text-2xl opacity-65">No encontramos licitaciones cumplidas</h1>
      </div>
    </div>

    <div class="grid gap-1" v-if="status == 3">
      <div v-if="licitations.filter(licitation => licitation.estado == 'Vencida').length > 0">
        <div class="order-card flex md:grid md:grid-cols-2 gap-3 shadow-md p-2"
          v-for="licitation in licitations.filter(licitation => licitation.estado == 'Vencida')">

          <RouterLink :to="'/licitacion/' + licitation.id_producto" class="flex w-full gap-3" :key="licitation.id">
            <div class="Order grid items-center text-center">
              <img :src="licitation.imagen" alt="Orden Icon" class="h-16 w-16 mx-auto" />
            </div>

            <div class="Order-Text text-left">
              <h1 class="text-gray-600 text-xs font-bold">
                ID #{{ licitation.id.slice(0, 8) }} - <span class="text-red-400">{{ licitation.estado }}</span>
              </h1>
              <h1 class="text-gray-600 text-sm font-bold">
                {{ licitation.id_producto }}
              </h1>
              <p class="text-gray-500 text-xs">Cant: {{ licitation.cantidad }}{{ licitation.cantidad_unidad }}</p>
              <p class="text-gray-500 text-xs">{{ licitation.presentacion_entrega }}</p>
              <h1 class="text-yellow-400 text-xs font-bold mt-1">${{ licitation.precio.toFixed(2) }}</h1>
              <h1 class="text-yellow-400 text-xs font-bold">{{ licitation.precio_unidad }}</h1>
            </div>
          </RouterLink>

          <div class="Order-Price text-right mt-2 justify-end flex items-center gap-1 grid-cols-2">
            <RouterLink class="default-bar rounded-md p-2 h-8 w-8 grid items-center" :to="'/app/licitacion/editar/' + licitation.id_producto  + '/' + licitation.id">
              <img src="@/assets/Licitaciones/Lapiz.svg" class="mx-auto" alt="Edit" />
            </RouterLink>
            <button class="bg-red-500 rounded-md p-2 h-8 w-8 grid items-center" @click="manageDeleteModal(licitation.id)">
              <img src="@/assets/Licitaciones/Eliminar.svg" class="mx-auto" alt="Delete" />
            </button>
          </div>
        </div>
      </div>
      <div class="mx-auto w-full grid gap-5 text-black justify-items-center text-center mt-5" v-else>
        <h1 class="font-bold text-2xl opacity-65">No encontramos licitaciones vencidas</h1>
      </div>
    </div>

    <div class="grid gap-1" v-if="status == 2">
      <div  v-if="licitations.filter(licitation => licitation.estado == 'Cerrada').length > 0">
        <div class="order-card flex md:grid md:grid-cols-2 gap-3 shadow-md p-2"
          v-for="licitation in licitations.filter(licitation => licitation.estado == 'Cerrada')">

          <RouterLink :to="'/licitacion/' + licitation.id_producto" class="flex w-full gap-3" :key="licitation.id">
            <div class="Order grid items-center text-center">
              <img :src="licitation.imagen" alt="Orden Icon" class="h-16 w-16 mx-auto" />
            </div>

            <div class="Order-Text text-left">
              <h1 class="text-gray-600 text-xs font-bold">
                ID #{{ licitation.id.slice(0, 8) }} - <span class="text-red-600">{{ licitation.estado }}</span>
              </h1>
              <h1 class="text-gray-600 text-sm font-bold">
                {{ licitation.id_producto }}
              </h1>
              <p class="text-gray-500 text-xs">Cant: {{ licitation.cantidad }}{{ licitation.cantidad_unidad }}</p>
              <p class="text-gray-500 text-xs">{{ licitation.presentacion_entrega }}</p>
              <h1 class="text-yellow-400 text-xs font-bold mt-1">${{ licitation.precio.toFixed(2) }}</h1>
              <h1 class="text-yellow-400 text-xs font-bold">{{ licitation.precio_unidad }}</h1>
            </div>
          </RouterLink>

          <div class="Order-Price text-right mt-2 justify-end flex items-center gap-1 grid-cols-2">
            <RouterLink class="default-bar rounded-md p-2 h-8 w-8 grid items-center" :to="'/app/licitacion/editar/' + licitation.id_producto  + '/' + licitation.id">
              <img src="@/assets/Licitaciones/Lapiz.svg" class="mx-auto" alt="Edit" />
            </RouterLink>
            <button class="bg-red-500 rounded-md p-2 h-8 w-8 grid items-center" @click="manageDeleteModal(licitation.id)">
              <img src="@/assets/Licitaciones/Eliminar.svg" class="mx-auto" alt="Delete" />
            </button>
          </div>
        </div>
      </div>
      <div class="mx-auto w-full grid gap-5 text-black justify-items-center text-center mt-5" v-else>
        <h1 class="font-bold text-2xl opacity-65">No encontramos licitaciones cerradas</h1>
      </div>
    </div>

    <div class="grid gap-1" v-if="status == 1">
      <div  v-if="licitations.filter(licitation => licitation.estado == 'Abierta').length > 0">
        <div class="order-card flex md:grid md:grid-cols-2 gap-3 shadow-md p-2"
          v-for="licitation in licitations.filter(licitation => licitation.estado == 'Abierta')">
          <RouterLink :to="'/licitacion/' + licitation.id_producto" class="flex w-full gap-3" :key="licitation.id">
            <div class="Order grid items-center text-center">
              <img :src="licitation.imagen" alt="Orden Icon" class="h-16 w-16 mx-auto" />
            </div>

            <div class="Order-Text text-left">
              <h1 class="text-gray-600 text-xs font-bold">
                ID #{{ licitation.id.slice(0, 8) }} - <span class="second-color">{{ licitation.estado }}</span>
              </h1>
              <h1 class="text-gray-600 text-sm font-bold">
                {{ licitation.id_producto }}
              </h1>
              <p class="text-gray-500 text-xs">Cant: {{ licitation.cantidad }}{{ licitation.cantidad_unidad }}</p>
              <p class="text-gray-500 text-xs">{{ licitation.presentacion_entrega }}</p>
              <h1 class="text-yellow-400 text-xs font-bold mt-1">${{ licitation.precio.toFixed(2) }}</h1>
              <h1 class="text-yellow-400 text-xs font-bold">{{ licitation.precio_unidad }}</h1>
              <h1 class="second-color text-xs font-bold">Prom: $250</h1>
              <h1 class="third-color text-xs font-bold">
                Cant. Negociada: 300
              </h1>
            </div>
          </RouterLink>

          <div class="Order-Price text-right mt-2 justify-end flex items-center gap-1 grid-cols-2">
            <RouterLink class="default-bar rounded-md p-2 h-8 w-8 grid items-center" :to="'/app/licitacion/editar/' + licitation.id_producto  + '/' + licitation.id">
              <img src="@/assets/Licitaciones/Lapiz.svg" class="mx-auto" alt="Edit" />
            </RouterLink>
            <button class="bg-red-700 rounded-md p-2 h-8 w-8 grid items-center" @click="manageCloseModal(licitation.id)">
              <img src="@/assets/Sidebar/CloseLicitacion.svg" class="mx-auto" alt="Delete" />
            </button>
            <button class="bg-red-500 rounded-md p-2 h-8 w-8 grid items-center" @click="manageDeleteModal(licitation.id)">
              <img src="@/assets/Licitaciones/Eliminar.svg" class="mx-auto" alt="Delete" />
            </button>
          </div>
        </div>
      </div>
      
      <div class="mx-auto w-full grid gap-5 text-black justify-items-center text-center mt-5" v-else>
        <h1 class="font-bold text-2xl opacity-65">No encontramos licitaciones abiertas</h1>
      </div>
    </div>
  </div>

  <CModal alignment="center" :visible="closeModal" @close="manageCloseModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="manageCloseModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Cerrar Licitación
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400 text-sm w-full mx-auto">
            No estará publicada su licitación
          </p>

          <button @click="closeLicitation" class="p-2 h-12 mx-auto w-3/4 bg-red-500 mt-3 text-white text-center rounded">
            Confirmar
          </button>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="deleteModal" @close="manageDeleteModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="manageDeleteModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Confirmación
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400 text-sm w-full mx-auto">
            ¿Deseas eliminar esta licitacion?
          </p>

          <button @click="deleteLicitation" class="p-2 h-12 mx-auto w-3/4 bg-red-500 mt-3 text-white text-center rounded">
            Eliminar
          </button>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<script>
import { emitAlert } from "@/libs/alert.js";
import * as licitacionService from '../services/licitation.service.js';
import { CModal, CModalBody } from "@coreui/vue";
export default {
  props: {
    status: Number,
  },
  components: {
    CModal,
    CModalBody,
  },
  data() {
    return {
      deleteModal: false,
      closeModal: false,
      onCloseLicitation: "",
      onDeleteLicitation: "",
      licitations: []
    };
  },
  created: async function () {
    await this.getMyLicitations();
  },
  methods: {
    manageDeleteModal(uuid) {
      this.onDeleteLicitation = uuid;
      this.deleteModal = !this.deleteModal;
    },
    manageCloseModal(uuid) {
      this.onCloseLicitation = uuid;
      this.closeModal = !this.closeModal;
    },
    async closeLicitation(){
      try {
        const {message} = await licitacionService.closeLicitation(this.onCloseLicitation);
        emitAlert(message, 'success');
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    async deleteLicitation(){
      try {
        const {message} = await licitacionService.deleteLicitation(this.onDeleteLicitation);
        emitAlert(message, 'success');
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    async getMyLicitations() {
      try {
        this.licitations = await licitacionService.getLicitationsByUserAndProduct(this.$route.params.name);
      } catch (error) {
        return emitAlert(error, "error");
      }
    }
  },
};
</script>
