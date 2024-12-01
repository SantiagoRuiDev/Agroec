<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="flex items-center mx-auto w-11/12">
          <RouterLink to="#" v-if="backToDetails" @click="goBack">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <RouterLink :to="'/app/propuestas/' + Producto">
            <img
              src="@/assets/Arrow.svg"
              alt="Back"
              class="w-4 h-4"
              v-if="!backToDetails"
            />
          </RouterLink>
          <h2 class="text-center mx-auto" v-if="!backToDetails">Oferta {{ Producto }}</h2>
          <h2 class="text-center mx-auto" v-if="backToDetails">Condiciones de tu compra</h2>
          <RouterLink :to="'/review/' + Producto">
            <img
              src="@/assets/Statistics/Informative.svg"
              alt="Back"
              class="w-4 h-4"
              v-on:click="showModal"
            />
          </RouterLink>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ChatOferta :Item="Producto" @back-to-details="changeDetailsState" />
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import Event from "../../libs/event.js";
import ChatOferta from "@/components/chats/ChatOferta.vue";
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
    ChatOferta,
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
        Event.emit("back-to-details");
      }
    },
    changeDetailsState() {
      this.backToDetails = !this.backToDetails;
    },
  },
};
</script>
