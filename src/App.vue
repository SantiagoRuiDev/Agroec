<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script allowjs>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { emitAlert } from '@/libs/alert.js';
import * as notificationService from './services/notification.service.js';
import { getLatestNotificationToken, setLatestNotificationToken } from './libs/notification.js';
export default {
  components: {
    IonApp,
    IonRouterOutlet
  },
  data(){
    return {
      subscription_identifier: this.$OneSignal.User.PushSubscription.id
    }
  },
  async created(){
    if(this.userIsSubscribed()){
      try {
        await notificationService.setUserOneSignalSubscription(this.subscription_identifier);
      } catch (error) {
        emitAlert(error, 'error');
      }
    }
  },
  methods: {
    userIsSubscribed(){
      if(this.subscription_identifier != null && this.subscription_identifier != undefined){
        if(getLatestNotificationToken() != this.subscription_identifier){
          setLatestNotificationToken(this.subscription_identifier);
          return true;
        } else {
          return false;
        }
      }else {
        return false;
      }
    }
  }
}
</script>
