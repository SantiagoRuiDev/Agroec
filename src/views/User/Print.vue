<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="grid grid-cols-3 items-center mx-auto w-11/12">
          <RouterLink to="/orders">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <h2 class="text-center">Imprimir</h2>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Print />
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import Print from "@/components/Print.vue";
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
    Print,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
  },
};
</script>