<template>
    <div class="content w-full mx-auto grid my-2 gap-2">
      <div class="grid gap-1">
        <div class="order-card flex md:grid gap-3 p-2">
          <form class="detailspad grid w-11/12 mx-auto gap-6 md:w-1/2">
            <h3 class="text-gray-600 font-bold">
              Pagosmedios controlara y asegurara los datos de tu tarjeta y podras usarla en tus transacciones en la plataforma.
            </h3>
  
            <div class="form-input grid gap-1" v-if="valid_document_field">
              <label for="nombre" class="text-gray-600 font-bold w-5/6" 
                >Documento</label
              >
              <input
                type="text"
                id="nombre"
                v-model="token.documento"
                @change="verifyDocument"
                placeholder="Debe reunir 10 digitos"
                class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              />
            </div>
            <div class="form-input grid gap-1">
              <label for="nombre" class="text-gray-600 font-bold w-5/6"
                >Nombre completo</label
              >
              <input
                type="text"
                id="nombre"
                v-model="token.nombre"
                placeholder="Nombre que figura en tarjeta"
                class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
              />
            </div>
          </form>
        </div>
      </div>
  
      <button
        @click="showModal"
        class="default-bar md:w-1/4 text-white text-center h-12 rounded p-2 mx-auto w-5/6 mt-3"
      >
        Añadir tarjeta
      </button>
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
          <h2 class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto">
            Finalizar proceso
          </h2>
          <p class="text-center text-gray-600 mx-auto">
            Para finalizar el proceso, te redigiremos a la plataforma de Pagomedios donde puedes agregar los detalles de tu tarjeta de manera segura.
            (No se hara ningun cobro, la tarjeta quedara guardada en Agroec y puedes removerla cuando quieras)
          </p>
          <div class="mx-auto text-center inline-flex gap-2">
            <button
              class="text-white text-center grid items-center h-10 w-12 font-bold rounded default-bar"
              @click="addCard"
            >
              Si
            </button>
            <button
              class="text-white text-center grid items-center h-10 w-12 font-bold rounded bg-red-500"
              @click="closeModal"
            >
              No
            </button>
          </div>
        </div>
      </CModalBody>
    </CModal>
  </template>
  
  <script>
  import { CModal, CModalBody } from "@coreui/vue";
  import { emitAlert } from '../libs/alert.js'
  import * as walletService from '../services/wallet.service.js'
  export default {
    components: {
      CModal,
      CModalBody,
    },
    data() {
      return {
        visible: false,
        valid_document_field: false,
        token: {
          documento: "",
          nombre: "",
          telefono: 0,
          email: "",
          direccion: ""
        }
      };
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      closeModal() {
        // Close the menu by setting menuOpen to false
        this.visible = false;
      },
      verifyDocument(){
        const value = this.token.documento; // Obtiene el valor del input y elimina espacios en blanco
        const TEN_DIGITS_TEST = /^[0-9]{10}$/.test(value); // Verifica si son exactamente 10 dígitos
        if(TEN_DIGITS_TEST){
          return emitAlert("Documento valido", 'success');
        } else {
          return emitAlert("Documento invalido, revisa la cantidad de digitos", "warning");
        }
      },
      async addCard() {
        if(this.token.nombre.trim() == "") {
          return emitAlert("Completa el campo de nombre", 'error');
        }
        this.closeModal();
        try {
          let data;
          if(this.valid_document_field){
            data = await walletService.addCard({tipo:"with-document", ...this.token});
          } else {
            data = await walletService.addCard(this.token);
          }
          window.open(data.url, "_blank");
        } catch (error) {
          emitAlert(error.reason, 'error');
          if(error.document_field){
            this.valid_document_field = true;
          }
        }
      }
    },
  };
  </script>
  