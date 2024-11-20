<template>
  <div class="grid w-full gap-3 md:w-3/4 mx-auto">
    <div class="mx-auto md:grid md:grid-cols-2 w-11/12 md:w-3/4 gap-2">
      <p class="text-gray-700 text-sm mx-auto col-span-2">
        Puedes confirmar los datos o indicar detalles para recibir tu compra.
      </p>

      <h3 class="text-gray-700 text-sm mt-3 col-span-2">
        Producto:
        <span class="text-gray-600 font-bold">{{
          this.$route.params.name
        }}</span>
      </h3>

      <div class="grid gap-1 mx-auto mt-3 col-span-2 w-full">
        <label for="precio" class="text-gray-700">Precio</label>
        <input type="number" id="precio" v-model="conditions.precio" placeholder="Precio"
          class="bg-gray-50 border p-2 rounded-md text-gray-600" />
        <select name="unidadPrecio" v-model="conditions.precio_unidad"
          class="w-full mx-auto bg-gray-50 border rounded-md p-2 text-gray-600">
          <option selected class="text-gray-600">QQ</option>
          <option class="text-gray-600">KG</option>
        </select>
      </div>

      <div class="grid gap-2 mt-2 md:grid-cols-2 col-span-2">
        <div class="grid gap-1 w-full">
          <label for="cantidad" class="text-gray-700">Cantidad</label>
          <div class="grid grid-cols-2 gap-1">
            <input type="number" id="cantidad" placeholder="Cantidad" v-model="conditions.cantidad" @change="changeQuantity"
              class="bg-gray-50 border p-2 rounded-md text-gray-600" />
            <select name="unidad" v-model="conditions.cantidad_unidad"
              class="w-full bg-gray-50 border rounded-md p-2 text-gray-600">
              <option selected class="text-gray-600">QQ</option>
              <option class="text-gray-600">KG</option>
            </select>
          </div>
        </div>
        <div class="grid gap-1 w-full">
          <label for="cantidadEntrega" class="text-gray-700">Programe su número de entregas</label>
          <div class="inline-flex justify-between gap-2">
            <input type="text" id="cantidadEntrega" v-model="cantidadEntrega" placeholder="Cantidad"
              class="bg-gray-50 border p-2 rounded-md text-gray-600 w-full" />
            <button @click="addNewEntregas"
              class="default-bar text-white font-bold grid items-center h-12 p-2 rounded-md">
              +
            </button>
          </div>
        </div>
      </div>

      <div class="grid my-2 col-span-2" v-if="deliveries.length > 0">
        <h1 class="text-gray-600 mb-3 font-bold">Entregas programadas</h1>

        <p class="text-gray-500 flex gap-3 items-center" v-for="(item, index) in deliveries" :key="index">
          <svg xmlns="http://www.w3.org/2000/svg" height="18" fill="#a2afbe" viewBox="0 -960 960 960" width="18">
            <path d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z" />
          </svg>
          <span class="grid gap-1">
            {{ index + startIndex }}: {{ Number(item.cantidad).toFixed(0) }}
            {{ item.cantidad_unidad }}, {{ (item.fecha_entrega != undefined) ? formatDateTime(item.fecha_entrega).formattedDate : "Definir fecha" }} -
            {{ (item.hora_entrega != undefined) ? item.hora_entrega : "Definir horario" }} -
            {{ item.punto.direccion }}, {{ item.punto.ubicacion_google_maps }}
          </span>

          <button type="button" v-on:click="editEntrega(item, index)">
            <svg width="24" height="24" viewBox="0 0 13 13" fill="#000000" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.4606 0.585786C12.2417 1.36684 12.2417 2.63316 11.4606 3.41421L4.07415 10.8007C3.75375 11.1211 3.3523 11.3484 2.91272 11.4583L0.621723 12.031C0.255533 12.1226 -0.0761638 11.7909 0.0153838 11.4247L0.588134 9.13367C0.698029 8.69409 0.925326 8.29264 1.24572 7.97225L8.63218 0.585786C9.41323 -0.195262 10.6796 -0.195262 11.4606 0.585786ZM7.925 2.707L1.95283 8.67935C1.76059 8.87159 1.62421 9.11246 1.55828 9.37621L1.18764 10.8588L2.67019 10.4881C2.93394 10.4222 3.1748 10.2858 3.36704 10.0936L9.339 4.121L7.925 2.707ZM9.33929 1.29289L8.632 2L10.046 3.414L10.7535 2.70711C11.144 2.31658 11.144 1.68342 10.7535 1.29289C10.363 0.902369 9.72981 0.902369 9.33929 1.29289Z"
                fill="rgb(75 85 99)" />
            </svg>
          </button>
          <button type="button" v-on:click="deleteDelivery(item)">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#E87C61">
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </p>
      </div>

      <div class="grid relative mt-3 col-span-2">
        <div class="inline-flex gap-2 w-full items-center">
          <label for="" class="text-gray-700 w-full">Agregar Parámetros de Calidad</label>
          <button type="button" class="default-bar h-10 p-2 text-white font-bold rounded-md" @click="newParametro">
            +
          </button>
        </div>
        <div class="grid grid-cols-3 gap-1 mt-2">
          <div class="grid gap-1 w-full items-center">
            <label for="nombreParametro" class="text-gray-700 w-full">Nombre</label>
            <input v-model="quality_param.nombre" id="nombreParametro" placeholder="Nombre" type="text"
              class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
          </div>
          <div class="grid gap-1 w-full items-center">
            <label for="minParametro" class="text-gray-700 w-full">Min</label>
            <input v-model="quality_param.min" placeholder="2%" id="minParametro" type="text"
              class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
          </div>
          <div class="grid gap-1 w-full items-center">
            <label for="maxParametro" class="text-gray-700 w-full">Max</label>
            <input v-model="quality_param.max" placeholder="No Max" id="maxParametro" type="text"
              class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
          </div>
        </div>
      </div>


      <div class="grid gap-1 mx-auto mt-2" v-if="quality_params.length > 0">
        <h1 class="text-gray-700 mb-3">Parámetros Agregados</h1>

        <p class="text-gray-600 flex gap-3 items-center" v-for="(item, index) in quality_params" :key="index">
          <svg xmlns="http://www.w3.org/2000/svg" height="18" fill="#a2afbe" viewBox="0 -960 960 960" width="18">
            <path d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z" />
          </svg>
          {{ item.nombre }}, Min: {{ item.min }}%, Max: {{ item.max }}%

          <button type="button" v-on:click="editParametro(item, index)">
            <svg width="24" height="24" viewBox="0 0 13 13" fill="#000000" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.4606 0.585786C12.2417 1.36684 12.2417 2.63316 11.4606 3.41421L4.07415 10.8007C3.75375 11.1211 3.3523 11.3484 2.91272 11.4583L0.621723 12.031C0.255533 12.1226 -0.0761638 11.7909 0.0153838 11.4247L0.588134 9.13367C0.698029 8.69409 0.925326 8.29264 1.24572 7.97225L8.63218 0.585786C9.41323 -0.195262 10.6796 -0.195262 11.4606 0.585786ZM7.925 2.707L1.95283 8.67935C1.76059 8.87159 1.62421 9.11246 1.55828 9.37621L1.18764 10.8588L2.67019 10.4881C2.93394 10.4222 3.1748 10.2858 3.36704 10.0936L9.339 4.121L7.925 2.707ZM9.33929 1.29289L8.632 2L10.046 3.414L10.7535 2.70711C11.144 2.31658 11.144 1.68342 10.7535 1.29289C10.363 0.902369 9.72981 0.902369 9.33929 1.29289Z"
                fill="rgb(75 85 99)" />
            </svg>
          </button>
          <button type="button" v-on:click="deleteParam(item)">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#E87C61">
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </p>
      </div>

      <div class="grid gap-1 mx-auto col-span-2 w-full mt-3">
        <label for="recepcion" class="text-gray-700 text-sm">Politicas de recepción</label>
        <textarea type="text" rows="5" v-model="conditions.politicas_recepcion" disabled
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum orci ligula. Proin eget lorem justo. Donec sodales urna vel imperdiet accumsan. Ut dignissim ipsum et condimentum placerat. Aenean porttitor tellus purus, a feugiat nibh faucibus et. Praesent quam tellus, rutrum at vehicula quis, condimentum nec tellus. Mauris quis aliquet orci. Nulla condimentum dapibus metus, vel faucibus mauris dignissim ut.

Aliquam pretium libero in quam gravida, sed ornare eros efficitur. Nam vitae mattis est. Vivamus ornare metus eu neque auctor hendrerit. Sed tincidunt nisi et porta imperdiet. Donec sagittis turpis felis, et imperdiet neque viverra at. Duis nisl purus, congue sed lacus sit amet, pellentesque ullamcorper mauris. Quisque laoreet, odio eu pretium euismod, tortor nisi scelerisque orci, a malesuada augue diam in dolor. Cras nec sagittis sem, vel imperdiet tellus. Proin gravida quis nisi vitae fringilla. Cras feugiat sapien mi, vel mattis augue hendrerit non. Morbi efficitur at leo vel scelerisque. Duis turpis ligula, ultrices in mollis et, faucibus non neque. Nunc sed nisl in arcu vulputate vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus eleifend laoreet. Donec aliquet placerat vulputate."
          cols="20" id="recepcion" class="bg-gray-50 border p-2 rounded-md text-gray-600"></textarea>
        <button class="text-gray-700 font-bold" @click="managePoliticas">
          Ver todo
        </button>
      </div>

      <div class="grid gap-1 mx-auto mt-3 col-span-2 w-full">
        <label for="modoPago" class="text-gray-700">Modo de pago</label>
        <select name="modoPago" v-model="conditions.modo_pago"
          class="w-full mx-auto bg-gray-50 border rounded-md p-2 text-gray-600">
          <option selected class="text-gray-600" value="0" disabled>
            Modo de pago
          </option>
          <option class="text-gray-600" value="Modo Garantía">Modo Garantía</option>
          <option class="text-gray-600" value="Pago en sitio">Pago en sitio</option>
          <option class="text-gray-600" value="Pago a credito">Pago a credito</option>
        </select>
      </div>

      <div class="grid gap-1 mx-auto mt-3 col-span-2 w-full" v-if="conditions.modo_pago == 'Modo Garantía'">
        <label for="garantiaInicial" class="text-gray-700">Porcentaje inicial</label>
        <input type="number" v-model="conditions.porcentaje_inicial" id="garantiaInicial"
          @change="managePercetangeInitial" class="bg-gray-50 border p-2 rounded-md text-gray-600" />
      </div>

      <div class="grid gap-1 mx-auto mt-3 col-span-2 w-full" v-if="conditions.modo_pago == 'Modo Garantía'">
        <label for="modoPago" class="text-gray-700">Modo de pago porcentaje final</label>
        <select name="modoPago" v-model="conditions.modo_pago_final"
          class="w-full mx-auto bg-gray-50 border rounded-md p-2 text-gray-600">
          <option selected class="text-gray-600" value="" disabled>
            Modo de pago
          </option>
          <option class="text-gray-600" value="Pago en sitio">Pago en sitio</option>
          <option class="text-gray-600" value="Pago a credito">Pago a credito</option>
        </select>
      </div>

      <div class="grid gap-1 mx-auto mt-3 col-span-2 w-full" v-if="conditions.modo_pago == 'Modo Garantía'">
        <label for="garantiaFinal" class="text-gray-700">Porcentaje final</label>
        <input type="number" v-model="conditions.porcentaje_final" id="garantiaFinal" @change="managePercetangeFinal"
          class="bg-gray-50 border p-2 rounded-md text-gray-600" />
      </div>

      <div class="grid gap-1 mx-auto mt-3 col-span-2 w-full">
        <label for="notas" class="text-gray-700">Notas</label>
        <textarea cols="20" rows="3" v-model="conditions.notas" id="notas"
          class="bg-gray-50 border p-2 rounded-md text-gray-600"></textarea>
      </div>

      <div class="inline-flex justify-between mx-auto mt-3 col-span-2 w-11/12">
        <label for="domicilio" class="text-gray-700 text-sm">Precio es puesto en domicilio del cliente</label>
        <input type="checkbox" id="domicilio" v-model="conditions.precio_puesto_domicilio" />
      </div>
    </div>

    <button class="default-bar h-12 p-2 rounded-md text-center text-white font-bold w-11/12 md:w-1/2 mx-auto"
            @click="backToChat">
            Regresar a la conversación
          </button>
    <button @click="updateCondition"
      class="default-bar h-12 p-2 rounded-md text-center text-white font-bold w-11/12 md:w-1/2 mx-auto">
      Actualizar
    </button>

  </div>


  <CModal alignment="center" :visible="politicasModal" @close="managePoliticas">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="managePoliticas" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Tus politicas
        </h2>
        <div class="mx-auto text-left max-h-52 overflow-y-scroll">
          <p class="text-gray-700 text-sm w-3/4 mx-auto">
            {{ conditions.politicas_recepcion }}
          </p>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="editParam" @close="manageEditParamModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="manageEditParamModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Editar Parametro
        </h2>
        <div class="mx-auto text-center">
          <div class="grid grid-cols-3 gap-1 mx-auto mt-2">
            <div class="grid gap-1 w-full items-center">
              <label for="nombreParametro" class="text-gray-700 w-full">Nombre</label>
              <input v-model="quality_param.nombre" id="nombreParametro" placeholder="Nombre" type="text"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
            </div>
            <div class="grid gap-1 w-full items-center">
              <label for="minParametro" class="text-gray-700 w-full">Min</label>
              <input v-model="quality_param.min" placeholder="2%" id="minParametro" type="text"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
            </div>
            <div class="grid gap-1 w-full items-center">
              <label for="maxParametro" class="text-gray-700 w-full">Max</label>
              <input v-model="quality_param.max" placeholder="No Max" id="maxParametro" type="text"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
            </div>
          </div>

          <button class="default-bar p-2 text-center text-white font-bold rounded-lg mt-2 w-full"
            @click="saveEditParam">
            Guardar
          </button>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="editEntregaModal" @close="manageEditEntregaModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="manageEditEntregaModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Editar Entrega
        </h2>
        <div class="mx-auto text-center">
          <div class="grid grid-cols-2 gap-2 mx-auto mt-2">
            <div class="grid gap-1 w-full items-center">
              <label for="cantidadPerEntrega" class="text-gray-700 w-full">Cantidad</label>
              <input v-model="delivery.cantidad" id="cantidadPerEntrega" placeholder="Nombre" type="number"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
            </div>
            <div class="grid gap-1 w-full items-center">
              <label for="unidadEntrega" class="text-gray-700 w-full">Unidad Entrega</label>
              <select name="unidadEntrega" v-model="delivery.cantidad_unidad"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
                <option selected class="text-gray-600" option="QQ">QQ</option>
                <option class="text-gray-600" option="KG">KG</option>
              </select>
            </div>
            <div class="grid gap-1 items-center">
              <label for="entregaFecha" class="text-gray-700 w-full">Fecha Entrega</label>
              <input v-model="delivery.fecha_entrega" id="entregaFecha" type="date" :min="today"
                class="bg-transparent border-2 border-gray-300 xs:px-1 px-2 py-3 rounded-md text-gray-600" />
            </div>
            <div class="grid gap-1 w-full items-center">
              <label for="horaEntrega" class="text-gray-700 w-full">Hora Entrega</label>
              <input v-model="delivery.hora_entrega" id="horaEntrega" type="time"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
            </div>

            <div class="gap-2 grid col-span-2">
              <label for="puntos" class="text-gray-700 text-sm">Puntos de recepción</label>
              <div class="inline-flex justify-between gap-2">
                <select name="puntosPerfil" v-model="delivery.punto"
                  class="w-full mx-auto bg-transparent border-2 border-gray-300 p-2 rounded-md text-gray-600">
                  <option selected class="text-gray-600" :value="point" v-for="point in reception_points"
                    :key="point.id">
                    {{ point.nombre }}
                  </option>
                </select>
                <button v-if="puntosRecepcionFields" @click="savePunto"
                  class="default-bar text-white font-bold grid items-center h-12 p-2 rounded-md">
                  +
                </button>
                <button v-if="!puntosRecepcionFields" @click="enablePuntosRecepcion"
                  class="default-bar text-white font-bold grid items-center h-12 p-2 rounded-md">
                  +
                </button>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2 col-span-2" v-if="puntosRecepcionFields">
              <input type="text" id="nombrePunto" v-model="reception_point.nombre" placeholder="Nombre"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 p-2 rounded-md text-gray-600" />
              <input type="text" id="direccionPunto" v-model="reception_point.direccion" placeholder="Dirección"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 p-2 rounded-md text-gray-600" />
              <input type="text" id="ubicacionPunto" v-model="reception_point.ubicacion" placeholder="Ubicación"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 p-2 rounded-md text-gray-600" />
            </div>
          </div>
          <button class="default-bar p-2 text-center text-white font-bold rounded-lg mt-2 w-full"
            @click="saveEntregaParam">
            Guardar
          </button>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>


<script allowJs>
import { CModal, CModalBody } from "@coreui/vue";
import * as proposalService from '../services/proposal.service.js';
import * as profileService from '../services/profile.service.js';
import Event from "../libs/event.js";
import { IonIcon, IonSegment, IonLabel, IonSegmentButton } from "@ionic/vue";
import { emitAlert } from "@/libs/alert.js";
import { formatDateTime } from "@/libs/date.js";
import event from "../libs/event.js";
export default {
  components: {
    CModal,
    CModalBody,
    IonSegment,
    IonLabel,
    IonSegmentButton,
    IonIcon
  },
  props: {
    Item: String,
    conditions: Object,
    condition_deliveries: Array,
    condition_quality_params: Array
  },
  data() {
    return {
      today: new Date().toISOString().split('T')[0],
      startIndex: 1,
      visible: false,
      parametros: false,
      castigos: false,
      condicionesMessage: false,
      datos: false,
      politicasModal: false,
      unidadEntrega: "",
      cantidadEntrega: 0,
      entregasModal: false,
      entregasSelect: true,
      quality_params: [],
      inEditionParam: {},
      inEditionSlot: 0,
      editParam: false,

      inEditionEntrega: {},
      inEditionEntregaSlot: 0,
      puntosRecepcionFields: false,
      editEntregaModal: false,


      reception_point: {
        nombre: "",
        ubicacion: "",
        direccion: ""
      },

      deliveries: [],

      quality_param: {
        id: "",
        nombre: "",
        min: 0,
        max: 0
      },

      delivery: {
        id: "",
        cantidad: "",
        cantidad_unidad: "",
        fecha_entrega: "",
        hora_entrega: "",
        punto: {
          id: "",
          nombre: "",
          ubicacion_google_maps: "",
          direccion: ""
        }
      },

      reception_points: []
    };
  },
  async created() {
    this.mapDeliveries();
    this.mapParams();
    await this.getReceptionPoints();

    Event.on('map-conditions', () => {
      this.mapDeliveries();
      this.mapParams();
    })
  },
  methods: {
    changeQuantity(){
      if(this.conditions.cantidad > this.conditions.cantidad_maxima){
        this.conditions.cantidad = this.conditions.cantidad_maxima;
      }
    },
    async getReceptionPoints() {
      try {
        this.reception_points = await profileService.getReceptionPoints();
      } catch (error) {
        emitAlert(error, 'error');
      }
    },

    enablePuntosRecepcion() {
      this.puntosRecepcionFields = !this.puntosRecepcionFields;
    },
    manageEditEntregaModal() {
      this.editEntregaModal = !this.editEntregaModal;
    },
    editEntrega(item, index) {
      this.delivery.cantidad = this.deliveries[index].cantidad;
      this.delivery.fecha_entrega = this.deliveries[index].fecha_entrega;
      this.delivery.hora_entrega = this.deliveries[index].hora_entrega;
      this.delivery.cantidad_unidad = this.deliveries[index].cantidad_unidad;
      this.delivery.punto = this.deliveries[index].punto;
      this.delivery.id = this.deliveries[index].id;
      this.inEditionEntregaSlot = index;
      this.inEditionEntrega = item;
      this.manageEditEntregaModal();
    },
    formatDateTime(date) {
      return formatDateTime(date);
    },
    async saveEntregaParam() {
      let delivery = { ...this.delivery };
      if(delivery.cantidad > this.conditions.cantidad){
        return emitAlert('La cantidad de una entrega debe ser menor que la de la negociación', 'info');
      }
      if(delivery.cantidad > Number(this.conditions.cantidad) / (Number(this.cantidadEntrega) + this.condition_deliveries.length)){
        return emitAlert('La cantidad de una entrega no debe ser superior al limite', 'info');
      }
      if (delivery.id.trim() == "") {
        this.manageEditEntregaModal();
        return this.deliveries[this.inEditionEntregaSlot] = delivery;
      }
      try {
        const deliverySchema = {
          cantidad: this.delivery.cantidad,
          cantidad_unidad: this.delivery.cantidad_unidad,
          fecha_entrega: this.delivery.fecha_entrega,
          hora_entrega: this.delivery.hora_entrega,
          id_punto: this.delivery.punto.id
        }
        const { message } = await proposalService.updateDelivery(delivery.id, deliverySchema);
        this.manageEditEntregaModal();
        return emitAlert(message, 'success');
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    backToChat(){
      event.emit('condition-updated', null);
    },
    manageEditParamModal() {
      this.editParam = !this.editParam;
    },
    editParametro(item, index) {
      this.quality_param.id = item.id;
      this.quality_param.nombre = "";
      this.quality_param.min = 0;
      this.quality_param.max = 0;
      this.inEditionSlot = index;
      this.inEditionParam = item;
      this.manageEditParamModal();
    },
    async saveEditParam() {
      let newObject = { ...this.quality_param };

      if (newObject.id.trim() == "") {
        this.manageEditParamModal();
        return this.quality_params[this.inEditionSlot] = newObject;
      }

      try {
        const { message } = await proposalService.updateQualityParam(newObject.id, newObject);
        this.manageEditParamModal();
        Event.emit('fetch-conditions');
        return emitAlert(message, 'success');
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    manageEntregasSelect() {
      this.entregasSelect = !this.entregasSelect;
    },
    manageEntregasModal() {
      this.entregasModal = !this.entregasModal;
    },
    async deleteParam(item) {
      try {
        if (item.id.trim() == "") {
          return this.deleteLocalParam(item);
        }
        const { message } = await proposalService.deleteQualityParam(item.id);

        this.deleteLocalParam(item);
        emitAlert(message, 'success');
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    async deleteDelivery(item) {
      try {
        if (item.id.trim() == "") {
          return this.deleteLocalDelivery(item);
        }
        const { message } = await proposalService.deleteDelivery(item.id);
        
        this.deleteLocalDelivery(item);
        emitAlert(message, 'success');
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    deleteLocalDelivery(y) {
      this.deliveries = this.deliveries.filter(x => x != y);
      if(y.id != ""){
        event.emit('delete-delivery', y);
      }
    },
    deleteLocalParam(x) {
      this.quality_params = this.quality_params.filter((y) => y != x);
      if(x.id != ""){
        event.emit('delete-param', x);
      }
    },
    newParametro() {
      if (
        this.quality_param.nombre != "" &&
        this.quality_param.min >= 0 &&
        this.quality_param.max > 0
      ) {
        this.quality_params.push({ ...this.quality_param });
        return;
      }
    },
    addNewEntregas() {
      if (this.cantidadEntrega) {
        let i = this.cantidadEntrega;
        while (i > 0) {
          const deliverySchema = {...this.delivery}
          deliverySchema.cantidad = this.conditions.cantidad / (this.cantidadEntrega);
          deliverySchema.cantidad_unidad = this.conditions.cantidad_unidad;
          this.deliveries.push(deliverySchema);
          i--;
        }
      }
    },
    savePunto() {
      if (Object.values(this.reception_point).filter((value) => value.trim() == "").length == 0) {
        this.delivery.punto = { ...this.reception_point };
      }
    },
    deletePunto(x) {
      this.puntosRecepcion = this.puntosRecepcion.filter((y) => y != x);
    },
    closeModalDatos() {
      this.datos = false;
    },
    openModalDatos() {
      this.datos = true;
    },
    managePoliticas() {
      this.politicasModal = !this.politicasModal;
    },
    showCondicionesMessage() {
      this.condicionesMessage = !this.condicionesMessage;
    },
    closeChatModal() {
      this.errorChat = false;
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.visible = false;
    },
    async updateCondition() {
      if (this.conditions.modo_pago != "Modo Garantía") {
        this.conditions.porcentaje_inicial = 0;
        this.conditions.porcentaje_final = 0;
        this.conditions.modo_pago_final = this.conditions.modo_pago;
      }
      if (this.deliveries.length == 0) {
        return emitAlert("Define al menos una entrega", 'error');
      }
      if (this.conditions.modo_pago == "Modo Garantía") {
        if (this.conditions.porcentaje_inicial == 0 || this.conditions.porcentaje_final == 0) {
          return emitAlert("Los porcentajes de pago no pueden ser iguales a 0", 'error');
        }
      }

      const {
        id, id_producto, precio, precio_unidad, cantidad, cantidad_unidad,
        modo_pago, porcentaje_inicial, modo_pago_final, porcentaje_final,
        notas, precio_puesto_domicilio, politicas_recepcion, imagen,
        id_propuesta
      } = this.conditions;

      const conditionCopy = {
        id, id_producto, precio, precio_unidad, cantidad, cantidad_unidad,
        modo_pago, porcentaje_inicial, modo_pago_final, porcentaje_final,
        notas, precio_puesto_domicilio, politicas_recepcion, imagen,
        id_propuesta
      }

      try {
        const { message } = await proposalService.updateProposalConditions(this.conditions.id, {
          condition: conditionCopy,
          delivery: this.deliveries,
          quality_params: this.quality_params
        });
        emitAlert(message, 'success');
        event.emit('condition-updated', null);
      } catch (error) {
        return emitAlert(error, 'error');
      }
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
    mapDeliveries() {
      this.deliveries = [];
      if (this.condition_deliveries != undefined) {
        const mappedDeliveries = this.condition_deliveries.map(item => {
          return {
            id: item.id,
            cantidad: item.cantidad,
            cantidad_unidad: item.cantidad_unidad,
            fecha_entrega: item.fecha_entrega.substring(0, 10),
            hora_entrega: item.hora_entrega.substring(0, 5),
            punto: {
              id: item.id_punto,
              nombre: item.nombre,
              ubicacion_google_maps: item.ubicacion_google_maps,
              direccion: item.direccion
            }
          }
        })
        for (const delivery of mappedDeliveries) {
          this.deliveries.push(delivery);
        }
      }
    },
    mapParams() {
      this.quality_params = [];
      if (this.condition_quality_params != undefined) {
        const mappedQualityParams = this.condition_quality_params.map(item => {
          return {
            id: item.id,
            nombre: item.nombre,
            min: item.min_calidad,
            max: item.max_calidad,
          }
        })
        for (const param of mappedQualityParams) {
          this.quality_params.push(param);
        }
      }
    }
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
