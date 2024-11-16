<template>
  <div v-if="!details" class="content w-11/12 mx-auto grid mb-5 gap-4 min-h-full">
    <div class="mt-2 md:mx-auto message-wrap md:w-full overflow-auto max-h-[28rem]" ref="messagesContainer">
      <div class="messages grid gap-3 p-2 md:w-5/6 mx-auto" v-for="(message, index) in messages" :key="message.id">
        <div v-if="shouldShowDateDivider(index)"
          class="w-2/3 sm:w-1/2 mx-auto grid items-center text-center bg-gray-100 rounded-lg md:w-1/3">
          <span class="p-2 text-sm text-gray-500 font-bold">{{ formatDate(message.fecha) }}</span>
        </div>
        <div class="flex gap-2 items-center" :class="{
          'message-incoming': chat.user_logged != message.id_remitente,
          'message-outgoing': chat.user_logged == message.id_remitente
        }">
          <ProfileIcon :profile="chat.tipo_perfil" :height="true" :weight="false"
            v-if="chat.user_logged != message.id_remitente"></ProfileIcon>
          <div class="w-full">
            <div class="message-content rounded-md p-2 w-full grid" :class="{
              'incoming-chat': chat.user_logged != message.id_remitente,
              'outgoing-chat': chat.user_logged == message.id_remitente
            }">
              <p class="text-sm text-gray-800 w-11/12">
                {{ message.texto }}
              </p>

              <span class="text-gray-700 text-sm justify-self-end hour-text">{{
                formatDateTime(message.fecha).time }}</span>
            </div>
          </div>
          <img src="@/assets/People/Comprador.svg" alt="Outgoing Message Profile Icon" class="h-16 w-16"
            v-if="chat.user_logged == message.id_remitente" />
        </div>
      </div>
    </div>

    <div class="grid gap-3 items-center md:w-3/4 mx-auto">
      <div class="grid">
        <div class="message-form self-center relative bg-gray-200 h-12 rounded-md">
          <input type="text" v-model="messageInput" class="w-11/12 h-12 outline-none bg-transparent p-3 text-gray-500"
            placeholder="Responder" />
          <button class="absolute right-2 top-1/2 transform -translate-y-1/2" @click="sendMessage">
            <img src="@/assets/Send.svg" alt="Send Message" class="h-4 w-4 " />
          </button>
        </div>
      </div>

      <p class="text-xs text-gray-500 font-bold my-2 text-center w-11/12 mx-auto">
        Bajo contrato está prohibido compartir información personal.
      </p>
    </div>

    <button class="dark-bar h-14 mx-auto p-3 text-center text-white font-bold rounded-md" @click="manageEntregasModal">
      Cantidad de entregas totales: {{ deliveries.length }}
    </button>
    <!--Navbar Inside chat-->
  </div>


  <CModal alignment="center" :visible="entregasModal" @close="manageEntregasModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="manageEntregasModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto">
          Entregas totales
        </h2>
        <div class="mx-auto">
          <ion-segment value="buttons">
            <ion-segment-button value="true" @click="seeReceivedDeliveries"
              class="tabs button border-gray-300 text-gray-600">
              <ion-label>Cumplidas</ion-label>
            </ion-segment-button>
            <ion-segment-button value="false" @click="seeUnreceivedDeliveries"
              class="tabs button border-gray-300 text-gray-600">
              <ion-label>Falta Recibir</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>
        <div class="grid" v-if="entregasSelect">
          <RouterLink :to="'/order/' + delivery.id_orden" v-for="delivery in deliveries.filter(del => del.estado == 'Aceptado' || del.estado == 'Recibido')"
            :key="delivery">
            <div class="order-card flex md:grid md:grid-cols-2 gap-3 p-2">
              <div class="flex w-full gap-3">
                <div class="Order grid items-center text-center">
                  <img :src="conditions.imagen" alt="Orden Icon" class="h-16 w-16 mx-auto" />
                </div>

                <div class="Order-Text text-left">
                  <h1 class="text-gray-600 text-sm font-bold">Orden #{{ delivery.id.slice(0, 8) }}</h1>
                  <h1 class="text-gray-600 text-xs font-bold">
                    {{ this.$route.params.name }}
                  </h1>
                  <p class="text-gray-500 text-xs">Cant: {{ delivery.cantidad }} {{ delivery.cantidad_unidad }}</p>
                  <p class="text-gray-500 text-xs">{{ formatWalletDate(delivery.fecha_entrega).slice(0, 10) }}</p>
                </div>
              </div>

              <div class="Order-Price text-right grid mt-2 justify-end">
                <h1 class="text-yellow-400 text-md font-bold">${{ Number(conditions.precio).toFixed(2) }}</h1>
                <h1 class="text-yellow-400 text-md font-bold">{{ conditions.precio_unidad }}</h1>
                <p class="text-lime text-xs font-bold">Entregada</p>
              </div>
            </div>
          </RouterLink>

        </div>
        <div class="grid" v-if="!entregasSelect">
          <RouterLink :to="'/order/' + delivery.id_orden" v-for="delivery in deliveries.filter(del => del.estado != 'Aceptado' || del.estado != 'Recibido')"
            :key="delivery">
            <div class="order-card flex md:grid md:grid-cols-2 gap-3 p-2">
              <div class="flex w-full gap-3">
                <div class="Order grid items-center text-center">
                  <img :src="conditions.imagen" alt="Orden Icon" class="h-16 w-16 mx-auto" />
                </div>

                <div class="Order-Text text-left">
                  <h1 class="text-gray-600 text-sm font-bold">Orden #{{ delivery.id.slice(0, 8) }}</h1>
                  <h1 class="text-gray-600 text-xs font-bold">
                    {{ this.$route.params.name }}
                  </h1>
                  <p class="text-gray-500 text-xs">Cant: {{ delivery.cantidad }} {{ delivery.cantidad_unidad }}</p>
                  <p class="text-gray-500 text-xs">{{ formatWalletDate(delivery.fecha_entrega).slice(0, 10) }}</p>
                </div>
              </div>

              <div class="Order-Price text-right grid mt-2 justify-end">
                <h1 class="text-yellow-400 text-md font-bold">${{ Number(conditions.precio).toFixed(2) }}</h1>
                <h1 class="text-yellow-400 text-md font-bold">{{ conditions.precio_unidad }}</h1>
                <p class="text-red-400 text-xs font-bold">{{ delivery.estado }}</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </CModalBody>
  </CModal>



  <CModal alignment="center" :visible="errorChat" @close="closeChatModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeChatModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Error
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-700 text-sm w-3/4 mx-auto">
            No es posible ingresar numeros o correos en el chat.
          </p>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<script allowJs>
import Event from "../libs/event.js";
import { CModal, CModalBody } from "@coreui/vue";
import { formatDateTime, formatWalletDate } from '../libs/date.js'
import { initializeSocket, socket } from '../socket/socket.js'
import * as chatService from '../services/chat.service.js';
import * as proposalService from '../services/proposal.service.js';
import { IonIcon, IonSegment, IonLabel, IonSegmentButton } from "@ionic/vue";
import { emitAlert } from "@/libs/alert.js";
import ProfileIcon from "./ProfileIcon.vue";
import ConditionOverview from "./ConditionOverview.vue";
export default {
  components: {
    CModal,
    CModalBody,
    IonSegment,
    IonLabel,
    IonSegmentButton,
    IonIcon,
    ConditionOverview,
    ProfileIcon
  },
  props: {
    Item: String,
  },
  data() {
    return {
      startIndex: 1,
      details: false,
      offerSaw: false,
      visible: false,
      errorChat: false,
      messageInput: "",
      isActive: true,
      borders: true,
      rechazoModal: false,
      condicionesMessage: false,
      datos: false,
      entregasModal: false,
      entregasSelect: true,
      repliedMessage: "",

      quality_params: [],

      conditions: {
        id: "",
        precio: "",
        precio_unidad: "",
        cantidad: "",
        cantidad_unidad: "",
        modo_pago: "",
        porcentaje_inicial: 0,
        modo_pago_final: "",
        porcentaje_final: 0,
        politicas_recepcion: "",
        notas: "",
        imagen: "",
        precio_puesto_domicilio: 0
      },

      lastDate: null,
      deliveries: [],

      chat: {
        id: "",
        id_comprador: "",
        id_vendedor: "",
        user_logged: "",
        push_notificacion: null,
        id_condiciones: "",
        tipo_perfil: ""
      },
      messages: []
    };
  },
  async created() {
    await this.getChatConditions();
    await initializeSocket();
    this.scrollToBottom(); // Para asegurar que inicia en la parte inferior
    Event.on("close-details", () => {
      this.closeDetails();
    });
    Event.on("fetch-conditions", async () => {
      await this.getChatConditions();
      Event.emit('map-conditions');
    })
    socket.emit('connect-room', { room: this.$route.params.identifier });
    socket.on('room-messages', (data) => {
      const aux = this.chat.user_logged;
      this.chat = data.chat.chat;
      this.messages = data.chat.messages;
      this.chat.user_logged = aux;
    });
    socket.on('room-unauthorized', (data) => {
      emitAlert(data, 'error');
    })
    socket.on('room-error', (data) => {
      emitAlert(data, 'error');
    })
  },
  watch: {
    messages() {
      this.scrollToBottom();
    }
  },
  methods: {
    shouldShowDateDivider(index) {
      const messageDate = this.formatDate(this.messages[index].fecha);
      if (index === 0 || this.formatDate(this.messages[index - 1].fecha) !== messageDate) {
        this.lastDate = messageDate;
        return true;
      }
      return false;
    },
    formatDate(dateString) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    formatDateTime(x) {
      return formatDateTime(x)
    },
    formatWalletDate(x) {
      return formatWalletDate(x)
    },
    async acceptProposal() {
      try {
        await proposalService.acceptProposal(this.chat.id_condiciones);
        this.showModal();
      } catch (error) {
        emitAlert(error, 'error');
      }
    },
    async getChatConditions() {
      const { condition, deliveries, quality_params, logged } = await chatService.getChatConditions(this.$route.params.identifier);
      this.deliveries = deliveries;
      this.conditions = condition;
      this.quality_params = quality_params;
      this.chat.user_logged = logged;
      this.conditions.precio_puesto_domicilio = (this.conditions.precio_puesto_domicilio == 1) ? true : false;

      Event.emit('proposal-id', condition.id_propuesta);
    },
    draggedMessageEnd(e) {
      this.repliedMessage = e.target.textContent;
    },
    deleteReply() {
      this.repliedMessage = "";
    },
    seeReceivedDeliveries() {
      this.entregasSelect = true;
    },
    seeUnreceivedDeliveries() {
      this.entregasSelect = false;
    },
    manageEntregasModal() {
      this.entregasModal = !this.entregasModal;
    },
    manageRechazoModal() {
      this.rechazoModal = !this.rechazoModal;
    },
    showCondicionesMessage() {
      this.condicionesMessage = !this.condicionesMessage;
    },
    sendMessage() {
      // Check if message contains emails or numbers

      const expresion = /\w+@\w+\.+[a-z]/;

      if (this.messageInput === "") {
        return;
      } else if (expresion.test(this.messageInput)) {
        this.errorChat = true;
        return;
      } else if (this.messageInput.match(/\d+/g)) {
        this.errorChat = true;
        return;
      } else {
        socket.emit('send-message', { room: this.$route.params.identifier, texto: this.messageInput });

        this.messageInput = "";
      }
    },
    showDealDetails() {
      this.details = !this.details ? true : false;
      Event.emit('open-details');
      this.offerSaw = true;
    },
    closeDetails() {
      this.details = this.details ? false : true;
    },
    showModal() {
      this.datos = false;
      this.visible = true;
    },
    closeChatModal() {
      this.errorChat = false;
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.visible = false;
    },
    managePercetangeFinal(e) {
      if (e.target.value > 100) {
        this.conditions.porcentaje_final = 100;
        return (this.conditions.porcentaje_inicial = 0);
      }
      const valueFinal = 100 - e.target.value;
      return (this.conditions.porcentaje_inicial = valueFinal);
    },
    managePercetangeInitial(e) {
      if (e.target.value > 100) {
        this.conditions.porcentaje_inicial = 100;
        return (this.conditions.porcentaje_final = 0);
      }
      const valueFinal = 100 - e.target.value;
      return (this.conditions.porcentaje_final = valueFinal);
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

z .message-wrap {
  height: 50vh;
}

/* ===== Scrollbar CSS ===== */

.button {
  width: 100%;
  font-size: 12px;
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #b4b1b1 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: #b4b1b1;
  border-radius: 10px;
  border: 3px solid #ffffff;
}

.h-modaldatos {
  height: 75vh;
}

@media (min-width: 768px) {
  .h-modaldatos {
    height: 65vh;
  }
}

#domicilio {
  accent-color: #a3e635;
}

.hour-text {
  opacity: 0.8;
}
</style>
