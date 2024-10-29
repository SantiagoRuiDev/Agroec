<template>
  <div class="content w-full mx-auto grid my-2 gap-2">
    <div class="grid gap-1">
      <div class="order-card flex md:grid gap-3 p-2">
        <form class="detailspad grid w-11/12 mx-auto gap-6 md:w-1/2">
          <h3 class="text-gray-600 font-bold">
            Agregar saldo a tu cuenta te permitirá comprar en AGROEC.
          </h3>

          <div class="form-input grid gap-1">
            <label for="metodo" class="text-gray-600 font-bold w-5/6"
              >Metodo de pago</label
            >
            <select
              name="metodo"
              v-model="paymentMethod"
              id="metodo"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            >
              <option value="" selected disabled>Metodo de pago</option>
              <option value="TC/TD">TC/TD</option>
              <option value="TRANSFERENCIA">Transferencia</option>
            </select>
          </div>

          <div class="form-input grid gap-1" v-if="paymentMethod != 'TRANSFERENCIA'">
            <label for="monto" class="text-gray-600 font-bold w-5/6"
              >Monto de recarga</label
            >
            <input
              type="number"
              id="monto"
              v-model="monto_recarga"
              placeholder="Monto"
              class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            />
          </div>

          <div
            class="grid gap-1 mx-auto mt-3 w-full"
            v-if="paymentMethod == 'TRANSFERENCIA'"
          >
            <label for="garantia" class="text-gray-700"
              >Transferencia Bancaria</label
            >
            <li class="text-gray-700">Numero Cuenta: 0000005721192722</li>
            <li class="text-gray-700">Banco: Banco A</li>
            <li class="text-gray-700">
              Contacta con área financiera vía WhatsApp
              <a href="wa.link/10nq8r" class="font-bold" target="_blank"
                >+593 96 319 5377</a
              >
            </li>
          </div>
        </form>
      </div>
    </div>

    <button
      @click="showModal" v-if="paymentMethod != 'TRANSFERENCIA'"
      class="default-bar md:w-1/4 text-white text-center h-12 rounded p-2 mx-auto w-5/6 mt-3"
    >
      Pagar
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
          Realizar pago
        </h2>
        <div class="mx-auto text-center inline-flex gap-2">
          <button
            class="text-white text-center grid items-center h-10 w-12 font-bold rounded default-bar"
            @click="pay"
          >
            Si
          </button>
          <button
            class="text-white text-center grid items-center h-10 w-12 font-bold rounded bg-red-500"
            @click="cancel"
          >
            No
          </button>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="cancelled" @close="closeModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img
          src="@/assets/Nav/X.svg"
          alt="Close alert"
          @click="closeModal"
          class="justify-self-end"
        />
        <h2 class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto">
          Pago cancelado
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400 text-sm w-3/4 mx-auto">
            Su pago no se realizó con éxito.
          </p>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="paid" @close="closeModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img
          src="@/assets/Nav/X.svg"
          alt="Close alert"
          @click="closeModal"
          class="justify-self-end"
        />
        <h2 class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto">
          Confirmación
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400 text-sm w-3/4 mx-auto">
            Agradecemos tu recarga. Ahora podrás comprar en AGROEC.
          </p>
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
      paid: false,
      cancelled: false,
      paymentMethod: "TC/TD",
      monto_recarga: 0
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.visible = false;
      this.paid = false;
      this.cancelled = false;
    },
    async pay() {
      this.closeModal();
      try {
        await walletService.rechargeWallet(this.monto_recarga, this.paymentMethod);
        this.paid = true;
      } catch (error) {
        emitAlert(error, 'error');
      }
    },
    cancel() {
      this.closeModal();
      this.cancelled = true;
    },
  },
};
</script>
