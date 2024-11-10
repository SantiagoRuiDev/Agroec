<template>
  <CAccordion flush class="col-span-2">
    <CAccordionItem class="shadow-md">
      <CAccordionHeader class="flex gap-3 rounded-md">
        <p class="text-gray-500 text-sm font-semibold w-3/4 ml-3">Contacto</p>
      </CAccordionHeader>
      <CAccordionBody>
        <div class="mb-2 visible">
          <label label="contacto-name" class="text-gray-600 font-bold w-5/6 mx-auto">Nombre</label>
          <input type="text" id="contact-name" v-model="contact.nombre"
            class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            placeholder="Nombre" />
        </div>
        <div class="mb-2 visible">
          <label label="contacto-telf" class="text-gray-600 font-bold w-5/6 mx-auto">Teléfono</label>
          <input type="number" id="contact-telf" v-model="contact.telefono"
            class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            placeholder="Teléfono" />
        </div>
        <div class="mb-2 visible">
          <label id="contact-rol" class="text-gray-600 font-bold w-5/6 mx-auto">Cargo</label>
          <input type="text" id="contact-rol" v-model="contact.cargo"
            class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            placeholder="Cargo" />
        </div>
        <div class="mb-2 visible">
          <label id="contact-mail" class="text-gray-600 font-bold w-5/6 mx-auto">Correo</label>
          <input type="email"  id="contact-mail" v-model="contact.correo"
            class="text-gray-400 w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            placeholder="Correo" />
        </div>
        <button type="button" @click="addContact" class="visible text-white py-3 px-5 default-bar mx-auto mt-3 w-full rounded font-bold col-span-2">
          Agregar contacto
        </button>
      </CAccordionBody>
    </CAccordionItem>
  </CAccordion>
</template>

<script allowJs>
import event from "@/libs/event";
import {
  CModal,
  CModalBody,
  CAccordion,
  CAccordionBody,
  CAccordionItem,
  CAccordionHeader,
} from "@coreui/vue";
export default {
  components: {
    CModal,
    CModalBody,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
  },
  data(){
    return {
      contact: {nombre: "", telefono: "", cargo: "", correo: ""}
    }
  },
  methods: {
    addContact(){
      event.emit('add-contact', this.contact);
    }
  }
};
</script>
