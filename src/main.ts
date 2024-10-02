import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
import VueApexCharts from "vue3-apexcharts";
/* Theme variables */
import "@coreui/coreui/dist/css/coreui.min.css";
import "./theme/main.css";
import store from "./store/index.js";
import "./theme/variables.css";
import OneSignalVuePlugin from "@onesignal/onesignal-vue3";

const app = createApp(App)
  .use(OneSignalVuePlugin, {
    appId: "aac4070e-a56e-47fb-b3c6-7a197cccb349",
    safari_web_id: "web.onesignal.auto.48e79a0f-c6ba-48bf-ae98-32501b011889",
    notifyButton: {
      enable: true,
    },
    allowLocalhostAsSecureOrigin: true,
  })
  .use(IonicVue)
  .use(router)
  .use(store)
  .use(VueApexCharts);

router.isReady().then(() => {
  app.mount("#app");
});
