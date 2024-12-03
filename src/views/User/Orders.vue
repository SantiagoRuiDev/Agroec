<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="grid grid-cols-3 items-center mx-auto w-11/12 mt-4">
          <RouterLink to="/app/home">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <h2 class="text-center">Ordenes</h2>
        </div>
        <div class="mx-auto w-full text-center mt-3 grid grid-cols-2 justify-center gap-2">
          <a v-if="status" class="text-sm text-gray-50 border-bottom-2 border-gray-50 p-3">
            Activas
          </a>
          <a v-if="status" class="text-sm text-gray-50 p-3" @click="selectStatus(false)">
            Historial
          </a>
          <a v-if="!status" class="text-sm text-gray-50 p-3" @click="selectStatus(true)">
            Activas
          </a>
          <a v-if="!status" class="text-sm text-gray-50 border-bottom-2 border-gray-50 p-3">
            Historial
          </a>
        </div>
        
        <div
          class="mx-auto w-full text-center mt-2 mr-3 inline-flex justify-center gap-1"
        >
          <ion-segment value="buttons" class="tabs">
            <ion-segment-button value="maiz" class="buttonmaiz" @click="selectProduct('Maiz')">
              <ion-label>Maiz</ion-label>
            </ion-segment-button>
            <ion-segment-button value="cacao" class="button" @click="selectProduct('Cacao')">
              <ion-label>Cacao</ion-label>
            </ion-segment-button>
            <ion-segment-button value="tomate" class="button" @click="selectProduct('Tomate')">
              <ion-label>Tomate</ion-label>
            </ion-segment-button>
            <ion-segment-button value="maracuya" class="button" @click="selectProduct('Maracuya')">
              <ion-label>Maracuya</ion-label>
            </ion-segment-button>
            <ion-segment-button value="arroz" class="button" @click="selectProduct('Arroz')">
              <ion-label>Arroz</ion-label>
            </ion-segment-button>
            <ion-segment-button value="polvillo" class="button" @click="selectProduct('Pólvillo')">
              <ion-label>Pólvillo</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Orders :product_filter="product" :status_filter="status"/>
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import Orders from "@/components/orders/Orders.vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonSegment,
  IonLabel,
  IonSegmentButton,
} from "@ionic/vue";

export default {
  components: {
    Orders,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSegment,
    IonLabel,
    IonSegmentButton,
    IonContent,
    IonIcon,
  },
  data(){
    return{
      status: true,
      product: "Maiz"
    }
  },
  methods:{
    selectStatus(status){
      this.status = status;
    },
    selectProduct(filter){
      this.product = filter;
    }
  }
};
</script>

<style scoped>
.buttonmaiz {
  width: 20%;
  font-size: 10px;
  padding: 2px;
  margin-left: 140px;
}
.button {
  width: 20%;
  font-size: 10px;
  padding: 2px;
}

.tabs {
  overflow-x: scroll;
}

@media (min-width: 768px) {
  .tabs {
    width: 50%;
    overflow: hidden;
  }
  .button {
    width: 100%;
    font-size: 10px;
    padding: 2px;
  }

  .buttonmaiz {
    width: 100%;
    font-size: 10px;
    padding: 2px;
    margin-left: 0px;
  }
}
</style>
