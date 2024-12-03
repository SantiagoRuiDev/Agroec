<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="flex items-center mx-auto w-11/12">
          <RouterLink to="#" v-if="backToDetails" @click="goBack">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <RouterLink :to="{ name: 'product', params: { name: Producto } }" v-if="!backToDetails">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <h2 class="text-center mx-auto">Oferta {{ Producto }}</h2>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Deal :Item="Producto" @back-to-details="changeDetailsState"/>
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import Event from '../../libs/event.js';
import Deal from "@/components/proposal/Deal.vue";
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
    Deal,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
  },
  data() {
    return {
      Producto: this.$route.params.name,
      backToDetails: false,
    };
  },
  methods: {
    goBack() {
      // Emitir evento para volver atrás o cerrar detalles según sea necesario
      if (this.backToDetails) {
        Event.emit('back-to-details');
      } 
    },
    changeDetailsState() {
      this.backToDetails = !this.backToDetails;
    },
  }
};
</script>
