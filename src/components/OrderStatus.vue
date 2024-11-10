<template>
  <div class="content w-11/12 mx-auto grid my-3 gap-3" v-if="!condiciones && order">
    <button class="default-bar rounded-md h-12 p-2 text-white text-center"
      v-if="order.modo_pago == 'Modo Garantía' && !warranty" @click="manageWarrantyModal">
      Pagar garantía
    </button>
    <button v-if="fetchStatusArray('Recibido').length > 0 && !fee"
      class="default-bar rounded-md h-12 p-2 text-white text-center" @click="manageFeesModal">
      Pagar Agroec
    </button>

    <div class="deliver-title grid gap-2">
      <p class="text-gray-500 text-sm font-bold">Proceso creado:</p>
      <div class="flex flex-row justify-between gap-2">
        <div class="inline-flex gap-2 items-center" v-if="order">
          <img src="@/assets/Status/Event.svg" alt="Calendar" class="w-4 h-4 self-center" />
          <h2 class="text-center text-gray-600 text-2xl">{{ formatDateTime(order.creado).dayAndMonth }}</h2>
        </div>
        <button class="justify-self-end default-bar p-2 rounded-md" @click="manageCondicionesPage">
          <img src="../assets/Document.svg" alt="Condiciones" class="h-6 w-6" />
        </button>
      </div>
    </div>

    <div class="deliver-status flex gap-4 mt-3 w-full mx-auto">
      <img src="@/assets/Status/NullCheck.svg"
        v-if="order.modo_pago != 'Modo Garantía' && !warranty && statuses.length >= 0 && statuses.length < 1" />
      <img src="@/assets/Status/NullCheck.svg"
        v-if="order.modo_pago == 'Modo Garantía' && statuses.length >= 0 && statuses.length < 1" />
      <img src="@/assets/Status/FirstCheck.svg"
        v-if="fetchStatusArray('Pendiente de entrega').length > 0 && fetchStatusArray('En camino').length == 0" />
      <img src="@/assets/Status/SecondCheck.svg"
        v-if="fetchStatusArray('En camino').length > 0 && fetchStatusArray('Aceptado').length == 0" />
      <img src="@/assets/Status/AllCheck.svg" v-if="fetchStatusArray('Aceptado').length > 0" />

      <div class="deliver-cards grid gap-3 w-full">
        <div class="bg-yellow-100 text-left px-4 py-3 rounded-md grid gap-1" v-if="order.modo_pago == 'Modo Garantía'">
          <h2 class="text-md text-gray-700">Pago en garantía de ${{ ((order.precio * order.condicion_cantidad) *
            (order.porcentaje_inicial / 100)).toFixed(2) }}</h2>
          <p class="text-sm text-gray-600" v-if="warranty">{{
            formatDateTime(warranty.fecha).orderDate
          }} {{
              formatDateTime(warranty.fecha).time
            }}</p>
          <p v-else class="text-sm text-gray-600">
            Aun se ha realizado el pago de garantía.
          </p>
        </div>
        <div class="bg-yellow-100 text-left px-4 py-3 rounded-md grid gap-1" v-else>
          <h2 class="text-md text-gray-700">{{ order.modo_pago }} de ${{ (order.precio * order.condicion_cantidad) }}
          </h2>
          <p class="text-sm text-gray-600">
            El pago se acuerda con el vendedor.
          </p>
        </div>
        <div class="bg-gray-200 text-left px-4 py-3 rounded-md grid gap-1">
          <h2 class="text-md text-gray-700">Pendiente de entrega</h2>
          <p class="text-sm text-gray-600" v-if="fetchStatusArray('Pendiente de entrega').length > 0">{{
            formatDateTime(fetchStatusArray('Pendiente de entrega')[0].fecha).orderDate
          }} {{
              formatDateTime(fetchStatusArray('Pendiente de entrega')[0].fecha).time
            }}</p>
          <p v-else class="text-sm text-gray-600">
            La orden no se encuentra pendiente de entrega.
          </p>
        </div>
        <div class="bg-blue-100 text-left px-4 py-3 rounded-md grid gap-1">
          <h2 class="text-md text-gray-700">En camino</h2>
          <p class="text-sm text-gray-600" v-if="fetchStatusArray('En camino').length > 0">{{
            formatDateTime(fetchStatusArray('En camino')[0].fecha).orderDate
          }} {{
              formatDateTime(fetchStatusArray('En camino')[0].fecha).time
            }}</p>
          <p v-else class="text-sm text-gray-600">
            La orden no se encuentra en camino.
          </p>
        </div>

        <!--Recibido-->
        <div class="bg-blue-200 text-left px-4 py-3 rounded-md grid gap-1"
          v-if="fetchStatusArray('Recibido').length > 0 && fetchStatusArray('Aceptado').length == 0 && fetchStatusArray('Rechazado').length == 0">
          <h2 class="text-md text-gray-700">Recibido</h2>
          <p class="text-sm text-gray-600">{{
            formatDateTime(fetchStatusArray('Recibido')[0].fecha).orderDate
          }} {{
              formatDateTime(fetchStatusArray('Recibido')[0].fecha).time
            }}</p>
        </div>
        <div class="bg-blue-200 text-left px-4 py-3 rounded-md grid gap-1"
          v-if="fetchStatusArray('Aceptado').length > 0">
          <h2 class="text-md text-gray-700">Recibido Aceptado</h2>
          <p class="text-sm text-gray-600">{{
            formatDateTime(fetchStatusArray('Aceptado')[0].fecha).orderDate
          }} {{
              formatDateTime(fetchStatusArray('Aceptado')[0].fecha).time
            }}</p>
        </div>
        <div class="bg-red-200 text-left px-4 py-3 rounded-md grid gap-1"
          v-if="fetchStatusArray('Rechazado').length > 0">
          <h2 class="text-md text-gray-700">{{ fetchStatusArray('Rechazado')[0].motivo }}</h2>
          <p class="text-sm text-gray-600">{{
            formatDateTime(fetchStatusArray('Rechazado')[0].fecha).orderDate
          }} {{
              formatDateTime(fetchStatusArray('Rechazado')[0].fecha).time
            }}</p>
        </div>
        <div class="bg-orange-200 text-left px-4 py-3 rounded-md grid gap-1"
          v-if="fetchStatusArray('Recibido').length == 0 && fetchStatusArray('Rechazado').length == 0 && fetchStatusArray('Revision').length > 0">
          <h2 class="text-md text-gray-700">En revisión</h2>
          <p class="text-sm text-gray-600" v-if="fetchStatusArray('Revision').length > 0">{{
            formatDateTime(statuses.filter(status => status.estado == 'Revision')[0].fecha).orderDate
          }} {{
              formatDateTime(statuses.filter(status => status.estado == 'Revision')[0].fecha).time
            }}</p>
          <p v-else class="text-sm text-gray-600">
            Aun se esta evaluando la orden
          </p>
        </div>
        <div class="bg-green-200 text-left px-4 py-3 rounded-md grid gap-1"
          v-if="fetchStatusArray('Recibido').length == 0 && fetchStatusArray('Aceptado').length == 0 && fetchStatusArray('Rechazado').length == 0 && fetchStatusArray('Entregada').length == 0 && fetchStatusArray('Revision').length == 0">
          <h2 class="text-md text-gray-700">En espera</h2>
          <p class="text-sm text-gray-600" v-if="fetchStatusArray('En espera').length > 0">{{
            formatDateTime(statuses.filter(status => status.estado == 'En espera')[0].fecha).orderDate
          }} {{
              formatDateTime(statuses.filter(status => status.estado == 'En espera')[0].fecha).time
            }}</p>
          <p v-else class="text-sm text-gray-600">
            Aun no has recibido la orden.
          </p>
        </div>
        <div class="bg-green-200 text-left px-4 py-3 rounded-md grid gap-1"
          v-if="fetchStatusArray('Aceptado').length == 0 && fetchStatusArray('Rechazado').length == 0 && fetchStatusArray('Entregada').length > 0 && fetchStatusArray('Revision').length == 0">
          <h2 class="text-md text-gray-700">Entregada</h2>
          <p class="text-sm text-gray-600" v-if="fetchStatusArray('Entregada').length > 0">{{
            formatDateTime(statuses.filter(status => status.estado == 'Entregada')[0].fecha).orderDate
          }} {{
              formatDateTime(statuses.filter(status => status.estado == 'Entregada')[0].fecha).time
            }}</p>
          <p v-else class="text-sm text-gray-600">
            Aun no has recibido la orden
          </p>
        </div>
      </div>
    </div>

    <div class="buttons inline-flex mx-auto w-full gap-3 justify-between md:w-3/4">
      <button
        v-if="fetchStatusArray('Recibido').length > 0 && !fetchStatusArray('Rechazado').length > 0 && !fetchStatusArray('Aceptado').length > 0"
        @click="manageFeesModal" class="default-bar p-2 text-center w-full text-white font-bold rounded-lg">
        Aceptado por calidad
      </button>
      <button
        v-if="fetchStatusArray('Recibido').length > 0 && !fetchStatusArray('Rechazado').length > 0 && !fetchStatusArray('Aceptado').length > 0"
        class="bg-red-400 p-2 text-center w-full text-white font-bold rounded-lg"
        @click="manageRejectRatingModal('Rechazado por calidad')">
        Rechazado por calidad
      </button>
      <button v-if="fetchStatusArray('Recibido').length == 0" @click="showModal"
        class="default-bar p-2 text-center w-full text-white font-bold rounded-lg">
        Recibir
      </button>
      <button v-if="fetchStatusArray('Recibido').length == 0"
        class="bg-gray-400 p-2 text-center w-full text-white font-bold rounded-lg" @click="manageWaitingModal">
        Esperar
      </button>
      <button v-if="fetchStatusArray('Recibido').length == 0"
        class="bg-red-400 p-2 text-center w-full text-white font-bold rounded-lg"
        @click="manageRejectRatingModal('Nunca llegó')">
        No llegó
      </button>
    </div>

    <div class="deliver-data grid gap-4 mt-3" @click="showEmbed">
      <h1 class="text-sm text-gray-700 font-bold">Lugar de entrega:</h1>
      <div class="flex gap-2 items-center">
        <span class="flex bg-blue-100 rounded-full h-10 w-10 items-center justify-center">
          <img src="@/assets/Status/Location.svg" alt="StatusBar" class="self-center" />
        </span>
        <p class="text-gray-600 text-xs w-3/4" v-if="order">
          {{ order.ubicacion_google_maps }}
        </p>
      </div>

      <hr />
    </div>

    <div class="embed-data grid mb-6 mt-2" v-if="embed">
      <iframe class="rounded-md shadow-sm"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d592.6469091181473!2d-79.90415112891621!3d-2.2149872566503324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d13cbe855805f%3A0x8015a492f4fca473!2sGuayaquil%2C%20Ecuador!5e0!3m2!1ses-419!2sar!4v1698694785560!5m2!1ses-419!2sar"
        width="100%" height="300" style="border: 0" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <div class="deliver-price grid gap-3" v-if="order">
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">ID</p>
        <p class="text-sm text-gray-700 text-right">#{{ order.id.slice(0, 8) }}</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">ID Negociación</p>
        <p class="text-sm text-gray-700 text-right">#{{ order.id_negociacion.slice(0, 8) }}</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">Producto</p>
        <p class="text-sm text-gray-700 text-right">{{ order.producto }}</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">Vendedor</p>
        <p class="text-sm text-gray-700 text-right">{{ order.vendedor_nombre }} {{ order.vendedor_apellido }}</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">Precio</p>
        <p class="text-sm text-gray-700 text-right">${{ order.precio }}</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">Cantidad Negociada</p>
        <p class="text-sm text-gray-700 text-right">{{ order.condicion_cantidad }}</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-700 text-left">Cantidad Recibida</p>
        <p class="text-sm text-gray-700 text-right">{{ order.cantidad_recibida }}</p>
      </div>
      <div class="grid grid-cols-2">
        <p class="text-sm text-gray-800 text-left font-bold">Total</p>
        <p class="text-sm text-gray-800 text-right font-bold">${{ order.condicion_cantidad * order.precio }}</p>
      </div>
    </div>
  </div>

  <CondicionesOferta v-if="condiciones" :delivery="order"></CondicionesOferta>

  <!-- Alert Modal -->
  <CModal alignment="center" :visible="delivered" @close="closeModal">
    <CModalBody>
      <div class="grid w-full mx-auto gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
        <h2 class="text-center text-md font-bold text-gray-500 w-3/5 mx-auto">
          Cantidad recibida
        </h2>
        <div class="flex flex-col w-full gap-3 mx-auto">
          <input type="number" placeholder="Cantidad" v-model="receivedQuantity"
            class="bg-transparent p-3 rounded-lg border-2 text-gray-500 border-gray-200" />
          <button class="default-bar text-white text-center p-2 rounded-md shadow" @click="setOrderReceivedStatus">
            Enviar
          </button>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <!-- Feedback Modal -->

  <!-- Fee Modal -->
  <CModal alignment="center" :visible="fees" @close="manageFeesModal">
    <CModalBody>
      <div class="grid w-full gap-2 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="manageFeesModal" class="justify-self-end" />
        <h2 class="mt-3 text-center text-md font-bold text-gray-900 w-3/5 mx-auto">
          Cobro de fee de Agroec
        </h2>
        <div class="flex gap-3 w-5/6 mx-auto justify-center">
          <p class="text-center text-gray-700">
            Se efectuará el cobro del 1.5%
          </p>
        </div>

        <button @click="payFee" v-if="!paymentWaiting"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-3/5 rounded-md">
          Pagar
        </button>
        <button v-if="paymentWaiting"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-3/5 rounded-md">
          <div style="border-top-color:transparent"
            class="w-8 h-8 mx-auto border-4 border-white-400 border-solid rounded-full animate-spin"></div>
        </button>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="garantia" @close="manageWarrantyModal">
    <CModalBody>
      <div class="grid w-full gap-2 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="manageWarrantyModal" class="justify-self-end" />
        <h2 class="mt-3 text-center text-md font-bold text-gray-900 w-3/5 mx-auto">
          Realizar pago garantía
        </h2>
        <div class="gap-1 mx-auto grid">
          <p class="text-center text-gray-700">
            Se efectuará el cobro del {{ order.porcentaje_inicial }}%
          </p>
          <h1 class="text-center text-gray-700 font-bold text-xl">
            Total <span class="text-lime-500 font-bold">$</span>{{ ((order.precio * order.condicion_cantidad) *
              (order.porcentaje_inicial / 100)).toFixed(2) }}
          </h1>
          <select name="paymentMethod" id="paymentMethod" v-model="warrantyPaymentMethod"
            class="bg-transparent p-2 h-12 border-2 rounded-md w-auto text-gray-700">
            <option value="TRANSFERENCIA">Transferencia Bancaria</option>
            <option value="TD/TC">TD/TC</option>
          </select>

          <div class="grid gap-1 mx-auto mt-3 w-full" v-if="warrantyPaymentMethod == 'TRANSFERENCIA'">
            <label for="garantia" class="text-gray-700">Transferencia Bancaria</label>
            <li class="text-gray-700">Numero Cuenta: 0000005721192722</li>
            <li class="text-gray-700">Banco: Banco A</li>
            <li class="text-gray-700">
              Contacta con área financiera vía WhatsApp
              <a href="wa.link/10nq8r" class="font-bold" target="_blank">+593 96 319 5377</a>
            </li>
          </div>

          <div class="form-input grid gap-1 mt-2" v-if="warrantyPaymentMethod == 'TD/TC'">
            <label for="tarjeta" class="text-gray-600 font-bold w-5/6">Elige una tarjeta</label>
            <select name="tarjeta" v-model="identificador" id="tarjeta"
              class="bg-transparent p-2 h-12 border-2 rounded-md w-auto text-gray-700">
              <option v-for="card in cards" :key="card.identifier" :value="card.identifier">{{
                String(card.card_brand).toUpperCase() }} - {{ card.number.slice(0, 4) }} {{ card.number.slice(4, 8) }}
              </option>
            </select>
          </div>

          <div class="form-input grid gap-1" v-if="warrantyPaymentMethod == 'TD/TC'">
            <label for="documento" class="text-gray-600 font-bold w-5/6">Confirma el numero de documento</label>
            <input type="number" id="documento" v-model="documento" placeholder="El mismo que el de la tarjeta"
              class="bg-transparent p-2 h-12 border-2 rounded-md w-auto text-gray-700" />
          </div>
        </div>
        <button @click="payWarranty" v-if="!paymentWaiting && warrantyPaymentMethod == 'TD/TC'"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-1/2 rounded-md">
          Pagar
        </button>
        <button v-if="paymentWaiting"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-1/2 rounded-md">
          <div style="border-top-color:transparent"
            class="w-8 h-8 mx-auto border-4 border-white-400 border-solid rounded-full animate-spin"></div>
        </button>
      </div>
    </CModalBody>
  </CModal>

  <!-- Waiting Modal -->
  <CModal alignment="center" :visible="waiting" @close="manageWaitingModal">
    <CModalBody>
      <div class="grid w-full gap-2 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="manageWaitingModal" class="justify-self-end" />
        <h2 class="mt-3 text-center text-md font-bold text-gray-900 w-3/5 mx-auto">
          Tiempo de Espera
        </h2>
        <div class="grid gap-3 w-11/12 mx-auto">
          <p class="text-center text-gray-700">Tienes un maximo de tres dias</p>
          <input type="date" id="datePicker" v-model="selectedDate" :max="maxDate" :min="order.fecha_entrega"
            class="h-12 p-2 w-full rounded-md border-2 border-gray-300 text-gray-600 bg-transparent" />>
        </div>
        <button @click="setDeliveryRevisionTime"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-3/5 rounded-md">
          Actualizar
        </button>
      </div>
    </CModalBody>
  </CModal>

  <!-- Reseña Modal -->
  <CModal alignment="center" :visible="calificar" @close="manageCalificacionModal">
    <CModalBody>
      <div class="grid w-full gap-2 pb-3">
        <h2 class="mt-3 text-center text-md font-bold text-gray-900 w-3/5 mx-auto">
          Porfavor califica al vendedor
        </h2>
        <h3 class="text-center text-gray-700 font-bold text-sm">
          {{ value }}.0
        </h3>
        <div class="flex gap-3 w-5/6 mx-auto justify-center" v-if="value == 0">
          <img src="@/assets/Calificar/GrayStar.svg" class="h-6 w-6" @click="calify(1)" />
          <img src="@/assets/Calificar/GrayStar.svg" class="h-6 w-6" @click="calify(2)" />
          <img src="@/assets/Calificar/GrayStar.svg" class="h-6 w-6" @click="calify(3)" />
          <img src="@/assets/Calificar/GrayStar.svg" class="h-6 w-6" @click="calify(4)" />
          <img src="@/assets/Calificar/GrayStar.svg" class="h-6 w-6" @click="calify(5)" />
        </div>
        <Calify :value="value" v-if="value >= 1" @update:value="updateCalification"></Calify>

        <button @click="sendQualification"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-3/5 rounded-md">
          Enviar
        </button>
      </div>
    </CModalBody>
  </CModal>
  <!-- Reseña Modal -->
  <CModal alignment="center" :visible="rejectModal" @close="manageRejectRatingModal('')">
    <CModalBody>
      <div class="grid w-full gap-2 pb-3">
        <h2 class="mt-3 text-center text-md font-bold text-gray-900 w-3/5 mx-auto">
          Porfavor califica al vendedor
        </h2>
        <h3 class="text-center text-gray-700 font-bold text-sm">
          {{ value }}.0
        </h3>
        <div class="flex gap-3 w-5/6 mx-auto justify-center" v-if="value == 0">
          <img src="@/assets/Calificar/GrayStar.svg" class="h-6 w-6" @click="calify(1)" />
          <img src="@/assets/Calificar/GrayStar.svg" class="h-6 w-6" @click="calify(2)" />
          <img src="@/assets/Calificar/GrayStar.svg" class="h-6 w-6" @click="calify(3)" />
          <img src="@/assets/Calificar/GrayStar.svg" class="h-6 w-6" @click="calify(4)" />
          <img src="@/assets/Calificar/GrayStar.svg" class="h-6 w-6" @click="calify(5)" />
        </div>
        <Calify :value="value" v-if="value >= 1" @update:value="updateCalification"></Calify>

        <button @click="sendRejectQualification"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-3/5 rounded-md">
          Enviar
        </button>
      </div>
    </CModalBody>
  </CModal>
  <CModal alignment="center" :visible="politicasModal" @close="managePoliticas">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="managePoliticas" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Politicas
        </h2>
        <div class="mx-auto text-left max-h-52 overflow-y-scroll">
          <p class="text-gray-700 text-sm w-3/4 mx-auto" v-if="order">
            {{ order.politicas_recepcion }}
          </p>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<script>
import { CModal, CModalBody } from "@coreui/vue";
import Calify from "@/components/Calify.vue";
import CondicionesOferta from './CondicionesOferta.vue';
import { emitAlert } from "@/libs/alert.js";
import * as orderService from '../services/order.service.js';
import * as walletService from '../services/wallet.service.js'
import * as qualificationService from '../services/qualification.service.js';
import { formatDateTime } from "@/libs/date.js";
import Event from '@/libs/event';
export default {
  components: {
    CondicionesOferta,
    CModal,
    Calify,
    CModalBody,
  },
  data() {
    return {
      delivered: false,
      esperando: true,
      calificar: false,
      embed: false,
      fees: false,
      feesPaid: false,
      selectedDate: "",
      value: 0,
      maxDate: "",
      garantia: false,
      condiciones: false,
      politicasModal: false,
      receivedQuantity: 0,
      fee: null,
      order: null,
      statuses: [],
      warranty: null,
      waiting: false,
      rejectModal: false,
      rejectReason: "",
      paymentWaiting: false,
      warrantyPaymentMethod: "TD/TC",
      cards: [],
      identificador: "",
      documento: 0
    };
  },

  async created() {
    Event.on('openPoliticas', this.managePoliticas)
    Event.on('closeDatos', this.manageCondicionesPage);
    await this.getOrderById();
  },
  watch: {
    '$route.params.identifier': async function () {
      if (this.$route.params.identifier == undefined || this.$route.params.name != undefined) {
        return;
      }
      Event.on('openPoliticas', this.managePoliticas);
      Event.on('closeDatos', this.manageCondicionesPage);
      await this.getOrderById();
    }
  },
  methods: {
    async getWalletCards() {
      try {
        const { cardsInfo } = await walletService.getWalletCards();
        this.cards = cardsInfo;
      } catch (error) {
        this.permissionError.enabled = true;
        this.permissionError = error;
        return emitAlert(error, 'error');
      }
    },
    async getOrderById() {
      try {
        const { order, statuses, warranty, fee } = await orderService.getOrderById(this.$route.params.identifier);
        this.order = order;
        this.warranty = warranty;
        if (!warranty) {
          await this.getWalletCards();
        }
        this.statuses = statuses;
        this.fee = fee;
        if (fee) {
          this.feesPaid = true;
        }
        this.setThreeDaysLimit();
        Event.emit('chat-id', { chat: this.order.id_chat, product: this.order.producto });
      } catch (error) {
        return emitAlert(error, "error");
      }
    },
    formatDateTime(x) {
      return formatDateTime(x);
    },
    manageCondicionesPage() {
      this.condiciones = !this.condiciones
    },
    managePoliticas() {
      this.politicasModal = !this.politicasModal
    },
    manageWarrantyModal() {
      this.garantia = !this.garantia;
    },
    fetchStatusArray(filter) {
      return this.statuses.filter(status => status.estado == filter)
    },
    async sendRejectQualification() {
      try {
        await orderService.setOrderRejectedStatus(this.order.id, this.rejectReason);
        const { message } = await qualificationService.sendQualification(this.$route.params.identifier, { id_calificado: this.order.id_vendedor, puntaje: this.value });
        emitAlert(message, 'success');
        await this.getOrderById();
        return this.manageRejectRatingModal();
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    async sendQualification() {
      try {
        await qualificationService.sendQualification(this.$route.params.identifier, { id_calificado: this.order.id_vendedor, puntaje: this.value });
        this.manageCalificacionModal();
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    async payFee() {
      try {
        const feeAmount = (this.order.precio * this.order.cantidad) * (1.5 / 100)
        const { message } = await orderService.payFee(this.order.id_entrega, feeAmount);
        this.feesPaid;
        emitAlert(message, 'success');
        await this.getOrderById();
        return this.manageFeesModal();
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    async payWarranty() {
      try {
        this.paymentWaiting = true;
        const { message } = await orderService.payWarranty(this.order.id_negociacion, this.order.id, this.warrantyPaymentMethod, this.identificador, this.documento);
        emitAlert(message, 'success');
        await this.getOrderById();
        this.manageWarrantyModal();
        this.paymentWaiting = false;
      } catch (error) {
        console.log('API ERROR: Error al realizar el pago.')
      }
    },
    async setOrderReceivedStatus() {
      try {
        const { message } = await orderService.setOrderReceivedStatus(this.order.id, this.receivedQuantity);
        emitAlert(message, 'success');
        await this.getOrderById();
        return this.closeModal();
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    async setOrderRejectedStatus() {
      try {
        return await orderService.setOrderRejectedStatus(this.order.id, this.rejectReason);
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    async setDeliveryRevisionTime() {
      try {
        const { message } = await orderService.setDeliveryRevisionTime(this.order.id, this.selectedDate);
        emitAlert(message, 'success');
        await this.getOrderById();
        return this.manageWaitingModal();
      } catch (error) {
        return emitAlert(error, 'error');
      }
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
    manageWaitingModal() {
      this.waiting = !this.waiting;
    },
    manageCalificacionModal() {
      this.calificar = !this.calificar;
    },
    manageRejectRatingModal(state) {
      this.rejectReason = state;
      this.rejectModal = !this.rejectModal;
    },
    manageFeesModal() {
      if (this.feesPaid) {
        this.esperando = false;
        this.closeModal();
        this.fees = false;
        this.manageCalificacionModal();
        return;
      }
      this.fees = !this.fees;
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
      if (!this.order) {
        return;
      }
      const maxDate = new Date(this.order.fecha_entrega);
      maxDate.setDate(maxDate.getDate() + 3);

      // Formatear la fecha límite y minima como "YYYY-MM-DD"
      this.order.fecha_entrega = new Date(this.order.fecha_entrega).toISOString().split("T")[0];
      const maxDateString = maxDate.toISOString().split("T")[0];

      // Establecer la fecha límite como la máxima permitida para el input de fecha
      this.maxDate = maxDateString;
    },
  },
};
</script>
