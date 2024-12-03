<template>
  <div class="logIn">
    <img src="@/assets/AgroIcon.svg" alt="App Icon" class="icon-app mx-auto my-4" />

    <form class="mx-auto grid items-center gap-3 w-full md:w-1/3">
      <label for="name" class="text-gray-500 font-bold w-5/6 mx-auto">Nombre</label>
      <input type="text" id="name" v-model="user.nombre"
        class="text-gray-400 w-5/6 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
        placeholder="Ingresa el nombre" />
      <label for="correo" class="text-gray-500 font-bold w-5/6 mx-auto">Correo</label>
      <input type="text" id="correo" v-model="user.correo"
        class="text-gray-400 w-5/6 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
        placeholder="Introduce el correo" />
      <label for="clave" class="text-gray-500 font-bold w-5/6 mx-auto">Clave</label>
      <input id="clave" type="password" v-model="user.clave"
        class="text-gray-400 w-5/6 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
        placeholder="Clave de seguridad" />


      <label for="rol" class="text-gray-500 font-bold w-5/6 mx-auto">Rol</label>
      <select id="identificador" v-model="user.rol"
        class="text-gray-400 w-5/6 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md">
        <option :value="rol.id" v-for="rol in roles" :key="rol.id">{{ rol.id }}</option>
      </select>

      <button type="button" @click="editMultiuser"
        class="py-3 mb-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded text-center">
        Actualizar
      </button>
    </form>
  </div>

  <CModal alignment="center" :visible="visible" @close="closeModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Usuario Modificado
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400 text-sm w-3/4 mx-auto">
            Editaste correctamente los detalles del Usuario!
          </p>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<script allowJs>
import { emitAlert } from "@/libs/alert.js";
import * as multiuserService from '@/services/multiuser.service.js';
import { CModal, CModalBody } from "@coreui/vue";
export default {
  components: {
    CModal,
    CModalBody,
  },
  data() {
    return {
      visible: false,
      user: {
        nombre: "",
        correo: "",
        clave: "",
        rol: ""
      },
      roles: []
    };
  },
  async created() {
    await this.getMultiuser();
    await this.getRoles();
  },
  methods: {
    async editMultiuser() {
      try {
        await multiuserService.editMultiuser(this.$route.params.identifier, this.user);
        this.showModal();
      } catch (error) {
        emitAlert(error, 'error');
      }
    },
    async getMultiuser() {
      try {
        const data = await multiuserService.getMultiuserById(this.$route.params.identifier);
        this.user.nombre = data.nombre;
        this.user.correo = data.correo;
        this.user.rol = data.id_rol;
      } catch (error) {
        emitAlert(error, 'error');
      }
    },
    async getRoles() {
      try {
        this.roles = await multiuserService.getMultiuserRoles();
        this.user.rol = this.roles[0].id
      } catch (error) {
        emitAlert(error, 'error');
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
