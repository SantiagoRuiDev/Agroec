<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="flex items-center mx-auto w-11/12">
          <RouterLink to="/app/dashboard">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <h2 class="text-center mx-auto">Tu gestión en {{ Producto }}</h2>
          <div class="inline-flex">
          <img
            src="@/assets/Statistics/Informative.svg"
            alt="Back"
            class="w-4 h-4"
            v-on:click="showModal"
          />
          </div>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <CModal alignment="center" :visible="visible" @close="closeModal">
        <CModalBody>
          <div class="grid w-full gap-3 pb-2">
            <img
              src="@/assets/Nav/X.svg"
              alt="Close alert"
              @click="closeModal"
              class="justify-self-end"
            />
            <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
              Quieres ver mas reportes?
            </h2>
            <div class="mx-auto text-center">
              <p class="text-gray-400">* Tus precios vs mercado</p>
              <p class="text-gray-400">* Precio por zona</p>
              <p class="text-gray-400">* Información demografica</p>
              <p class="text-gray-400">* Demanda del Mercado</p>
              <p class="text-gray-400">* Precios por estacionalidad</p>
            </div>
            <button class="default-bar rounded-md py-1 shadow-md w-1/2 mx-auto text-center text-white font-bold">Claro, si</button>
          </div>
        </CModalBody>
      </CModal>

      <Manage :Item="Producto" />
    </ion-content>
    <BottomBar/>
  </ion-page>
</template>

<script allowJs>
import BottomBar from '@/components/others/Bottom.vue';
import Manage from "@/components/dashboard/Manage.vue";
import { CModal, CModalBody } from "@coreui/vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
} from "@ionic/vue";

export default {
  components: {
    Manage,
    BottomBar,
    IonPage,
    CModal,
    CModalBody,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
  },
  data() {
    return {
      Producto: this.$route.params.name,
      visible: false,
      excel: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    downloadExcel(){
      this.excel = !this.excel;
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.visible = false;
    },
  },
};
</script>
