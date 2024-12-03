<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="grid grid-cols-3 items-center mx-auto w-11/12">
          <button @click="goBack">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </button>
          <h2 class="text-center">Ordenes</h2>
        </div>

      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Orders :status="status"/>
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import Orders from "@/components/orders/FilteredOrders.vue";
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
  data() {
    return {
      status: true,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    changeStatus() {
      this.status = !this.status;
    },
  },
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
