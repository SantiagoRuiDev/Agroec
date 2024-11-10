<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <ion-toolbar color="tertiary">
          <div class="grid grid-cols-3 items-center mx-auto w-11/12">
            <RouterLink to="/app/signin">
              <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
            </RouterLink>
            <h2 class="text-center">Registro</h2>
          </div>
        </ion-toolbar>
      </ion-header>

      <div class="logIn">
        <img src="@/assets/AgroIcon.svg" alt="App Icon" class="icon-app mx-auto my-4" />

        <form v-if="smsVerification"
          class="mx-auto items-center gap-3 w-11/12 my-5 md:w-1/2 justify-center grid md:grid-cols-2">
          <div class="col-span-2">
            <label for="codigoNumero" class="text-gray-600 font-bold w-2/3 mx-auto"
              v-if="codigoNumerico != '' || codigoNumerico == '' || !showErrors">Ingresa el Codigo enviado a tu Teléfono
              (SMS)</label>
            <label for="codigoNumero" class="text-red-400 font-bold w-2/3 mx-auto"
              v-if="codigoNumerico == '' && showErrors">Debes ingresar el codigo numerico enviado</label>
            <input type="text" name="codigoNumero" v-model="codigoNumerico"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Codigo" />
          </div>

          <button class="py-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded font-bold col-span-2"
            @click="confirmVerification" type="button">
            Completar
          </button>
        </form>

        <form v-if="!smsVerification"
          class="mx-auto items-center gap-3 w-11/12 my-5 md:w-1/2 justify-center grid md:grid-cols-2">
          <div class="col-span-2">
            <label for="comp" class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="profile.razon_social != '' || profile.razon_social == '' || !showErrors">Razon Social</label>
            <label for="comp" class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="profile.razon_social == '' && showErrors">Ingresa una
              Razon Social</label>
            <input type="text" id="comp" v-model="profile.razon_social"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Razon Social" />
          </div>
          <div class="mx-auto grid relative w-full">
            <div class="relative">
              <label for="identificador" class="text-gray-600 font-bold w-5/6 mx-auto" v-if="
                user.tipo_identificacion != '' || user.tipo_identificacion == '' || !showErrors
              ">Tipo de Identificacion</label>
              <label for="identificador" class="text-red-400 font-bold w-5/6 mx-auto"
                v-if="user.tipo_identificacion == '' && showErrors">Debes seleccionar un Tipo de Identificacion</label>
              <select id="identificador" v-model="user.tipo_identificacion"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
                <option selected value="RUC">RUC</option>
                <option value="Cédula">Cédula</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
          </div>
          <div class="">
            <label for="cedula" class="text-gray-600 font-bold w-5/6 mx-auto" v-if="
              user.numero_identificacion != '' ||
              user.numero_identificacion == '' ||
              !showErrors
            ">Numero de Identificacion</label>
            <label for="cedula" class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="user.numero_identificacion == '' && showErrors">Debes ingresar un Numero de Identificacion</label>
            <input type="text" name="cedula" v-model="user.numero_identificacion"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Numero de Identificacion" />
          </div>
          <div class="">
            <label for="correo" class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="user.correo != '' || user.correo == '' || !showErrors">Correo</label>
            <label for="correo" class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="user.correo == '' && showErrors">Debes
              ingresar un Correo</label>
            <input type="email" id="correo" v-model="user.correo"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Correo" />
          </div>
          <div class="relative">
            <label for="clave" class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="user.clave != '' || user.clave == '' || !showErrors">Clave</label>
            <label for="clave" class="text-red-400 font-bold w-5/6 mx-auto" v-if="user.clave == '' && showErrors">Debes
              crear tu Clave</label>
            <input v-if="visiblePassword" type="password" id="clave" v-model="user.clave"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Clave" />

            <input v-else type="text" id="clave" v-model="user.clave"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Clave" />
            <button @click="changeVisibility" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute bottom-4 mb-0.5 right-2" fill="#a2afbe"
                height="24" viewBox="0 -960 960 960" width="24">
                <path
                  d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
              </svg>
            </button>
          </div>

          <div class="mx-auto grid relative w-full">
            <div class="relative">
              <label for="provincia" class="text-gray-600 font-bold w-5/6 mx-auto"
                v-if="user.provincia != '' || user.provincia == '' || !showErrors">Provincia</label>
              <label for="provincia" class="text-red-400 font-bold w-5/6 mx-auto"
                v-if="user.provincia == '' && showErrors">Debes seleccionar una Provincia</label>
              <select id="provincia" v-model="user.provincia" @change="loadCantonesByProvincia"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
                <option v-for="provincia in Provincias" :key="provincia.id" :value="provincia.id">{{ provincia.nombre }}
                </option>
              </select>
            </div>
          </div>

          <div class="mx-auto grid relative w-full">
            <div class="relative">
              <label for="canton" class="text-gray-600 font-bold w-5/6 mx-auto"
                v-if="user.canton != '' || user.canton == '' || !showErrors">Cantón</label>
              <label for="canton" class="text-red-400 font-bold w-5/6 mx-auto"
                v-if="user.canton == '' && showErrors">Debes
                seleccionar un Cantón</label>
              <select id="canton" v-model="user.canton"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
                <option v-for="canton in Cantones" :key="canton.ID" :value="canton.Nombre">{{ canton.Nombre }}</option>
              </select>
            </div>
          </div>

          <div class="grid gap-1 mx-auto mt-3 col-span-2 w-full">
            <label for="" class="text-gray-600 font-bold">Matriz y puntos de recepción</label>
            <label for="direccionMatriz" class="text-gray-500">Dirección</label>
            <input type="text" id="direccionMatriz" placeholder="Direccion" v-model="user.direccion"
              class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
            <label for="ubicacionMatriz" class="text-gray-500">Ubicación</label>
            <div class="inline-flex justify-between gap-2">
              <input type="text" id="ubicacionMatriz" placeholder="Ubicacion" v-model="user.ubicacion"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
              <button class="default-bar text-white font-bold grid items-center h-full p-2 rounded-md">
                <img src="@/assets/Status/LocationPin.svg" alt="Pin Ubication" />
              </button>
            </div>
            <label for="puntos" class="text-gray-500">Puntos de recepción</label>

            <div class="inline-flex gap-2">
              <div class="grid grid-cols-3 gap-1 w-full mx-auto">
                <div class="grid gap-1 w-full items-center">
                  <label for="NombrePunto" class="text-gray-500 font-bold w-full">Nombre</label>
                  <input v-model="nombrePunto" id="NombrePunto" placeholder="Nombre" type="text"
                    class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
                </div>
                <div class="grid gap-1 w-full items-center">
                  <label for="UbicacionPunto" class="text-gray-500 font-bold w-full">Ubicación</label>
                  <input v-model="ubicacionPunto" placeholder="Ubicación" id="UbicacionPunto" type="text"
                    class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
                </div>
                <div class="grid gap-1 w-full items-center">
                  <label for="DireccionPunto" class="text-gray-500 font-bold w-full">Direccion</label>
                  <input v-model="direccionPunto" placeholder="Dirección" id="DireccionPunto" type="text"
                    class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600" />
                </div>
              </div>

              <button type="button" @click="newPunto"
                class="default-bar h-full self-center text-white font-bold grid items-center p-2 rounded-md">
                +
              </button>
            </div>
          </div>

          <div class="grid w-full col-span-2" v-if="puntosRecepcion.length > 0">
            <h1 class="text-gray-600 mb-3 font-bold">Puntos de recepción</h1>

            <div class="text-gray-500 gap-4 flex flex-row w-full items-center" v-for="item in puntosRecepcion"
              :key="item">
              <svg xmlns="http://www.w3.org/2000/svg" height="18" fill="#a2afbe" viewBox="0 -960 960 960" width="18">
                <path d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z" />
              </svg>
              <p class="">
                {{ item.nombre }}, {{ item.ubicacion_google_maps }}, {{ item.direccion }}
              </p>

              <button type="button" v-on:click="deletePunto(item)">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#E87C61">
                  <path
                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="grid col-span-2">
            <label for="telf" class="text-gray-600 font-bold"
              v-if="user.telefono != '' || user.telefono == '' || !showErrors">Teléfono</label>
            <label for="telf" class="text-red-400 font-bold" v-if="user.telefono == '' && showErrors">Debes
              ingresar un numero de Teléfono</label>
            <div class="col-span-2 grid grid-cols-4 gap-2">
              <div class="col-span">
                <select id="telf-code" v-model="code_selected"
                  class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
                  <option v-for="code in country_codes" :key="code" :value="code">{{ code }}</option>
                </select>+
              </div>
              <div class="col-span-3">
                <input type="text" id="telf" v-model="user.telefono"
                  class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
                  placeholder="Teléfono" />
              </div>
            </div>
          </div>

          <Contact />

          <div class="grid w-full col-span-2" v-if="contact.length > 0">
            <h1 class="text-gray-600 mb-3 font-bold">Contactos Añadidos</h1>

            <div class="text-gray-500 gap-4 flex flex-row w-full items-center" v-for="item in contact"
              :key="item">
              <svg xmlns="http://www.w3.org/2000/svg" height="18" fill="#a2afbe" viewBox="0 -960 960 960" width="18">
                <path d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z" />
              </svg>
              <p class="">
                {{ item.nombre }}, {{ item.telefono }}, {{ item.cargo }}, {{ item.correo }}
              </p>

              <button type="button" v-on:click="deleteContacto(item)">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#E87C61">
                  <path
                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="col-span-2">
            <label for="eco" class="text-gray-600 font-bold w-5/6 mx-auto" v-if="
              profile.actividad_economica != '' ||
              profile.actividad_economica == '' ||
              !showErrors
            ">Actividad Económica</label>
            <label for="eco" class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="profile.actividad_economica == '' && showErrors">Debes ingresar un tipo de Actividad
              Económica</label>
            <input type="text" id="eco" v-model="profile.actividad_economica"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Actividad Económica" />
          </div>

          <div class="mx-auto grid relative w-full col-span-2">
            <div class="relative">
              <label for="negocio" class="text-gray-600 font-bold w-5/6 mx-auto"
                v-if="profile.tipo_negocio != '' || profile.tipo_negocio == '' || !showErrors">Tipo de Negocio</label>
              <label for="negocio" class="text-red-400 font-bold w-5/6 mx-auto"
                v-if="profile.tipo_negocio == '' && showErrors">Debes ingresar un tipo de Negocio</label>
              <select id="negocio" v-model="profile.tipo_negocio"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
                <option selected>Industrial</option>
                <option>Comercial</option>
                <option>Intermediario</option>
              </select>
            </div>
          </div>



          <div class="col-span-2 grid relative">
            <label for="eco" class="text-gray-600 font-bold w-full mx-auto">Productos de Interés</label>
            <RouterLink to="/app/add/product/interested/signup"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md">Agregar
              productos</RouterLink>
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute bottom-4 mb-0.5 right-2" fill="#a2afbe" height="24"
              viewBox="0 -960 960 960" width="24">
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </div>

          <div class="grid" v-if="getProducts().length > 0">
            <h1 class="text-gray-600 mb-3 font-bold">Productos Agregados</h1>

            <p class="text-gray-500 flex gap-3 items-center" v-for="item in getProducts()" :key="item.id">
              <svg xmlns="http://www.w3.org/2000/svg" height="18" fill="#a2afbe" viewBox="0 -960 960 960" width="18">
                <path d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z" />
              </svg>
              {{ item.nombre }}

              <button type="button" v-on:click="deleteProduct(item.id)">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#E87C61">
                  <path
                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </p>
          </div>

          <div class="col-span-2">
            <label for="ctm" class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="profile.consumo_mes_tm != '' || profile.consumo_mes_tm == '' || !showErrors">Consumo Mes TM</label>
            <label for="ctm" class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="profile.consumo_mes_tm == '' && showErrors">Debes
              ingresar un consumo por mes</label>
            <input type="number" name="ctm" placeholder="Consumo Mes TM" v-model="profile.consumo_mes_tm"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md" />
          </div>

          <div class="col-span-2">
            <label for="ca" class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="profile.consumo_anual != '' || profile.consumo_anual == '' || !showErrors">Consumo Anual</label>
            <label for="ca" class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="profile.consumo_anual == '' && showErrors">Debes
              ingresar un consumo anual</label>
            <input type="number" name="ca" placeholder="Consumo Anual" v-model="profile.consumo_anual"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md" />
          </div>

          <div class="col-span-2">
            <label for="pmes" v-if="profile.presupuesto_mes != '' || profile.presupuesto_mes == '' || !showErrors"
              class="text-gray-600 font-bold w-5/6 mx-auto">Presupuesto por Mes</label>
            <label for="pmes" v-if="profile.presupuesto_mes == '' && showErrors"
              class="text-red-400 font-bold w-5/6 mx-auto">Debes ingresar un presupuesto por Mes</label>
            <input type="number" name="pmes" placeholder="Presupuesto por Mes" v-model="profile.presupuesto_mes"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md" />
          </div>

          <div class="col-span-2">
            <label for="profile.politicas_recepcion" v-if="
              profile.politicas_recepcion != '' ||
              profile.politicas_recepcion == '' ||
              !showErrors
            " class="text-gray-600 font-bold w-5/6 mx-auto">Politicas de recepción</label>
            <label for="profile.politicas_recepcion" v-if="profile.politicas_recepcion == '' && showErrors"
              class="text-red-400 font-bold w-5/6 mx-auto">Debes ingresar tus politicas de recepción</label>
            <textarea type="text" id="profile.politicas_recepcion" name="profile.politicas_recepcion"
              placeholder="Politicas de recepción" v-model="profile.politicas_recepcion" cols="20" rows="10"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"></textarea>
          </div>

          <div class="col-span-2 inline-flex gap-2">
            <p class="text-gray-600 font-bold"
              v-if="user.acepto_terminos == true || (user.acepto_terminos == false && !showErrors)">
              Acepto los Términos y Condiciones
            </p>
            <p class="text-red-400 font-bold" v-if="user.acepto_terminos == false && showErrors">
              Debes aceptar los Términos y Condiciones para utilizar la
              Aplicacion
            </p>
            <input type="checkbox" name="terms" id="terms" class="checkbox" v-model="user.acepto_terminos" />
          </div>

          <button class="py-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded font-bold col-span-2" @click="sendForm"
            type="button">
            Registro
          </button>
        </form>
      </div>

      <CModal alignment="center" :visible="visible" @close="closeModal">
        <CModalBody>
          <div class="grid w-full gap-3 pb-3">
            <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
            <h2 class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto">
              Agradecemos su registro
            </h2>
            <div class="mx-auto text-center">
              <p class="text-gray-400 text-sm w-3/4 mx-auto">
                Agroec analizará su perfil. Se hará llegar un correo electrónico
                para notificar disponibilidad de acceso a la Aplicación.
              </p>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.checkbox {
  accent-color: #a3e635;
}
</style>

<script allowJs>
import Contact from "@/components/Contacto.vue";
import Provincias from "../assets/JSON/Provincias.json";
import Cantones from "../assets/JSON/Cantones.json";
import { mapGetters, mapActions } from "vuex";
import { CModal, CModalBody } from "@coreui/vue";
import { IonPage, IonContent, IonToolbar, IonHeader } from "@ionic/vue";
import { emitAlert } from '../libs/alert.js'
import * as authService from '../services/auth.service.js'
import event from "@/libs/event";
export default {
  components: {
    CModal,
    Contact,
    CModalBody,
    IonPage,
    IonContent,
    IonToolbar,
    IonHeader
  },
  computed: {
    ...mapGetters(["getProducts"]),
    ...mapGetters(["deleteProduct"]),
  },
  data() {
    return {
      country_codes: [
        "+54", // Argentina
        "+591", // Bolivia
        "+55", // Brasil
        "+56", // Chile
        "+57", // Colombia
        "+506", // Costa Rica
        "+53", // Cuba
        "+593", // Ecuador
        "+503", // El Salvador
        "+502", // Guatemala
        "+504", // Honduras
        "+52", // México
        "+507", // Panamá
        "+595", // Paraguay
        "+51", // Perú
        "+1", // República Dominicana
        "+598", // Uruguay
        "+58"  // Venezuela
      ],
      visible: false,
      visiblePassword: true,
      codigoNumerico: "",
      nombrePunto: "",
      ubicacionPunto: "",
      direccionPunto: "",
      puntosRecepcion: [],
      showErrors: false,
      smsVerification: false,
      code_selected: "+593",
      user: {
        tipo_identificacion: "",
        numero_identificacion: "",
        correo: "",
        clave: "",
        acepto_terminos: false,
        provincia: "",
        canton: "",
        parroquia: "",
        direccion: "",
        ubicacion: "",
        telefono: ""
      },
      profile: {
        type: "Comprador",
        razon_social: "",
        actividad_economica: "",
        tipo_negocio: "",
        consumo_mes_tm: 0,
        consumo_anual: 0,
        presupuesto_mes: 0,
        politicas_recepcion: ""
      },
      Provincias: Provincias,
      Cantones: [],
      contact: []
    };
  },
  created: function () {
    event.on('add-contact', (data) => {
      this.contact.push(data);
    })
  },
  methods: {
    deleteContacto(x) {
      this.contact = this.contact.filter((y) => y != x);
    },
    deletePunto(x) {
      this.puntosRecepcion = this.puntosRecepcion.filter((y) => y != x);
    },
    newPunto() {
      if (
        this.nombrePunto != "" &&
        this.direccionPunto != "" &&
        this.ubicacionPunto != ""
      ) {
        this.puntosRecepcion.push({
          nombre: this.nombrePunto,
          ubicacion_google_maps: this.direccionPunto,
          direccion: this.ubicacionPunto,
        });
        return;
      }
    },
    showModal() {
      this.visible = true;
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.visible = false;
      this.smsVerification = false;
      this.$router.push('/app/signin');
    },
    changeVisibility() {
      this.visiblePassword = !this.visiblePassword;
    },
    loadCantonesByProvincia() {
      this.Cantones = Cantones.filter(canton => canton.Provincia_ID == this.user.provincia);
    },
    async confirmVerification() {
      if (this.codigoNumerico != "") {
        this.showErrors = false;
        try {
          await authService.finisUserAccount({ codigo: this.codigoNumerico });
        } catch (error) {
          return emitAlert(error.message, "error");
        }
        this.showModal();
      } else {
        this.showErrors = true;
      }
    },
    async sendForm() {
      if (this.validarCampos()) {
        if (this.user.acepto_terminos) {
          this.showErrors = false;
          // Aca llamar registro.
          try {
            const {code} = await authService.createUserAccount({ user: this.user, profile: this.profile, points: this.puntosRecepcion, contact: this.contact });
            this.codigoNumerico = code;
          } catch (error) {
            return emitAlert(error.message, "error");
          }

          this.smsVerification = true;
        } else {
          this.showErrors = true;
        }
      } else {
        this.showErrors = true;
      }
    },
    validarCampos() {
      this.user.provincia = Provincias.filter((prov) => prov.id == this.user.provincia)[0].nombre;
      this.user.telefono = this.code_selected + this.user.telefono;
      if (
        this.profile.razon_social.trim() == "" ||
        this.user.tipo_identificacion.trim() == "" ||
        this.user.numero_identificacion == "" ||
        this.user.correo.trim() == "" ||
        this.user.clave.trim() == "" ||
        this.user.provincia.trim() == "" ||
        this.user.canton.trim() == "" ||
        this.user.telefono == "" ||
        this.profile.actividad_economica.trim() == "" ||
        this.profile.tipo_negocio.trim() == "" ||
        this.profile.consumo_mes_tm == "" ||
        this.profile.consumo_anual == "" ||
        this.profile.presupuesto_mes == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
