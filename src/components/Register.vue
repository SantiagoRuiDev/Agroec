<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <ion-toolbar color="tertiary">
          <div class="grid grid-cols-3 items-center mx-auto w-11/12">
            <a href="/signin">
              <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
            </a>
            <h2 class="text-center">Registro</h2>
          </div>
        </ion-toolbar>
      </ion-header>

      <div class="logIn">
        <img
          src="@/assets/AgroIcon.svg"
          alt="App Icon"
          class="icon-app mx-auto my-4"
        />

        <form
          v-if="smsVerification"
          class="mx-auto items-center gap-3 w-11/12 my-5 md:w-1/2 justify-center grid md:grid-cols-2"
        >
          <div class="col-span-2">
            <label
              for="cedula"
              class="text-gray-600 font-bold w-2/3 mx-auto"
              v-if="codigoNumerico != '' || codigoNumerico == '' || !showErrors"
              >Ingresa el Codigo enviado a tu Teléfono (SMS)</label
            >
            <label
              for="cedula"
              class="text-red-400 font-bold w-2/3 mx-auto"
              v-if="codigoNumerico == '' && showErrors"
              >Debes ingresar el codigo numerico enviado</label
            >
            <input
              type="number"
              name="cedula"
              v-model="codigoNumerico"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Codigo"
            />
          </div>

          <button
            class="py-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded font-bold col-span-2"
            @click="confirmVerification"
            type="button"
          >
            Completar
          </button>
        </form>

        <form
          v-if="!smsVerification"
          class="mx-auto items-center gap-3 w-11/12 my-5 md:w-1/2 justify-center grid md:grid-cols-2"
        >
          <div class="col-span-2">
            <label
              for="comp"
              class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="razon != '' || razon == '' || !showErrors"
              >Razon Social</label
            >
            <label
              for="comp"
              class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="razon == '' && showErrors"
              >Ingresa una Razon Social</label
            >
            <input
              type="text"
              id="comp"
              v-model="razon"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Razon Social"
            />
          </div>
          <div class="mx-auto grid relative w-full">
            <div class="relative">
              <label
                for="identificador"
                class="text-gray-600 font-bold w-5/6 mx-auto"
                v-if="
                  identificacion != '' || identificacion == '' || !showErrors
                "
                >Tipo de Identificacion</label
              >
              <label
                for="identificador"
                class="text-red-400 font-bold w-5/6 mx-auto"
                v-if="identificacion == '' && showErrors"
                >Debes seleccionar un Tipo de Identificacion</label
              >
              <select
                id="identificador"
                v-model="identificacion"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
              >
                <option selected value="RUC">RUC</option>
                <option value="Cédula">Cédula</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
          </div>
          <div class="">
            <label
              for="cedula"
              class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="
                numeroIdentificacion != '' ||
                numeroIdentificacion == '' ||
                !showErrors
              "
              >Numero de Identificacion</label
            >
            <label
              for="cedula"
              class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="numeroIdentificacion == '' && showErrors"
              >Debes ingresar un Numero de Identificacion</label
            >
            <input
              type="number"
              name="cedula"
              v-model="numeroIdentificacion"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Numero de Identificacion"
            />
          </div>
          <div class="">
            <label
              for="correo"
              class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="email != '' || email == '' || !showErrors"
              >Correo</label
            >
            <label
              for="correo"
              class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="email == '' && showErrors"
              >Debes ingresar un Correo</label
            >
            <input
              type="email"
              id="correo"
              v-model="email"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Correo"
            />
          </div>
          <div class="relative">
            <label
              for="clave"
              class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="password != '' || password == '' || !showErrors"
              >Clave</label
            >
            <label
              for="clave"
              class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="password == '' && showErrors"
              >Debes crear tu Clave</label
            >
            <input
              v-if="visiblePassword"
              type="password"
              id="clave"
              v-model="password"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Clave"
            />

            <input
              v-else
              type="text"
              id="clave"
              v-model="password"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Clave"
            />
            <button @click="changeVisibility" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute bottom-4 mb-0.5 right-2"
                fill="#a2afbe"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
                />
              </svg>
            </button>
          </div>

          <div class="mx-auto grid relative w-full">
            <div class="relative">
              <label
                for="provincia"
                class="text-gray-600 font-bold w-5/6 mx-auto"
                v-if="provincia != '' || provincia == '' || !showErrors"
                >Provincia</label
              >
              <label
                for="provincia"
                class="text-red-400 font-bold w-5/6 mx-auto"
                v-if="provincia == '' && showErrors"
                >Debes seleccionar una Provincia</label
              >
              <select
                id="provincia"
                v-model="provincia"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
              >
                <option selected>Jaramijó</option>
                <option>Pedro Carbo</option>
                <option>Milagro</option>
              </select>
            </div>
          </div>

          <div class="mx-auto grid relative w-full">
            <div class="relative">
              <label
                for="canton"
                class="text-gray-600 font-bold w-5/6 mx-auto"
                v-if="canton != '' || canton == '' || !showErrors"
                >Cantón</label
              >
              <label
                for="canton"
                class="text-red-400 font-bold w-5/6 mx-auto"
                v-if="canton == '' && showErrors"
                >Debes seleccionar un Cantón</label
              >
              <select
                id="canton"
                v-model="canton"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
              >
                <option selected>Jaramijó</option>
                <option>Pedro Carbo</option>
                <option>Milagro</option>
              </select>
            </div>
          </div>

          <div class="grid gap-1 mx-auto mt-3 col-span-2 w-full">
            <label for="" class="text-gray-600 font-bold"
              >Matriz y puntos de recepción</label
            >
            <label for="direccionMatriz" class="text-gray-500">Dirección</label>
            <input
              type="text"
              id="direccionMatriz"
              placeholder="Direccion"
              class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
            />
            <label for="ubicacionMatriz" class="text-gray-500">Ubicación</label>
            <div class="inline-flex justify-between gap-2">
              <input
                type="text"
                id="ubicacionMatriz"
                placeholder="Ubicacion"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
              />
              <button
                class="default-bar text-white font-bold grid items-center h-full p-2 rounded-md"
              >
                <img
                  src="@/assets/Status/LocationPin.svg"
                  alt="Pin Ubication"
                />
              </button>
            </div>
            <label for="puntos" class="text-gray-500"
              >Puntos de recepción</label
            >

            <div class="inline-flex gap-2">
              <div class="grid grid-cols-3 gap-1 w-full mx-auto">
                <div class="grid gap-1 w-full items-center">
                  <label
                    for="NombrePunto"
                    class="text-gray-500 font-bold w-full"
                    >Nombre</label
                  >
                  <input
                    v-model="nombrePunto"
                    id="NombrePunto"
                    placeholder="Nombre"
                    type="text"
                    class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
                  />
                </div>
                <div class="grid gap-1 w-full items-center">
                  <label
                    for="UbicacionPunto"
                    class="text-gray-500 font-bold w-full"
                    >Ubicación</label
                  >
                  <input
                    v-model="ubicacionPunto"
                    placeholder="Ubicación"
                    id="UbicacionPunto"
                    type="text"
                    class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
                  />
                </div>
                <div class="grid gap-1 w-full items-center">
                  <label
                    for="DireccionPunto"
                    class="text-gray-500 font-bold w-full"
                    >Direccion</label
                  >
                  <input
                    v-model="direccionPunto"
                    placeholder="Dirección"
                    id="DireccionPunto"
                    type="text"
                    class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
                  />
                </div>
              </div>

              <button
                type="button"
                @click="newPunto"
                class="default-bar h-full self-center text-white font-bold grid items-center p-2 rounded-md"
              >
                +
              </button>
            </div>
          </div>

          <div class="grid w-full col-span-2" v-if="puntosRecepcion.length > 0">
            <h1 class="text-gray-600 mb-3 font-bold">Puntos de recepción</h1>

            <div
              class="text-gray-500 gap-4 flex flex-row w-full items-center"
              v-for="item in puntosRecepcion"
              :key="item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                fill="#a2afbe"
                viewBox="0 -960 960 960"
                width="18"
              >
                <path
                  d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z"
                />
              </svg>
              <p class="">
                {{ item.nombre }}, {{ item.ubicacion }}, {{ item.direccion }}
              </p>

              <button type="button" v-on:click="deletePunto(item)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="#E87C61"
                >
                  <path
                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="col-span-2">
            <label
              for="telf"
              class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="telefono != '' || telefono == '' || !showErrors"
              >Teléfono</label
            >
            <label
              for="telf"
              class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="telefono == '' && showErrors"
              >Debes ingresar un numero de Teléfono</label
            >
            <input
              type="text"
              id="telf"
              v-model="telefono"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Teléfono"
            />
          </div>

          <Contact num="1" />
          <Contact num="2" />
          <Contact num="3" />

          <div class="col-span-2">
            <label
              for="eco"
              class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="
                actividadEconomica != '' ||
                actividadEconomica == '' ||
                !showErrors
              "
              >Actividad Económica</label
            >
            <label
              for="eco"
              class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="actividadEconomica == '' && showErrors"
              >Debes ingresar un tipo de Actividad Económica</label
            >
            <input
              type="text"
              id="eco"
              v-model="actividadEconomica"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              placeholder="Actividad Económica"
            />
          </div>

          <div class="mx-auto grid relative w-full col-span-2">
            <div class="relative">
              <label
                for="negocio"
                class="text-gray-600 font-bold w-5/6 mx-auto"
                v-if="tipoNegocio != '' || tipoNegocio == '' || !showErrors"
                >Tipo de Negocio</label
              >
              <label
                for="negocio"
                class="text-red-400 font-bold w-5/6 mx-auto"
                v-if="tipoNegocio == '' && showErrors"
                >Debes ingresar un tipo de Negocio</label
              >
              <select
                id="negocio"
                v-model="tipoNegocio"
                class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
              >
                <option selected>Industrial</option>
                <option>Comercial</option>
                <option>Intermediario</option>
              </select>
            </div>
          </div>

  

          <div class="col-span-2 grid relative">
            <label for="eco" class="text-gray-600 font-bold w-full mx-auto"
              >Productos de Interés</label
            >
            <RouterLink
              to="/app/add/product/interested/signup"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              >Agregar productos</RouterLink
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute bottom-4 mb-0.5 right-2"
              fill="#a2afbe"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
              />
            </svg>
          </div>

          <div class="grid" v-if="getProducts().length > 0">
            <h1 class="text-gray-600 mb-3 font-bold">Productos Agregados</h1>

            <p
              class="text-gray-500 flex gap-3 items-center"
              v-for="item in getProducts()"
              :key="item.id"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                fill="#a2afbe"
                viewBox="0 -960 960 960"
                width="18"
              >
                <path
                  d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z"
                />
              </svg>
              {{ item.nombre }}

              <button type="button" v-on:click="deleteProduct(item.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="#E87C61"
                >
                  <path
                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                  />
                </svg>
              </button>
            </p>
          </div>

          <div class="col-span-2">
            <label
              for="ctm"
              class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="consumoMesTM != '' || consumoMesTM == '' || !showErrors"
              >Consumo Mes TM</label
            >
            <label
              for="ctm"
              class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="consumoMesTM == '' && showErrors"
              >Debes ingresar un consumo por mes</label
            >
            <input
              type="number"
              name="ctm"
              placeholder="Consumo Mes TM"
              v-model="consumoMesTM"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            />
          </div>

          <div class="col-span-2">
            <label
              for="ca"
              class="text-gray-600 font-bold w-5/6 mx-auto"
              v-if="consumoAnual != '' || consumoAnual == '' || !showErrors"
              >Consumo Anual</label
            >
            <label
              for="ca"
              class="text-red-400 font-bold w-5/6 mx-auto"
              v-if="consumoAnual == '' && showErrors"
              >Debes ingresar un consumo anual</label
            >
            <input
              type="number"
              name="ca"
              placeholder="Consumo Anual"
              v-model="consumoAnual"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            />
          </div>

          <div class="col-span-2">
            <label
              for="pmes"
              v-if="presupuestoMes != '' || presupuestoMes == '' || !showErrors"
              class="text-gray-600 font-bold w-5/6 mx-auto"
              >Presupuesto por Mes</label
            >
            <label
              for="pmes"
              v-if="presupuestoMes == '' && showErrors"
              class="text-red-400 font-bold w-5/6 mx-auto"
              >Debes ingresar un presupuesto por Mes</label
            >
            <input
              type="number"
              name="pmes"
              placeholder="Presupuesto por Mes"
              v-model="presupuestoMes"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            />
          </div>

          <div class="col-span-2">
            <label
              for="politicasRecepcion"
              v-if="
                politicasRecepcion != '' ||
                politicasRecepcion == '' ||
                !showErrors
              "
              class="text-gray-600 font-bold w-5/6 mx-auto"
              >Politicas de recepción</label
            >
            <label
              for="politicasRecepcion"
              v-if="politicasRecepcion == '' && showErrors"
              class="text-red-400 font-bold w-5/6 mx-auto"
              >Debes ingresar tus politicas de recepción</label
            >
            <textarea
              type="text"
              id="politicasRecepcion"
              name="politicasRecepcion"
              placeholder="Politicas de recepción"
              v-model="politicasRecepcion"
              cols="20"
              rows="10"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            ></textarea>
          </div>

          <div class="col-span-2 inline-flex gap-2">
            <p
              class="text-gray-600 font-bold"
              v-if="terminos == true || (terminos == false && !showErrors)"
            >
              Acepto los Términos y Condiciones
            </p>
            <p
              class="text-red-400 font-bold"
              v-if="terminos == false && showErrors"
            >
              Debes aceptar los Términos y Condiciones para utilizar la
              Aplicacion
            </p>
            <input
              type="checkbox"
              name="terms"
              id="terms"
              class="checkbox"
              v-model="terminos"
            />
          </div>

          <button
            class="py-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded font-bold col-span-2"
            @click="sendForm"
            type="button"
          >
            Registro
          </button>
        </form>
      </div>

      <CModal alignment="center" :visible="visible" @close="closeModal">
        <CModalBody>
          <div class="grid w-full gap-3 pb-3">
            <img
              src="@/assets/Nav/X.svg"
              alt="Close alert"
              @click="closeModal"
              class="justify-self-end"
            />
            <h2
              class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto"
            >
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
import { mapGetters, mapActions } from "vuex";
import { CModal, CModalBody } from "@coreui/vue";
export default {
  components: {
    CModal,
    Contact,
    CModalBody,
  },
  computed: {
    ...mapGetters(["getProducts"]),
    ...mapGetters(["deleteProduct"]),
  },
  data() {
    return {
      visible: false,
      visiblePassword: true,
      politicasRecepcion: "",
      codigoNumerico: "",
      password: "",
      email: "",
      razon: "",
      identificacion: "",
      numeroIdentificacion: "",
      provincia: "",
      canton: "",
      nombrePunto: "",
      ubicacionPunto: "",
      direccionPunto: "",
      puntosRecepcion: [],
      telefono: "",
      actividadEconomica: "",
      tipoNegocio: "",
      productosInteres: "",
      consumoMesTM: "",
      consumoAnual: "",
      presupuestoMes: "",
      terminos: false,
      showErrors: false,
      smsVerification: false,
    };
  },
  methods: {
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
          ubicacion: this.direccionPunto,
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
    },
    changeVisibility() {
      this.visiblePassword = !this.visiblePassword;
    },
    confirmVerification() {
      if (this.codigoNumerico != "") {
        this.showErrors = false;
        this.showModal();
      } else {
        this.showErrors = true;
      }
    },
    sendForm() {
      console.log(this.validarCampos());
      if (this.validarCampos()) {
        if (this.terminos) {
          this.showErrors = false;
          this.smsVerification = true;
        } else {
          this.showErrors = true;
        }
      } else {
        this.showErrors = true;
      }
    },
    validarCampos() {
      if (
        this.razon.trim() == "" ||
        this.identificacion.trim() == "" ||
        this.numeroIdentificacion == "" ||
        this.email.trim() == "" ||
        this.password.trim() == "" ||
        this.provincia.trim() == "" ||
        this.canton.trim() == "" ||
        this.direccion.trim() == "" ||
        this.ubicacion.trim() == "" ||
        this.telefono == "" ||
        this.actividadEconomica.trim() == "" ||
        this.tipoNegocio.trim() == "" ||
        this.consumoMesTM == "" ||
        this.consumoAnual == "" ||
        this.presupuestoMes == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
