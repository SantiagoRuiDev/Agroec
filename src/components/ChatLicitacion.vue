<template>
  <div v-if="!details" class="content w-11/12 mx-auto grid mb-5 gap-4 min-h-full">
    <div class="mt-2 md:mx-auto message-wrap md:w-full overflow-auto max-h-[28rem]" ref="messagesContainer">

      <div class="grid gap-2 p-2 md:w-5/6 rounded-md bg-lime-100 text-lime-900"
        v-if="conditions && !(conditions.estado_vendedor == 'Aceptada' && conditions.estado_comprador == 'Aceptada')">
        <h1 class="font-bold">Nueva Propuesta</h1>
        <div class="inline-flex gap-2 items-center">
          <img :src="conditions.imagen" alt="Producto Imagen" class="h-6 w-6">
          <h2 class="">{{ conditions.cantidad_propuesta }} {{ conditions.cantidad_unidad_propuesta }} de {{
            conditions.id_producto }} por ${{ conditions.precio_propuesta }}/{{ conditions.precio_unidad_propuesta }}
          </h2>
        </div>
        <div class="inline-flex gap-2 items-center">
          <img src="../assets/Event.svg" alt="Calendario Imagen" class="h-6 w-6">
          <div class="grid gap-1">
            <p>Fecha limite/entrega: {{ formatDateTime(conditions.fecha_limite).plainDate }}</p>
            <p v-if="conditions.horarios">Horarios: {{ conditions.horarios }}</p>
          </div>
        </div>
        <div class="inline-flex gap-2 items-center" v-if="conditions.ubicacion">
          <img src="../assets/Status/LocationChat.svg" alt="Location Imagen" class="h-6 w-6">
          <p>{{ conditions.ubicacion }}</p>
        </div>
        <div class="inline-flex gap-2 items-center">
          <img src="../assets/Sack.svg" alt="Saco Imagen" class="h-6 w-6">
          <p>Presentación: {{ conditions.presentacion_propuesta }}</p>
        </div>
        <div class="inline-flex gap-2 items-center">
          <img src="../assets/Informative.svg" alt="Info Imagen" class="h-6 w-6">
          <p>Información: {{ conditions.informacion_adicional }}</p>
        </div>
        <div class="inline-flex gap-2 items-center">
          <img src="../assets/Pago.svg" alt="Metodo pago Imagen" class="h-6 w-6">
          <h2 class="uppercase font-bold">TOTAL NEGOCIADO</h2>
          <p>${{ conditions.cantidad_propuesta * conditions.precio_propuesta }}</p>
        </div>
      </div>
      <div class="grid gap-2 p-2 md:w-5/6 rounded-md bg-lime-100 text-lime-900" v-else>
        <h1 class="font-bold">Condiciones Negociadas</h1>
        <div class="inline-flex gap-2 items-center">
          <img :src="conditions.imagen" alt="Producto Imagen" class="h-6 w-6">
          <h2 class="">{{ conditions.cantidad }} {{ conditions.cantidad_unidad }} de {{
            conditions.id_producto }} por ${{ conditions.precio }}/{{ conditions.precio_unidad }}
          </h2>
        </div>
        <div class="inline-flex gap-2 items-center">
          <img src="../assets/Event.svg" alt="Calendario Imagen" class="h-6 w-6">
          <div class="grid gap-1">
            <p>Fecha limite/entrega: {{ formatDateTime(conditions.fecha_limite).plainDate }}</p>
            <p v-if="conditions.horarios">Horarios: {{ conditions.horarios }}</p>
          </div>
        </div>
        <div class="inline-flex gap-2 items-center" v-if="conditions.ubicacion">
          <img src="../assets/Status/LocationChat.svg" alt="Location Imagen" class="h-6 w-6">
          <p>{{ conditions.ubicacion }}</p>
        </div>
        <div class="inline-flex gap-2 items-center">
          <img src="../assets/Sack.svg" alt="Saco Imagen" class="h-6 w-6">
          <p>Presentación: {{ conditions.presentacion_propuesta }}</p>
        </div>
        <div class="inline-flex gap-2 items-center">
          <img src="../assets/Informative.svg" alt="Info Imagen" class="h-6 w-6">
          <p>Información: {{ conditions.informacion_adicional }}</p>
        </div>
        <div class="inline-flex gap-2 items-center">
          <img src="../assets/Pago.svg" alt="Metodo pago Imagen" class="h-6 w-6">
          <h2 class="uppercase font-bold">TOTAL NEGOCIADO</h2>
          <p>${{ conditions.cantidad * conditions.precio }}</p>
        </div>
      </div>
      <div class="messages grid gap-3 p-2 md:w-5/6 mx-auto" v-for="(message, index) in messages" :key="message.id">
        <!-- Resto del contenido del chat -->
        <div v-if="shouldShowDateDivider(index)"
          class="w-2/3 sm:w-1/2 mx-auto grid items-center text-center bg-gray-100 rounded-lg md:w-1/3">
          <span class="p-2 text-sm text-gray-500 font-bold">{{ formatDate(message.fecha) }}</span>
        </div>
        <div class="flex gap-2 items-center" v-if="chat.user_logged != ''" :class="{
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
          <img src="@/assets/People/Aso.svg" alt="Outgoing Message Profile Icon" class="h-16 w-16"
            v-if="chat.user_logged == message.id_remitente" />
        </div>
      </div>
    </div>

    <div class="grid gap-3 md:w-3/4 mx-auto">
      <div class="flex justify-between mx-auto w-full gap-3 h-full items-end"
        v-if="!(conditions.estado_comprador == 'Aceptada' && conditions.estado_vendedor == 'Aceptada')">
        <button class="bg-red-400 px-2 py-1 w-1/2 h-8 rounded-md shadow-md color-white text-xs"
          v-if="!(conditions.estado_comprador == 'Rechazada' || conditions.estado_comprador == 'Aceptada')"
          @click="manageRechazoModal">
          Rechazar
        </button>
        <button v-on:click="showDealDetails" v-if="!(conditions.estado_comprador == 'Rechazada')"
          class="default-bar px-2 w-full py-1 h-8 rounded-md shadow-md color-white text-xs">
          Condiciones
        </button>
        <button v-if="!offerSaw && !(conditions.estado_comprador == 'Rechazada' || conditions.estado_comprador == 'Aceptada')" @click="showCondicionesMessage"
          class="bg-gray-400 px-2 w-full py-1 h-8 rounded-md shadow-md color-white text-xs">
          Aceptar oferta
        </button>
        <button v-if="offerSaw && !(conditions.estado_comprador == 'Rechazada' || conditions.estado_comprador == 'Aceptada')" @click="acceptProposal"
          class="default-bar px-2 w-full py-1 h-8 rounded-md shadow-md color-white text-xs">
          Aceptar oferta
        </button>
      </div>

      <div class="w-full mx-auto grid items-center justify-center my-2" v-if="condicionesMessage && !offerSaw">
        <span class="font-bold text-gray-700 text-sm text-center">ATENCION</span>
        <p class="text-gray-600 text-sm text-center">
          Recuerda que solo podrás aceptar la oferta cuando visites las
          condiciones y cuando el vendedor confirme el acuerdo
        </p>
      </div>

      <div class="grid gap-2 p-4 bg-gray-100 rounded-md relative" v-if="false">
        <h1 class="text-gray-400 font-bold">Respondiendo a</h1>
        <span class="text-gray-500 font-bold absolute top-0 right-2 text-xl" @click="deleteReply">X</span>
        <div class="bg-gray-200 p-3 rounded-md text-gray-500 relative" v-if="repliedMessage">
          {{ repliedMessage }}

          <span class="text-gray-700 text-sm absolute right-1 bottom-0 hour-text">13:25 PM</span>
        </div>
        <div class="message-form self-center relative">
          <input type="text" v-model="messageInput" class="bg-gray-200 rounded-md w-full h-12 p-3 text-gray-500"
            placeholder="Responder" />
          <button class="absolute right-2 top-4" @click="sendMessage">
            <img src="@/assets/Send.svg" alt="Send Message" class="h-4 w-4" />
          </button>
        </div>
      </div>
      <div class="grid" v-else>
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
    <!--Navbar Inside chat-->
  </div>

  <div v-if="details" class="content w-min-screen mx-auto grid my-3 gap-3">
    <ConditionOverview :conditions="conditions" :condition_quality_params="quality_params"
      :condition_deliveries="deliveries"></ConditionOverview>
  </div>

  <CModal alignment="center" :visible="visible" @close="closeModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Has confirmado está oferta
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-700 text-sm w-3/4 mx-auto">
            Agradecemos el presente acuerdo, Agroec respaldará todo el proceso.
          </p>
          <div class="mt-2 w-11/12 mx-auto">
            <li class="text-gray-700 text-sm">
              Enviaremos tu confirmación al vendedor, el cual debe también
              aceptar para cerrar la negociación.
            </li>
          </div>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="rechazoModal" @close="manageRechazoModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="manageRechazoModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto">
          Reconfirmación de Rechazo
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-700 text-sm w-full mx-auto">
            ¿Estas seguro de querer rechazar la oferta?
          </p>
        </div>

        <button class="h-12 w-2/3 bg-red-400 rounded-md text-white text-center mx-auto" @click="rejectProposal">
          Confirmar
        </button>
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
import { formatDateTime } from '../libs/date.js'
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

      lastDate: null,
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
        precio_puesto_domicilio: 0
      },

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
      console.log(data);
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
    async rejectProposal () {
      try {
        await proposalService.rejectProposal(this.chat.id_condiciones);
        await this.getChatConditions();
        this.manageRechazoModal();
      } catch (error) {
        emitAlert(error, 'error');
      }
    },
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
    async acceptProposal() {
      try {
        await proposalService.acceptProposal(this.chat.id_condiciones);
        await this.getChatConditions();
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
    },
    draggedMessageEnd(e) {
      this.repliedMessage = e.target.textContent;
    },
    deleteReply() {
      this.repliedMessage = "";
    },
    manageEntregasSelect() {
      this.entregasSelect = !this.entregasSelect;
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
