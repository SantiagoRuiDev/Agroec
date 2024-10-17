<template>
  <div class="bg-gray-100 p-4 grid items-center justify-items-center gap-4" v-if="user">
    <ProfileIcon :profile="user.type"></ProfileIcon>

    <div class="grid gap-2 text-center">
      <h1 class="font-bold text-md text-gray-600">{{ user.type }}</h1>
      <p class="text-md text-gray-400">{{ user.nombre }} {{ user.apellido }}</p>
    </div>
  </div>
  <div class="content w-11/12 mx-auto grid mt-5 gap-2 md:w-3/4 bg-gray-100 p-2 rounded-md items-center">
    <div class="content-message grid gap-2 text-left">
      <h1 class="font-bold text-md text-gray-600">Informacion Comercial</h1>
    </div>

    <div class="content-cards grid grid-cols-3 gap-2 items-center justify-center">
      <!--TOP GRID-->
      <div class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center" v-if="user">
        <Qualification :qualifications="user.qualifications"></Qualification>
        <h1 class="text-gray-500 text-xs font-bold">Calificación</h1>
      </div>

      <div v-if="user">
        <div
          class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center justify-items-center">
          <svg fill="#a8cf7b" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 0 395.71 395.71"
            xml:space="preserve">
            <g>
              <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
		c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
		C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
		c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z" />
            </g>
          </svg>
          <div class="grid gap-1">
            <h1 class="text-gray-500 text-sm font-bold">{{ user.provincia }}</h1>

            <h3 class="text-gray-400 text-xs font-bold">{{ user.parroquia }}</h3>
          </div>
        </div>
      </div>

      <div>
        <div class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center" v-if="user">
          <span class="text-green-new text-4xl font-bold">{{ user.sales.length }}</span>
          <h1 class="text-gray-500 text-xs md:text-md font-bold">
            Publicaciones
          </h1>
        </div>
      </div>
      <!--TOP GRID-->
    </div>
  </div>
  <div class="content w-11/12 mx-auto grid mb-3 mt-3 gap-2 md:w-3/4 bg-gray-100 p-2 rounded-md items-center">
    <div class="content-message grid gap-2 text-left">
      <h1 class="font-bold text-md text-gray-600">Catálogo</h1>
    </div>

    <ion-segment value="buttons" class="tabs">
      <ion-segment-button value="maiz" class="buttonmaiz" @click="applySaleFilter('Maiz')">
        <ion-label class="text-gray-800">Maiz</ion-label>
      </ion-segment-button>
      <ion-segment-button value="cacao" class="button" @click="applySaleFilter('Cacao')">
        <ion-label class="text-gray-800">Cacao</ion-label>
      </ion-segment-button>
      <ion-segment-button value="tomate" class="button"  @click="applySaleFilter('Tomate')">
        <ion-label class="text-gray-800">Tomate</ion-label>
      </ion-segment-button>
      <ion-segment-button value="maracuya" class="button"  @click="applySaleFilter('Maracuya')">
        <ion-label class="text-gray-800">Maracuya</ion-label>
      </ion-segment-button>
      <ion-segment-button value="arroz" class="button"  @click="applySaleFilter('Arroz')">
        <ion-label class="text-gray-800">Arroz</ion-label>
      </ion-segment-button>
      <ion-segment-button value="polvillo" class="button"  @click="applySaleFilter('Pólvillo')">
        <ion-label class="text-gray-800">Pólvillo</ion-label>
      </ion-segment-button>
    </ion-segment>
    <div class="content-cards grid grid-cols-2 md:grid-cols-4 gap-2 items-center" v-if="user">
      <div class="flex gap-1" v-for="sale in filteredSales" :key="sale">
        <img :src="sale.producto_imagen" alt="Incoming Message Profile Icon" class="h-24 w-24 p-1 rounded-lg" />

        <div class="grid items-center justify-start py-2">
          <p class="text-gray-800 text-sm">{{ sale.id_producto }}</p>
          <h1 class="font-bold text-gray-600">${{ sale.precio }}</h1>
          <p class="text-gray-400">{{ sale.cantidad }} {{ sale.cantidad_unidad }}</p>
        </div>
      </div>

      <!--TOP GRID-->
    </div>
  </div>
</template>

<script>
import Qualification from './Qualification.vue';
import * as profileService from '../services/profile.service.js';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonSegment,
  IonLabel,
  IonSegmentButton,
} from "@ionic/vue";
import ProfileIcon from './ProfileIcon.vue';

export default {
  components: {
    Qualification,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSegment,
    IonLabel,
    IonSegmentButton,
    IonContent,
    IonIcon,
    ProfileIcon
  },
  data() {
    return {
      user: null,
      filteredSales: []
    }
  },
  methods: {
    async getProfile() {
      this.user = await profileService.getProfileByIdentifier(this.$route.params.identifier);
      this.filteredSales = this.user.sales;
    },
    applySaleFilter(filter){
      this.filteredSales = Array(...this.user.sales).filter(sale => sale.id_producto == filter);
    }
  },
  created: async function () {
    await this.getProfile();
  },
};
</script>

<style scoped>
.buttonmaiz {
  width: 20%;
  font-size: 10px;
  padding: 2px;
  margin-left: 170px;
}

.button {
  width: 20%;
  font-size: 10px;
  padding: 2px;
}

.tabs {
  overflow-x: scroll;
}

@media (min-width: 768px) {
  .tabs {
    width: 50%;
    overflow: hidden;
  }

  .button {
    width: 100%;
    font-size: 10px;
    padding: 2px;
    color: black;
  }

  .buttonmaiz {
    width: 100%;
    font-size: 10px;
    padding: 2px;
    margin-left: 0px;
  }
}
</style>
