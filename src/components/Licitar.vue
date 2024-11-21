<template>
  <div class="licitacion my-5 w-full mx-auto">
    <div class="grid gap-4 my-1">
      <h1 class="text-gray-500 text-md font-bold text-center">
        Publica tu oferta ({{ Licitacion }})
      </h1>

      <div class="ficha md:w-1/3 grid gap-2 w-11/12 p-2 mx-auto rounded-md-2 border-gray-100 text-center">
        <h2 class="text-gray-500 text-sm font-bold">Ficha del Producto</h2>
        <p class="text-gray-400 text-xs">{{Licitacion}}</p>
      </div>
    </div>

    <form class="mx-auto grid items-center gap-3 w-11/12 mt-3 md:w-1/3">
      <div class="grid mt-3 gap-2">
        <label for="Precio" class="text-gray-500 font-bold text-sm">Precio:</label>
        <input type="number" name="Precio" v-model="licitation.precio"
          class="w-full text-gray-500 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
          placeholder="$14,40" />

        <select name="size" v-model="licitation.precio_unidad"
          class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
          <option value="QQ">QQ</option>
          <option value="KG">KG</option>
        </select>
      </div>

      <div class="grid mt-3 gap-2">
        <label for="Cantidad" class="text-gray-500 font-bold text-sm">Cantidad que necesitas:</label>
        <input type="number" name="Cantidad" v-model="licitation.cantidad"
          class="w-full text-gray-500 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
          placeholder="#200" />

        <select name="size" v-model="licitation.cantidad_unidad"
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

      <div class="grid relative w-full mx-auto">
        <div class="inline-flex gap-2 w-full items-center">
          <label for="" class="text-gray-500 font-bold w-full">Agregar Parámetros de Calidad</label>
          <button type="button" class="default-bar h-10 p-2 text-white font-bold rounded-md" @click="newParametro">
            +
          </button>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-1 w-full mx-auto">
        <div class="grid gap-1 w-full items-center">
          <label for="nombreParametro" class="text-gray-500 font-bold w-full">Nombre</label>
          <input v-model="nombreParametro" id="nombreParametro" placeholder="Nombre" type="text"
            class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
        </div>
        <div class="grid gap-1 w-full items-center">
          <label for="minParametro" class="text-gray-500 font-bold w-full">Min</label>
          <input v-model="minParametro" placeholder="2%" id="minParametro" type="text"
            class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
        </div>
        <div class="grid gap-1 w-full items-center">
          <label for="maxParametro" class="text-gray-500 font-bold w-full">Max</label>
          <input v-model="maxParametro" placeholder="No Max" id="maxParametro" type="text"
            class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
        </div>
      </div>

      <div class="grid gap-1 w-full mx-auto" v-if="newParametros.length > 0">
        <h1 class="text-gray-600 mb-3 font-bold">Parámetros Agregados</h1>

        <p class="text-gray-500 flex gap-3 items-center" v-for="item in newParametros" :key="item">
          <svg xmlns="http://www.w3.org/2000/svg" height="18" fill="#a2afbe" viewBox="0 -960 960 960" width="18">
            <path d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z" />
          </svg>
          {{ item.nombre }}, Min: {{ item.min }}%, Max: {{ item.max }}%

          <button type="button" v-on:click="deleteParametro(item)">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#E87C61">
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </p>
      </div>

      <div class="grid mt-3 gap-2">
        <label for="Validez" class="text-gray-500 font-bold text-sm">Valida hasta:</label>
        <input type="date" name="Validez" v-model="licitation.valida_hasta" :min="today"
          class="w-full text-gray-500 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md" />
      </div>

      <div class="grid mt-3 gap-2">
        <label for="Adicional" class="text-gray-500 font-bold text-sm">Información adicional:</label>
        <input type="text" name="Adicional" v-model="licitation.informacion_adicional" placeholder="Precio negociable"
          class="w-full text-gray-500 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md" />
      </div>

      <button @click="showModal" type="button"
        class="py-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded font-bold grid items-center mb-3">
        Publicar Licitación
      </button>
    </form>
  </div>

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
import { emitAlert } from "@/libs/alert.js";
import * as licitacionService from '../services/licitation.service.js';
import { CModal, CModalBody } from "@coreui/vue";
import router from "@/router/index.js";
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
      today: new Date().toISOString().split('T')[0],
      visible: false,
      parametros: false,
      nombreParametro: "",
      newParametros: [],
      minParametro: 0,
      maxParametro: 0,
      entrega: "",
      sacos: "",

      licitation: {
        precio: 0,
        precio_unidad: "QQ",
        cantidad: 0,
        cantidad_unidad: "QQ",
        presentacion_entrega: "",
        valida_hasta: "",
        informacion_adicional: ""
      }
    };
  },
  methods: {
    async showModal() {
      this.licitation.presentacion_entrega = this.entrega + " de " + this.sacos;

      try {
        await licitacionService.createLicitation(this.$route.params.name, {
          licitation: this.licitation,
          quality_params: this.newParametros
        });

        this.visible = true
      } catch (error) {
        emitAlert(error, "error");
      }
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.visible = false;
      router.push('/app/home');
    },
    newParametro() {
      if (
        this.nombreParametro != "" &&
        this.minParametro != "" &&
        this.maxParametro != ""
      ) {
        this.newParametros.push({
          id: "",
          nombre: this.nombreParametro,
          min: this.minParametro,
          max: this.maxParametro,
        });
        this.nombreParametro = "";
        this.minParametro = 0;
        this.maxParametro = 0;
        return;
      }
    },
  },
};
</script>
