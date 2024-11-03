<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="grid grid-cols-3 items-center mx-auto w-11/12">
          <RouterLink to="/app/transacciones">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <h2 class="text-center">Mis tarjetas</h2>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Cards />
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import Cards from "@/components/Cards.vue";
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
    Cards,
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
