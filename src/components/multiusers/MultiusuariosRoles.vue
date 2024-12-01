<template>
  <div class="logIn">
    <img
      src="@/assets/AgroIcon.svg"
      alt="App Icon"
      class="icon-app mx-auto my-4"
    />

    <form class="mx-auto grid items-center gap-3 w-3/4 md:w-1/3">
      <div class="inline-flex gap-2 items-center text-gray-600">
        <input type="checkbox" class="checkbox" name="rol-permission-1" id="rol-permission-1" />
        <label for="rol-permission-1">Actualizar estados sin ver precios</label>
      </div>
      <div class="inline-flex gap-2 items-center text-gray-600">
        <input type="checkbox" class="checkbox" name="rol-permission-2" id="rol-permission-2" />
        <label for="rol-permission-2">Crear licitaciones </label>
      </div>
      <div class="inline-flex gap-2 items-center text-gray-600">
        <input type="checkbox" class="checkbox" name="rol-permission-3" id="rol-permission-3" />
        <label for="rol-permission-3">Sugerir productos</label>
      </div>
      <div class="inline-flex gap-2 items-center text-gray-600">
        <input type="checkbox" class="checkbox" name="rol-permission-4" id="rol-permission-4" />
        <label for="rol-permission-4">Aceptar ofertas de vendedores</label>
      </div>
      <div class="inline-flex gap-2 items-center text-gray-600">
        <input type="checkbox" class="checkbox" name="rol-permission-5" id="rol-permission-5" />
        <label for="rol-permission-5">Eliminar licitación</label>
      </div>
      <button
        type="button"
        @click="showModal"
        class="py-3 mb-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded text-center"
      >
        Actualizar
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
          class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto"
        >
          Rol Modificado
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400 text-sm w-3/4 mx-auto">
            Editaste correctamente el rol del Usuario!
          </p>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<script allowJs>
import { CModal, CModalBody } from "@coreui/vue";
export default {
  components: {
    CModal,
    CModalBody,
  },
  data() {
    return {
      visible: false,
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
  },
};
</script>


<style scoped>

.checkbox {
  accent-color: #a3e635;
}


</style>