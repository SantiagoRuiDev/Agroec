<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div
          class="inline-flex gap-5 items-center w-3/4 ml-3 md:grid md:grid-cols-3 md:mx-auto md:w-11/12"
        >
          <button @click="goBack" class="w-1/6 md:w-full">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </button>
          <h2 class="text-center">Propuestas enviadas {{ product }}</h2>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Ofertas />
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import Ofertas from "@/components/PropuestasEnviadas.vue";
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
    Ofertas,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
  },
  data() {
    return {
      product: this.$route.params.product,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>
