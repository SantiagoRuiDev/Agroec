<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="flex items-center mx-auto w-11/12">
          <RouterLink to="#" v-if="backToDetails" @click="goBack">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <button @click="goBackPage">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" v-if="!backToDetails"/>
          </button>
          <h2 class="text-center mx-auto">Licitación {{ Producto }}</h2>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ChatLicitacion :Item="Producto" />
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import Event from '../../libs/event.js';
import ChatLicitacion from "@/components/ChatLicitacion.vue";
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
    ChatLicitacion,
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
  created(){
    Event.on('open-details', () => {
      if(!this.backToDetails){
        this.changeDetailsState();
      }
    })
  },
  methods: {
    goBackPage() {
      this.$router.go(-1)
    },
    goBack() {
      // Emitir evento para volver atrás o cerrar detalles según sea necesario
      if (this.backToDetails) {
        Event.emit('close-details');
        this.changeDetailsState()
      } 
    },
    changeDetailsState() {
      this.backToDetails = !this.backToDetails;
    },
  }
};
</script>
