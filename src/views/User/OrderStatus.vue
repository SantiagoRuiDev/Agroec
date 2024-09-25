<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <div class="grid grid-cols-3 items-center mx-auto w-11/12">
          <button @click="goBack">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </button>
          <h2 class="text-center">Estado</h2>
          <div class="inline-flex justify-self-end">
            <RouterLink :to="'/chat/orden/' + product + '/' + id_chat" v-if="id_chat.trim() != ''">
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
import Event from '@/libs/event';
import Orders from "@/components/OrderStatus.vue";
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
  data(){
    return {
      id_chat: "",
      product: ""
    }
  },
  async created() {
    Event.on('chat-id', (value) => {
      this.product = value.product;
      this.id_chat = value.chat;
    })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  }
};
</script>
