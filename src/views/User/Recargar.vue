<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="inline-flex gap-5 items-center w-3/4 ml-4 md:grid md:grid-cols-3 md:mx-auto md:w-11/12">
          <RouterLink to="/app/transacciones" class="w-1/6 md:w-full">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <h2 class="text-center w-full">Recargar mi cuenta</h2>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Recargar />
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import Recargar from "@/components/wallet/Recargar.vue";
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
    Recargar,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
  },
  data() {
    return {
      status: true,
    };
  },
  methods: {
    changeStatus() {
      this.status = !this.status;
    },
  },
};
</script>
