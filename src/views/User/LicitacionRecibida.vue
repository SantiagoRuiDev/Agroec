<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="flex items-center mx-auto w-11/12 mt-3">
          <button @click="goBack">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </button>
          <h2 class="text-center mx-auto">Licitaciones de {{ Producto }}</h2>
        </div>
        <div class="mx-auto w-full text-center gap-1 mt-1">
          <ion-segment value="buttons" class="tabs">
            <ion-segment-button
              value="1"
              class="button"
              @click="selectStatus(1)"
            >
              <ion-label>Pendiente aceptar</ion-label>
            </ion-segment-button>
            <ion-segment-button
              value="2"
              class="button"
              @click="selectStatus(2)"
            >
              <ion-label>Acordadas</ion-label>
            </ion-segment-button>
            <ion-segment-button
              value="3"
              class="button"
              @click="selectStatus(3)"
            >
              <ion-label>Finalizadas</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <LicitacionesRecibidas :Item="Producto" :Status="status"/>
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import LicitacionesRecibidas from "@/components/LicitacionesRecibidas.vue";
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
    LicitacionesRecibidas,
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
  data() {
    return {
      status: 1,
      Producto: this.$route.params.product,
    };
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    selectStatus(x){
      this.status = x;
    }
  }
};
</script>

<style scoped>
.button {
  width: 100%;
  font-size: 10px;
}
</style>
