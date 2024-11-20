<template>
  <div class="grid gap-3 bg-gray-200 min-h-screen">
    <div v-if="sale"
      class="profilepad inline-flex w-11/12 mx-auto gap-3 items-center my-4 rounded-md bg-gray-50 h-24 p-2 md:w-1/2">
      <ProfileIcon :profile="sale.type"></ProfileIcon>
      <div class="grid gap-1 items-center">
        <h2 class="text-xl font-bold text-gray-500">{{ sale.type }}</h2>
        <p class="text-sm text-gray-400">{{ sale.nombre }} {{ sale.apellido }}</p>
      </div>
    </div>

    <form class="detailspad grid w-11/12 mx-auto gap-6 md:w-1/2">
      <h3 class="text-gray-700 font-bold">Propuesta de compra al vendedor</h3>

      <div class="form-input grid gap-1">
        <label for="precio" class="text-gray-700">Precio</label>
        <input type="number" id="precio" placeholder="Precio" v-model="schema.precio"
          class="bg-gray-50 border p-2 rounded-md text-gray-600" />
        <select name="unidadPrecio" v-model="schema.precio_unidad"
          class="w-full mx-auto bg-gray-50 border p-2 rounded-md text-gray-600">
          <option value="QQ" selected class="text-gray-600">QQ</option>
          <option value="KG" class="text-gray-600">KG</option>
        </select>
      </div>
      <div class="form-input grid gap-1">
        <label for="cantidad" class="text-gray-700">Cantidad</label>
        <input type="number" id="cantidad" placeholder="Cantidad" v-model="schema.cantidad" v-if="sale" @change="checkQuantity"
          class="bg-gray-50 border p-2 rounded-md text-gray-600" />
        <select name="unidadCantidad" v-model="schema.cantidad_unidad"
          class="w-full mx-auto bg-gray-50 border p-2 rounded-md text-gray-600">
          <option value="QQ" selected class="text-gray-600">QQ</option>
          <option value="KG" class="text-gray-600">KG</option>
        </select>
      </div>
      <div class="form-input grid gap-1">
        <label for="calidad" class="text-gray-700">Presentación de entrega</label>
        <input type="text" id="calidad" v-model="schema.presentacion_entrega"
          placeholder="Indica las caracteristicas de entrega." class="bg-gray-50 border p-2 rounded-md text-gray-600" />
      </div>
      <div class="form-input grid gap-1">
        <label for="ubicacion" class="text-gray-700">Ubicación</label>
        <div class="inline-flex gap-2">
          <select id="ubicacion" v-model="location" placeholder="Indica la ubicación."
            @change="changeLocation" class="bg-gray-50 border p-2 rounded-md text-gray-600 w-full">
            <option :value="point" v-for="point in points" :key="point.id" selected>
              {{ point.nombre }}
            </option>
          </select>
          <button type="button" @click="addNewLocation"
            class="default-bar p-1 text-center text-white font-bold rounded-md">
            +
          </button>
        </div>
      </div>
      <div class="form-input grid gap-1">
        <label for="Horarios" class="text-gray-700">Horarios</label>
        <input type="text" id="Horarios" placeholder="Indica los horarios de recepción." v-model="schema.horarios"
          class="bg-gray-50 border p-2 rounded-md text-gray-600" />
      </div>
      <div class="form-input grid gap-1">
        <label for="delivery" class="text-gray-700">Fecha de entrega</label>
        <input type="date" id="delivery" v-model="schema.valida_hasta" :min="today"
          class="bg-gray-50 border p-2 rounded-md text-gray-600" />
      </div>
      <div class="form-input grid gap-1">
        <label for="infoextra" class="text-gray-700">Información Adicional</label>
        <input type="text" id="infoextra" v-model="schema.informacion_adicional"
          class="bg-gray-50 border p-2 rounded-md text-gray-600" placeholder="Detalles adicionales." />
      </div>
    </form>

    <hr class="text-gray-700 my-3" />

    <div class="propuestapad inline-flex bg-gray-200 items-center gap-3 h-48 p-3 w-5/6 mx-auto justify-center md:w-1/3">
      <svg width="48" height="48" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34874 18.9425 4.80691 17.0678 2.93219C15.1931 1.05746 12.6513 0.00294858 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.1539 14.1544 15.6542 15.6542C14.1544 17.1539 12.121 17.9976 10 18ZM10 9.5C9.73479 9.5 9.48043 9.60536 9.2929 9.79289C9.10536 9.98043 9 10.2348 9 10.5V13.5C9 13.7652 9.10536 14.0196 9.2929 14.2071C9.48043 14.3946 9.73479 14.5 10 14.5C10.2652 14.5 10.5196 14.3946 10.7071 14.2071C10.8946 14.0196 11 13.7652 11 13.5V10.5C11 10.2348 10.8946 9.98043 10.7071 9.79289C10.5196 9.60536 10.2652 9.5 10 9.5ZM10 5.5C9.75278 5.5 9.5111 5.57331 9.30554 5.71066C9.09998 5.84801 8.93976 6.04324 8.84516 6.27165C8.75055 6.50005 8.72579 6.75139 8.77402 6.99386C8.82225 7.23634 8.94131 7.45907 9.11612 7.63388C9.29094 7.8087 9.51367 7.92775 9.75614 7.97598C9.99862 8.02421 10.25 7.99946 10.4784 7.90485C10.7068 7.81024 10.902 7.65002 11.0393 7.44446C11.1767 7.2389 11.25 6.99723 11.25 6.75C11.25 6.41848 11.1183 6.10054 10.8839 5.86612C10.6495 5.6317 10.3315 5.5 10 5.5Z"
          fill="#cccccc" />
      </svg>
      <div class="informative-text text-center text-gray-700 text-sm">
        Negocia el precio con el vendedor segun las condiciones del mercado y el
        lugar de entrega.
      </div>
    </div>

    <button v-if="loading" class="default-bar p-3 rounded-md text-center text-zinc-50 w-5/6 mx-auto mb-4 md:w-1/2"
      >
      <div style="border-top-color:transparent"
      class="w-6 h-6 mx-auto border-4 border-white-400 border-solid rounded-full animate-spin"></div>
    </button>
    <button v-if="!loading" class="default-bar p-3 rounded-md text-center text-zinc-50 w-5/6 mx-auto mb-4 md:w-1/2"
      @click="sendProposal">Enviar propuesta de compra</button>
  </div>

  <CModal alignment="center" :visible="visible" @click="closeModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Confirmación
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400 text-sm w-3/4 mx-auto">
            Agradecemos el presente acuerdo, Agroec respaldará todo el proceso.
          </p>
        </div>
      </div>
    </CModalBody>
  </CModal>
  <CModal alignment="center" :visible="locationModal" @close="addNewLocation">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="addNewLocation" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Agregar Ubicación
        </h2>
        <div class="flex flex-col gap-3 w-11/12 mx-auto text-center">
          <div class="grid grid-cols-3 gap-2 col-span-2">
            <input type="text" id="nombrePunto" v-model="nombrePunto" placeholder="Nombre"
              class="w-full mx-auto bg-transparent border-2 border-gray-300 p-2 rounded-md text-gray-600" />
            <input type="text" id="direccionPunto" v-model="direccionPunto" placeholder="Dirección"
              class="w-full mx-auto bg-transparent border-2 border-gray-300 p-2 rounded-md text-gray-600" />
            <input type="text" id="ubicacionPunto" v-model="ubicacionPunto" placeholder="Ubicación"
              class="w-full mx-auto bg-transparent border-2 border-gray-300 p-2 rounded-md text-gray-600" />
          </div>
          <button class="default-bar p-2 text-center w-full text-white font-bold rounded-md" @click="saveNewLocation">
            Guardar
          </button>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<script allowJs>
import { CModal, CModalBody } from "@coreui/vue";
import * as saleService from '../services/sale.service.js';
import * as proposalService from '../services/proposal.service.js';
import ProfileIcon from "./ProfileIcon.vue";
import { emitAlert } from "@/libs/alert.js";
import router from "../router/index";
import { getReceptionPoints } from "@/services/profile.service.js";
export default {
  components: {
    CModal,
    CModalBody,
    ProfileIcon
  },
  props: {
    Item: String,
  },
  data() {
    return {
      today: new Date().toISOString().split('T')[0],
      sale: null,
      details: false,
      offerSaw: false,
      visible: false,
      locationModal: false,
      location: { nombre: "", direccion: "", ubicacion_google_maps: "" },
      nombrePunto: "",
      direccionPunto: "",
      ubicacionPunto: "",
      points: [],
      loading: false,
      schema: {
        precio: 0,
        precio_unidad: "QQ",
        cantidad: 0,
        cantidad_unidad: "QQ",
        presentacion_entrega: "",
        ubicacion_google_maps: "",
        horarios: "",
        valida_hasta: "",
        informacion_adicional: ""
      }
    };
  },
  async created() {
    await this.getSale()
    await this.getReceptionPoints();
  },
  methods: {
    checkQuantity(){
      if(this.schema.cantidad > this.sale.cantidad){
        this.schema.cantidad = this.sale.cantidad;
      }
    },
    addNewLocation() {
      this.locationModal = !this.locationModal;
    },
    saveNewLocation() {
      this.location.nombre = this.nombrePunto
      this.location.direccion = this.direccionPunto
      this.location.ubicacion_google_maps = this.ubicacionPunto
      this.addNewLocation();
    },
    changeLocation() {
      this.schema.ubicacion_google_maps = this.location.nombre + ", " + this.location.direccion + ", " + this.location.ubicacion_google_maps;
    },
    async getSale() {
      this.sale = await saleService.getSaleByIdentifier(this.$route.params.identifier, this.$route.params.name);
    },
    async getReceptionPoints() {
      this.points = await getReceptionPoints();
    },
    async sendProposal() {
      this.loading = true;
      try {
        const {chat} = await proposalService.createLicitationProposal(this.$route.params.identifier, this.schema);
        this.loading = false;
        router.push('/chat/licitacion/' + this.$route.params.name + '/' + chat);
      } catch (error) {
        return emitAlert(error, 'error')
      }
    },
    showModal() {
      this.visible = true;
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.message-wrap {
  height: 50vh;
}

/* ===== Scrollbar CSS ===== */
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
</style>
