<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="flex items-center mx-auto w-11/12">
          <button @click="goBack">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </button>
          <h2 class="text-center mx-auto">Ofertas del Mercado</h2>
          <button>
            <img src="@/assets/Nav/Xred.svg" alt="Back" class="w-4 h-4" v-on:click="deleteProduct" v-if="!deleteProducts"/>
            <img src="@/assets/Save.svg" alt="Back" class="w-6 h-6" v-on:click="deleteProduct" v-if="deleteProducts"/>
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
import BottomBar from '@/components/others/Bottom.vue';
import MarketDeals from "@/components/products/MarketDeals.vue";
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
      this.deleteProducts = !this.deleteProducts;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>
