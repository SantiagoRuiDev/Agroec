<template>
  <div class="content w-11/12 mx-auto grid my-3 gap-3" v-if="!condiciones">
    
    <button
      v-if="!payFeesButton"
      class="default-bar rounded-md h-12 p-2 text-white text-center"
      @click="markAsReceived"
    >
      Marcar recibido
    </button>
    <button
      v-if="payFeesButton"
      class="default-bar rounded-md h-12 p-2 text-white text-center"
      @click="manageFeesModal"
    >
      Pagar Agroec
    </button>

    
    <div class="deliver-title grid gap-2">
      <p class="text-gray-500 text-sm font-bold">Proceso creado:</p>
      <div class="flex flex-row justify-between gap-2">
        <div class="inline-flex gap-2 items-center">
          <img
            src="@/assets/Status/Event.svg"
            alt="Calendar"
            class="w-4 h-4 self-center"
          />
          <h2 class="text-center text-gray-600 text-2xl">Octubre 5, 2023</h2>
        </div>
        <button class="justify-self-end default-bar p-2 rounded-md" @click="manageCondicionesPage">
          <img src="@/assets/Document.svg" alt="Condiciones" class="h-6 w-6" />
        </button>
      </div>
    </div>

    <div class="deliver-status flex gap-4 mt-3 w-full mx-auto">
      <img
        src="@/assets/Status/FirstCheck.svg"
        v-if="count == 1"
        @click="changeStatus"
      />
      <img
        src="@/assets/Status/SecondCheck.svg"
        v-if="count == 2"
        @click="showModal"
      />
      <img
        src="@/assets/Status/AllCheck.svg"
        v-if="count == 3"
        @click="changeStatus"
      />

      <div class="deliver-cards grid gap-3 w-full">
        <div class="bg-yellow-100 text-left px-4 py-3 rounded-md grid gap-1">
          <h2 class="text-md text-gray-700">Pago en garantía de $35.000</h2>
          <p class="text-sm text-gray-600">Noviembre 19, 2023 4:50 PM</p>
        </div>
        <div class="bg-gray-200 text-left px-4 py-3 rounded-md grid gap-1">
          <h2 class="text-md text-gray-700">Pendiente de entrega</h2>
          <p class="text-sm text-gray-600">Noviembre 19, 2023 4:50 PM</p>
        </div>
        <div class="bg-blue-100 text-left px-4 py-3 rounded-md grid gap-1">
          <h2 class="text-md text-gray-700">En camino</h2>
          <p class="text-sm text-gray-600">Noviembre 19, 2023 4:50 PM</p>
        </div>

        <!--Recibido-->
        <div
          class="bg-blue-200 text-left px-4 py-3 rounded-md grid gap-1"
          v-if="recibido"
        >
          <h2 class="text-md text-gray-700">Recibido Aceptado</h2>
          <p class="text-sm text-gray-600">Noviembre 19, 2023 4:50 PM</p>
        </div>
        <div
          class="bg-red-200 text-left px-4 py-3 rounded-md grid gap-1"
          v-if="!recibido && !esperando"
        >
          <h2 class="text-md text-gray-700">Rechazado</h2>
          <p class="text-sm text-gray-600">Noviembre 19, 2023 4:50 PM</p>
        </div>
        <div
          class="bg-green-200 text-left px-4 py-3 rounded-md grid gap-1"
          v-if="esperando"
        >
          <h2 class="text-md text-gray-700">En espera</h2>
          <p class="text-sm text-gray-600">Noviembre 19, 2023 4:50 PM</p>
        </div>
      </div>
    </div>

    <div class="deliver-data grid gap-4 mt-3" @click="showEmbed">
      <h1 class="text-sm text-gray-700 font-bold">Lugar de entrega:</h1>
      <div class="flex gap-2 items-center">
        <span
          class="flex bg-blue-100 rounded-full h-10 w-10 items-center justify-center"
        >
          <img
            src="@/assets/Status/Location.svg"
            alt="StatusBar"
            class="self-center"
          />
        </span>
        <p class="text-gray-600 text-xs w-3/4">
          Industria Copesca, Guayaquil - Guayas 090101
        </p>
      </div>

      <hr />
    </div>

    <div class="embed-data grid mb-6 mt-2" v-if="embed">
      <iframe
        class="rounded-md shadow-sm"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d592.6469091181473!2d-79.90415112891621!3d-2.2149872566503324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d13cbe855805f%3A0x8015a492f4fca473!2sGuayaquil%2C%20Ecuador!5e0!3m2!1ses-419!2sar!4v1698694785560!5m2!1ses-419!2sar"
        width="100%"
        height="300"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    <div class="deliver-price grid gap-3">
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">ID</p>
        <p class="text-sm text-gray-700 text-right">#346</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">ID Negociación</p>
        <p class="text-sm text-gray-700 text-right">#55262</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">Producto</p>
        <p class="text-sm text-gray-700 text-right">Maiz</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">Vendedor</p>
        <p class="text-sm text-gray-700 text-right">Carlos Marin</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">Precio</p>
        <p class="text-sm text-gray-700 text-right">$15,50</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">Cantidad Negociada</p>
        <p class="text-sm text-gray-700 text-right">200</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">Cantidad Recibida</p>
        <p class="text-sm text-gray-700 text-right">200</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-800 text-left font-bold">Total</p>
        <p class="text-sm text-gray-800 text-right font-bold">$35.000.00</p>
      </div>
    </div>
  </div>

  <CondicionesOferta v-if="condiciones" :entregas="[]"></CondicionesOferta>
  <!-- Alert Modal -->
  <CModal alignment="center" :visible="delivered" @close="closeModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img
          src="@/assets/Nav/X.svg"
          alt="Close alert"
          @click="closeModal"
          class="justify-self-end"
        />
        <h2 class="text-center text-md font-bold text-gray-500 w-3/5 mx-auto">
          ¿Ha recibido el producto?
        </h2>
        <div class="flex gap-3 w-5/6 mx-auto">
          <button
            class="default-bar text-white text-center p-2 w-3/5 rounded-md shadow"
            @click="manageFeesModal"
          >
            Recibido
          </button>
          <button
            class="bg-gray-400 text-white text-center p-2 w-3/5 rounded-md shadow"
            @click="manageWaitingModal"
          >
            Esperar
          </button>
          <button
            class="bg-red-400 text-white text-center p-2 w-3/5 rounded-md shadow"
            @click="manageRechazoModal"
          >
            No recibido
          </button>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <!-- Feedback Modal -->
  <CModal alignment="center" :visible="rechazo" @close="manageRechazoModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img
          src="@/assets/Nav/X.svg"
          alt="Close alert"
          @click="manageFeedbackModal"
          class="justify-self-end"
        />
        <h2
          class="mt-3 text-center text-md font-bold text-gray-900 w-3/5 mx-auto"
        >
          Reconfirmación de Rechazo
        </h2>
        <div class="flex gap-3 w-full mx-auto justify-center">
          <p class="text-center text-gray-600">
            ¿Estás seguro de querer marcar como no recibido?
          </p>
        </div>
        <button
          @click="notReceived"
          class="mt-3 bg-red-400 text-white font-bold shadow p-2 h-12 mx-auto w-3/5 rounded-md"
        >
          Confirmar
        </button>
      </div>
    </CModalBody>
  </CModal>

  <!-- Fee Modal -->
  <CModal alignment="center" :visible="fees" @close="notPaidFees">
    <CModalBody>
      <div class="grid w-full gap-2 pb-3">
        <img
          src="@/assets/Nav/X.svg"
          alt="Close alert"
          @click="notPaidFees"
          class="justify-self-end"
        />
        <h2
          class="mt-3 text-center text-md font-bold text-gray-900 w-3/5 mx-auto"
        >
          Cobro de fee de Agroec
        </h2>
        <div class="flex gap-3 w-5/6 mx-auto justify-center">
          <p class="text-center text-gray-700">
            Se efectuará el cobro del [Valor fee]
          </p>
        </div>
        <button
          @click="payFees"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-3/5 rounded-md"
        >
          Pagar
        </button>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="garantia" @close="payGuarantee">
    <CModalBody>
      <div class="grid w-full gap-2 pb-3">
        <img
          src="@/assets/Nav/X.svg"
          alt="Close alert"
          @click="payGuarantee"
          class="justify-self-end"
        />
        <h2
          class="mt-3 text-center text-md font-bold text-gray-900 w-3/5 mx-auto"
        >
          Realizar pago garantía
        </h2>
        <div class="gap-1 mx-auto grid">
          <p class="text-center text-gray-700">
            Se efectuará el cobro del [Porcentaje]%
          </p>
          <h1 class="text-center text-gray-700 font-bold text-xl">
            Total <span class="text-lime-500 font-bold">$</span>[Valor Garantía]
          </h1>
          <select
            name="paymentMethod"
            id="paymentMethod"
            class="bg-transparent p-2 h-12 border-2 rounded-md w-2/3 text-gray-700 mx-auto"
          >
            <option value="0" selected disabled>Método de pago</option>
            <option value="1">Transferencia Bancaria</option>
            <option value="2">TD/TC</option>
          </select>
        </div>
        <button
          @click="payGuarantee"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-1/2 rounded-md"
        >
          Pagar
        </button>
      </div>
    </CModalBody>
  </CModal>

  <!-- Waiting Modal -->
  <CModal alignment="center" :visible="waiting" @close="manageWaitingModal">
    <CModalBody>
      <div class="grid w-full gap-2 pb-3">
        <img
          src="@/assets/Nav/X.svg"
          alt="Close alert"
          @click="manageWaitingModal"
          class="justify-self-end"
        />
        <h2
          class="mt-3 text-center text-md font-bold text-gray-900 w-3/5 mx-auto"
        >
          Tiempo de Espera
        </h2>
        <div class="grid gap-3 w-11/12 mx-auto">
          <p class="text-center text-gray-700">Tienes un maximo de tres dias</p>
          <input
            type="date"
            id="datePicker"
            v-model="selectedDate"
            :max="maxDate"
            class="h-12 p-2 w-full rounded-md border-2 border-gray-300 text-gray-600 bg-transparent"
          />>
        </div>
        <button
          @click="manageWaitingModal"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-3/5 rounded-md"
        >
          Actualizar
        </button>
      </div>
    </CModalBody>
  </CModal>

  <!-- Reseña Modal -->
  <CModal alignment="center" :visible="calificar">
    <CModalBody>
      <div class="grid w-full gap-2 pb-3">
        <h2
          class="mt-3 text-center text-md font-bold text-gray-900 w-3/5 mx-auto"
        >
          Porfavor califica al vendedor
        </h2>
        <h3 class="text-center text-gray-700 font-bold text-sm">
          {{ value }}.0
        </h3>
        <div class="flex gap-3 w-5/6 mx-auto justify-center" v-if="value == 0">
          <img
            src="@/assets/Calificar/GrayStar.svg"
            class="h-6 w-6"
            @click="calify(1)"
          />
          <img
            src="@/assets/Calificar/GrayStar.svg"
            class="h-6 w-6"
            @click="calify(2)"
          />
          <img
            src="@/assets/Calificar/GrayStar.svg"
            class="h-6 w-6"
            @click="calify(3)"
          />
          <img
            src="@/assets/Calificar/GrayStar.svg"
            class="h-6 w-6"
            @click="calify(4)"
          />
          <img
            src="@/assets/Calificar/GrayStar.svg"
            class="h-6 w-6"
            @click="calify(5)"
          />
        </div>
        <Calify
          :value="value"
          v-if="value >= 1"
          @update:value="updateCalification"
        ></Calify>

        <button
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-3/5 rounded-md"
        >
          Enviar
        </button>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="politicasModal" @close="managePoliticas">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img
          src="@/assets/Nav/X.svg"
          alt="Close alert"
          @click="managePoliticas"
          class="justify-self-end"
        />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Politicas
        </h2>
        <div class="mx-auto text-left max-h-52 overflow-y-scroll">
          <p class="text-gray-700 text-sm w-3/4 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            vestibulum orci ligula. Proin eget lorem justo. Donec sodales urna
            vel imperdiet accumsan. Ut dignissim ipsum et condimentum placerat.
            Aenean porttitor tellus purus, a feugiat nibh faucibus et. Praesent
            quam tellus, rutrum at vehicula quis, condimentum nec tellus. Mauris
            quis aliquet orci. Nulla condimentum dapibus metus, vel faucibus
            mauris dignissim ut. Aliquam pretium libero in quam gravida, sed
            ornare eros efficitur. Nam vitae mattis est. Vivamus ornare metus eu
            neque auctor hendrerit. Sed tincidunt nisi et porta imperdiet. Donec
            sagittis turpis felis, et imperdiet neque viverra at. Duis nisl
            purus, congue sed lacus sit amet, pellentesque ullamcorper mauris.
            Quisque laoreet, odio eu pretium euismod, tortor nisi scelerisque
            orci, a malesuada augue diam in dolor. Cras nec sagittis sem, vel
            imperdiet tellus. Proin gravida quis nisi vitae fringilla. Cras
            feugiat sapien mi, vel mattis augue hendrerit non. Morbi efficitur
            at leo vel scelerisque. Duis turpis ligula, ultrices in mollis et,
            faucibus non neque. Nunc sed nisl in arcu vulputate vestibulum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
            eleifend laoreet. Donec aliquet placerat vulputate.
          </p>
        </div>
      </div>
    </CModalBody>
  </CModal>
  <!-- Feedback Modal -->
  <CModal alignment="center" :visible="feedback" @close="manageFeedbackModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img
          src="@/assets/Nav/X.svg"
          alt="Close alert"
          @click="manageFeedbackModal"
          class="justify-self-end"
        />
        <h2
          class="mt-3 text-center text-md font-bold text-gray-900 w-3/5 mx-auto"
        >
          ¿Qué sucedió?
        </h2>
        <div class="flex gap-3 w-5/6 mx-auto justify-center">
          <select
            name="select"
            id="select"
            class="h-12 p-2 w-full rounded-md border-2 border-gray-300 text-gray-600 bg-transparent"
          >
            <option value="1" selected>Rechazado</option>
            <option value="2">Nunca llegó</option>
          </select>
        </div>
        <button
          @click="manageFeedbackModal"
          class="mt-3 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-3/5 rounded-md"
        >
          Enviar
        </button>
      </div>
    </CModalBody>
  </CModal>
</template>

<script>
import { CModal, CModalBody } from "@coreui/vue";
import Calify from "@/components/others/Calify.vue";
import CondicionesOferta from '@/components/proposal/CondicionesOferta.vue';
import event from '@/libs/event';
export default {
  components: {
    CondicionesOferta,
    CModal,
    Calify,
    CModalBody,
  },
  data() {
    return {
      count: 2,
      delivered: false,
      esperando: false,
      recibido: false,
      calificar: false,
      embed: false,
      fees: false,
      feesPaid: false,
      feedback: false,
      waiting: false,
      value: 0,
      selectedDate: "",
      maxDate: "",
      garantia: false,
      payFeesButton: true,
      rechazo: false,
      quantity: false,
      condiciones: false,
      politicasModal: false,
    };
  },
  created() {
    event.on('openPoliticas', this.managePoliticas)
    event.on('closeDatos', this.manageCondicionesPage);
    this.setThreeDaysLimit();
  },
  methods: {
    manageCondicionesPage(){
      this.condiciones = !this.condiciones
    },
    manageRechazoModal(){
      this.rechazo = !this.rechazo;
    },
    managePoliticas(){
      this.politicasModal = !this.politicasModal
    },
    payGuarantee() {
      this.garantia = !this.garantia;
    },
    calify(value) {
      this.value = value;
    },
    showEmbed() {
      this.embed = this.embed ? false : true;
    },
    updateCalification(value) {
      this.value = value;
    },
    notPaidFees() {
      if (this.feesPaid) {
        return;
      }
      this.recibido = false;
      this.esperando = false;
      this.payFeesButton = true;
      this.manageFeesModal();
    },
    manageWaitingModal() {
      this.waiting = !this.waiting;
    },
    markAsReceived() {
      if (this.count == 2) {
        this.showModal();
      } else if (this.count < 3) {
        this.count = 2;
        this.showModal();
      }
    },
    changeStatus() {
      if (this.count == 2) {
        this.count++;
        this.recibido = true;
        this.esperando = false;
        this.closeModal();
        this.calificar = true;
      } else if (this.count < 4) {
        this.count++;
      }
    },
    notReceived() {
      if (this.count == 2) {
        this.recibido = false;
        this.esperando = false;
        this.manageFeedbackModal();
      }
    },
    manageFeedbackModal() {
      this.rechazo = false;
      this.feedback = !this.feedback;
    },
    manageFeesModal() {
      if (this.feesPaid) {
        this.count++;
        this.recibido = true;
        this.esperando = false;
        this.closeModal();
        this.fees = false;
        this.calificar = true;
        return;
      }
      this.fees = !this.fees;
    },
    payFees() {
      if (this.count == 3) {
        this.recibido = true;
        this.esperando = false;
      }
      if (this.payFeesButton) {
        this.payFeesButton = false;
      }
      this.feesPaid = true;
      this.manageFeesModal();
    },
    callLater() {
      this.closeModal();
      setTimeout(() => {
        this.showModal();
      }, 2000);
    },
    showModal() {
      this.delivered = true;
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.delivered = false;
      this.calificar = false;
    },
    setThreeDaysLimit() {
      // Calcular la fecha límite (3 días desde la fecha actual)
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 3);

      // Formatear la fecha límite como "YYYY-MM-DD"
      const maxDateString = maxDate.toISOString().split("T")[0];

      // Establecer la fecha límite como la máxima permitida para el input de fecha
      this.maxDate = maxDateString;
    },
  },
};
</script>
