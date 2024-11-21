<template>
  <div class="licitacion my-5 w-full mx-auto" v-if="schema">
    <div class="grid gap-4 my-1">
      <h1 class="text-gray-500 text-md font-bold text-center">
        Edita tu oferta ({{ Licitacion }})
      </h1>

      <div class="ficha md:w-1/3 grid gap-2 w-11/12 p-2 mx-auto rounded-md-2 border-gray-100 text-center">
        <h2 class="text-gray-500 text-sm font-bold">Ficha del Producto</h2>
        <p class="text-gray-400 text-xs">{{producto}}</p>
      </div>
    </div>

    <form class="mx-auto grid items-center gap-3 w-11/12 mt-3 md:w-1/3">
      <div class="grid mt-3 gap-2">
        <label for="Precio" class="text-gray-500 font-bold text-sm">Precio:</label>
        <input type="text" name="Precio"
          v-model="schema.precio"
          class="w-full text-gray-500 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
          placeholder="$14,40" />

        <select name="size"
          v-model="schema.precio_unidad"
          class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
          <option value="QQ">QQ</option>
          <option value="KG">KG</option>
        </select>
      </div>

      <div class="grid mt-3 gap-2">
        <label for="Cantidad" class="text-gray-500 font-bold text-sm">Cantidad que necesitas:</label>
        <input type="text" name="Cantidad"
          v-model="schema.cantidad"
          class="w-full text-gray-500 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
          placeholder="#200" />

        <select name="size"
          v-model="schema.cantidad_unidad"
          class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
          <option value="QQ">QQ</option>
          <option value="KG">KG</option>
        </select>
      </div>

      <div class="grid mt-3 gap-2">
        <label for="Presentacion" class="text-gray-500 font-bold text-sm">Presentación de entrega:</label>
        <select name="size" v-model="entrega"
          class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
          <option value="En sacos">En sacos</option>
          <option value="En bolsas">En bolsas</option>
        </select>

        <select name="size" v-model="sacos"
          class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
          <option value="100 libras">100 libras</option>
          <option value="50 libras">50 libras</option>
        </select>
      </div>

      <div class="grid relative mt-3">
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

      <div class="grid gap-1 mt-2" v-if="quality_params.length > 0">
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

      <div class="grid mt-3 gap-2">
        <label for="Validez" class="text-gray-500 font-bold text-sm">Valida hasta:</label>
        <input type="date" name="Validez"
          v-model="schema.valida_hasta"  :min="today"
          class="w-full text-gray-500 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md" />
      </div>

      <div class="grid mt-3 gap-2">
        <label for="Adicional" class="text-gray-500 font-bold text-sm">Información adicional:</label>
        <input type="text" name="Adicional" placeholder="Precio negociable"
          v-model="schema.informacion_adicional"
          class="w-full text-gray-500 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md" />
      </div>

      <button @click="updateLicitation" type="button"
        class="py-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded font-bold grid items-center mb-3">
        Actualizar
      </button>
    </form>
  </div>

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

  <CModal alignment="center" :visible="visible" @close="closeModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Confirmación
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400 text-sm w-11/12 mx-auto">
            Agradecemos tu publicación, Agroec buscará los mejores clientes para
            tu publicación.
          </p>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<script allowJs>
import { CModal, CModalBody } from "@coreui/vue";
import { emitAlert } from "@/libs/alert.js";
import * as licitacionService from '../services/licitation.service.js';
import event from "@/libs/event.js";
export default {
  components: {
    CModal,
    CModalBody,
  },
  props: {
    Licitacion: String,
  },
  data() {
    return {
      visible: false,
      parametros: false,
      today: new Date().toISOString().split('T')[0],
      entrega: "",
      sacos: "",
      producto: "",
      schema: {
        precio: "",
        precio_unidad: "",
        cantidad: "",
        cantidad_unidad: "",
        presentacion_entrega: "",
        valida_hasta: "",
        informacion_adicional: ""
      },
      
      quality_params: [],
      inEditionParam: {},
      inEditionSlot: 0,
      editParam: false,

      licitation_quality_params: [],

      quality_param: {
        id: "",
        nombre: "",
        min: 0,
        max: 0
      },
    };
  },
  async created() {
    await this.getLicitationById();
  },
  methods: {
    async updateLicitation(){
      try {
        this.schema.presentacion_entrega = this.entrega + " de " + this.sacos;
        await licitacionService.updateLicitation(this.$route.params.id, {licitation: this.schema, quality_params: this.quality_params});
        await this.getLicitationById();
        this.showSuccessModal();
      } catch (error) {
        emitAlert(error, 'error');
      }
    },
    showSuccessModal(){
      this.visible = true;
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
        const { message } = await licitacionService.updateQualityParam(newObject.id, newObject);
        this.manageEditParamModal();
        this.getLicitationById();
        return emitAlert(message, 'success');
      } catch (error) {
        return emitAlert(error, 'error');
      }
    },
    newParametro() {
      if (
        this.quality_param.nombre != "" &&
        this.quality_param.min >= 0 &&
        this.quality_param.max > 0
      ) {
        this.quality_params.push({ ...this.quality_param });
        this.quality.param.nombre = "";
        this.quality_param.min = 0;
        this.quality_param.max = 0;
        return;
      }
    },
    mapParams() {
      this.quality_params = [];
      if (this.licitation_quality_params != undefined) {
        const mappedQualityParams = this.licitation_quality_params.map(item => {
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
    },
    async getLicitationById() {
      try {
        const data = await licitacionService.getLicitationById(this.$route.params.id);
        this.producto = data.id_producto;
        this.schema.cantidad = data.cantidad;
        this.schema.cantidad_unidad = data.cantidad_unidad;
        this.schema.precio = data.precio;
        this.schema.precio_unidad = data.precio_unidad;
        this.schema.valida_hasta = String(data.valida_hasta).slice(0,10);
        this.schema.informacion_adicional = data.informacion_adicional;
        this.schema.presentacion_entrega = data.presentacion_entrega;
        this.entrega = String(data.presentacion_entrega).match(/^[^\d]+/)[0].replace(/\sde\s/, '').trim();
        this.sacos =  String(data.presentacion_entrega).match(/\d+\s\w+/)[0];
        this.licitation_quality_params = data.quality_params;
        this.mapParams();
      } catch (error) {
        emitAlert(error, 'error');
      }
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.visible = false;
    },
  },
};
</script>
