<template>
  <div class="w-full mx-auto grid my-5 gap-2">
    <h2 class="text-gray-500 font-bold font-md text-center">Filtra por</h2>
    <div class="grid grid-cols-2 justify-center items-end mx-auto w-11/12 gap-2 md:w-3/6">
      <div class="mx-auto grid relative w-full col-span-2">
        <div class="relative">
          <label for="provincia" class="text-gray-500 font-bold w-full mx-auto">Provincia</label>
          <select id="provincia" v-model="ProvinciaSelected" @change="handleCantones"
            class="w-full mx-auto bg-transparent border-2 input-container p-2 rounded-md text-gray-600">
            <option :value="Provincia.id" v-for="Provincia in Provincias" :key="Provincia.id">{{ Provincia.nombre }}
            </option>
          </select>
        </div>
      </div>
      <div class="mx-auto grid relative w-full col-span-2" v-if="ProvinciaSelected != null">
        <div class="relative">
          <label for="canton" class="text-gray-500 font-bold w-full mx-auto">Cantón</label>
          <select id="canton" v-model="CantonSelected"
            class="w-full mx-auto bg-transparent border-2 input-container p-2 rounded-md text-gray-600">
            <option :value="Canton.ID" v-for="Canton in Cantones" :key="Canton.ID">{{ Canton.Nombre }}</option>
          </select>
        </div>
      </div>

      <div @click="showComercianteWrapper"
        class="input-container border-2 w-full grid items-center relative h-12 text-gray-500 p-2 col-span-2">
        <p class="text-left text-sm md:text-md">Comerciante</p>
        <div class="absolute right-1 top-3">
          <img src="@/assets/Search.svg" alt="Search by Comerciante" class="h-6 w-6" />
        </div>
      </div>
      <div class="w-full mx-auto h-28 grid items-center p-3 gap-3 rounded col-span-2 shadow-sm">
        <div class="grid mx-auto md:mx-0 md:grid-cols-2 justify-between">
          <label for="range" class="text-gray-500 text-md font-bold">Distancia</label>
          <span class="text-gray-800 text-md text-right">({{ distancia }} km)</span>
        </div>
        <input type="range" class="w-full rangeDistancia" min="5" max="150" step="5" name="range" v-model="distancia" />
      </div>
    </div>

    <div class="grid gap-1" v-if="sales.length > 0">
      <div class="tutorial-card w-full shadow-md p-2" v-for="sale in sales">
        <div class="w-11/12 mx-auto flex gap-3 justify-between">
          <div class="inline-flex gap-4">
            <RouterLink :to="'/app/vendedor/' + sale.id_usuario"
              class="Profile grid items-center text-center justify-center w-16">
              <ProfileIcon :profile="sale.tipo_perfil" :height="true" :weight="false"></ProfileIcon>
              <div class="flex items-center justfiy-center">
                <img src="@/assets/Star.svg" alt="Star Icon" class="w-3 h-3" />
                <img src="@/assets/Star.svg" alt="Star Icon" class="w-3 h-3" />
                <img src="@/assets/Star.svg" alt="Star Icon" class="w-3 h-3" />
                <img src="@/assets/Star.svg" alt="Star Icon" class="w-3 h-3" />
                <img src="@/assets/Star.svg" alt="Star Icon" class="w-3 h-3" />
              </div>
            </RouterLink>

            <RouterLink :to="'/sale/' + Item + '/' + sale.id" class="Profile-Text w-36 md:w-48">
              <h1 class="text-gray-600 text-sm font-bold">{{sale.tipo_perfil}}</h1>
              <p class="text-gray-500 text-xs">{{ sale.provincia }} / {{ sale.canton }}</p>
              <p class="text-gray-500 text-xs">Cant: {{ sale.cantidad }}{{ sale.cantidad_unidad }}</p>
              <p class="text-gray-500 text-xs">{{ sale.presentacion_entrega }}</p>
            </RouterLink>
          </div>

          <RouterLink :to="'/sale/' + Item + '/' + sale.id" class="Profile-Text text-right w-full">
            <h1 class="text-yellow-400 text-md font-bold">${{ sale.precio }}</h1>
            <p class="text-yellow-400 text-md font-bold">Humedad 14-17%</p>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="grid gap-1 items-center min-h-64" v-if="sales.length == 0">
      <div class="mx-auto w-full grid gap-5 text-black justify-items-center">
        <h1 class="font-bold text-2xl opacity-65 text-center">No tenemos propuestas disponibles de {{ Item }}</h1>
        <RouterLink to="/app/market" class="default-bar text-center text-white rounded-md p-2">
          Buscar otras ofertas
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- Modal para seleccion de comerciante -->
  <CModal alignment="center" :visible="selectSeller" @close="closeModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
        <div class="wrapper w-full">
          <div class="checkboxes grid">
            <div class="grid grid-cols-2 items-center mb-2 w-full text-sm" v-for="option in options"
              :key="option.value">
              <input type="checkbox" :id="option.name" class="checkbox" v-model="comercianteType"
                :value="option.value" />
              <label :for="option.name" class="text-gray-600">{{
                option.name
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<script allowJs>
import Provincias from "../assets/JSON/Provincias.json";
import Cantones from "../assets/JSON/Cantones.json";
import * as saleService from '../services/sale.service.js';
import { CModal, CModalBody } from "@coreui/vue";
import ProfileIcon from "./ProfileIcon.vue";
export default {
  components: {
    CModal,
    CModalBody,
    ProfileIcon
  },
  props: {
    Item: String,
  },
  data() {
    return {
      distancia: 5,
      selectSeller: false,
      comercianteType: [],
      ProvinciaSelected: null,
      CantonSelected: null,
      Provincias: Provincias,
      Cantones: Cantones,
      options: [
        { name: "Agricultor", value: "Agricultor" },
        { name: "Comerciante", value: "Comerciante" },
        { name: "Asociación de Agricultor", value: "Asociación de Agricultor" },
      ],

      sales: []
    };
  },
  methods: {
    showComercianteWrapper() {
      this.selectSeller = true;
    },
    closeModal() {
      this.selectSeller = false;
    },
    handleCantones() {
      this.Cantones = Cantones.filter(
        (canton) => canton.Provincia_ID == this.ProvinciaSelected
      );
    },
    async getSales() {
      this.sales = await saleService.getSalesByProduct(this.$route.params.name);
    }
  },
  created: async function () {
    await this.getSales();
  },
};
</script>

<style scoped>
.input {
  font-size: 14px;
}

.checkbox {
  accent-color: #a3e635;
}

.rangeDistancia {
  accent-color: #a3e635;
}

.input-container {
  border-top: 1px solid #e2e8f0;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.input-hover {
  border-bottom: none;
  border-top: 1px solid #e2e8f0;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>
