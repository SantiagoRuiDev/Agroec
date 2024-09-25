<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="flex items-center mx-auto w-11/12">
          <RouterLink to="#" @click="goBack">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
          <h2 class="text-center mx-auto">Orden {{ Producto }}</h2>
          <RouterLink :to="'/review/' + Producto">
            <img src="@/assets/Statistics/Informative.svg" alt="Back" class="w-4 h-4" v-on:click="showModal" />
          </RouterLink>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ChatOrden :Item="Producto" />
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import ChatOrden from "@/components/ChatOrden.vue";
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
    ChatOrden,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
  },
  data() {
    return {
      Producto: this.$route.params.name,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
};
</script>
