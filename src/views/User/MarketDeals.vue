<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="flex items-center mx-auto w-11/12">
          <RouterLink to="/app/home">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <h2 class="text-center mx-auto">Ofertas del Mercado</h2>
          <button>
            <img
            src="@/assets/Nav/Xred.svg"
            alt="Back"
            class="w-4 h-4"
            v-on:click="deleteProduct"
          />
          </button>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <MarketDeals />
    </ion-content>
    <BottomBar/>
  </ion-page>
</template>

<script allowJs>
import BottomBar from '@/components/Bottom.vue';
import MarketDeals from "@/components/MarketDeals.vue";
import event from "../../libs/event.js";
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
    BottomBar,
    MarketDeals,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
  },
  data() {
    return {
      deleteProducts: false,
    };
  },
  methods: {
    deleteProduct(){
      event.emit("change-deleteProduct");
    },
  },
};
</script>
