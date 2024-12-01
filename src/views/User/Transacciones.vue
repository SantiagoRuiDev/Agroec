<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="grid grid-cols-3 items-center mx-auto w-11/12">
          <RouterLink to="/app/home">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <h2 class="text-center">Billetera</h2>
          <div class="inline-flex justify-self-end">
            <RouterLink to="/app/cards">
              <img src="@/assets/Card.svg" alt="Cards" class="w-8 h-8" />
            </RouterLink>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Transacciones />
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import Transacciones from "@/components/wallet/Transacciones.vue";
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
    Transacciones,
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
