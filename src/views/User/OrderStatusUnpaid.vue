<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="grid grid-cols-3 items-center mx-auto w-11/12">
          <RouterLink to="/filtered/orders">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <h2 class="text-center">Estado</h2>
          <div class="inline-flex justify-self-end">
            <RouterLink to="/chat/oferta/Maiz">
              <img src="@/assets/Chat.svg" alt="Chat" class="w-4 h-4" />
            </RouterLink>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Orders />
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import Orders from "@/components/orders/OrderStatusUnpaid.vue";
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
    Orders,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
  },
};
</script>
