<template>
    <div class="content w-min-screen mx-auto grid mb-3 gap-3 md:w-1/2" v-if="input">
        <Slider :images="images"/>
        <div class="seller-info w-full mx-auto grid gap-3 shadow-md p-3 items-center justfiy-center">

            <div class="card-info border-bottom-1 pb-2">
                <h1 class="text-gray-400">Nombre Comercial</h1>
                <p class="text-gray-800 text-md font-semibold">{{ input.nombre_comercial }}</p>
            </div>
            <div class="card-info border-bottom-1 pb-2">
                <h1 class="text-gray-400">Precio Agroec (Precio más IVA o incluído IVA)</h1>
                <p class="text-gray-800 text-md font-semibold"><span
                        class="text-lime-700">$</span>{{ input.precio_agroec }}</p>
            </div>
            <div class="card-info border-bottom-1 pb-2">
                <h1 class="text-gray-400">Precio punto de venta</h1>
                <p class="text-gray-800 text-md font-semibold"><span
                        class="text-lime-700">$</span>{{ input.precio_punto_venta }}</p>
            </div>
            <div class="card-info border-bottom-1 pb-2">
                <h1 class="text-gray-400">Stock</h1>
                <p class="text-gray-800 text-md font-semibold">{{ input.stock }}</p>
            </div>

            <CAccordion flush class="border-bottom-1">
                <CAccordionItem class="pb-2">
                    <CAccordionHeader class="flex gap-3">
                        <p class="text-gray-800 text-md font-semibold">Composicion</p>
                    </CAccordionHeader>
                    <CAccordionBody>
                        <div class="grid gap-2 visible">
                            <span>{{ input.composicion }}</span>
                        </div>
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>

            <CAccordion flush class="border-bottom-1">
                <CAccordionItem class="pb-2">
                    <CAccordionHeader class="flex gap-3">
                        <p class="text-gray-800 text-md font-semibold">Clase</p>
                    </CAccordionHeader>
                    <CAccordionBody>
                        <div class="grid gap-2 visible">
                            <span>{{ input.clase }}</span>
                        </div>
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>

            <CAccordion flush class="border-bottom-1">
                <CAccordionItem class="pb-2">
                    <CAccordionHeader class="flex gap-3">
                        <p class="text-gray-800 text-md font-semibold">Tipo de Formula</p>
                    </CAccordionHeader>
                    <CAccordionBody>
                        <div class="grid gap-2 visible">
                            <span>{{ input.tipo_formula }}</span>
                        </div>
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>

            <CAccordion flush class="border-bottom-1">
                <CAccordionItem class="pb-2">
                    <CAccordionHeader class="flex gap-3">
                        <p class="text-gray-800 text-md font-semibold">Titular</p>
                    </CAccordionHeader>
                    <CAccordionBody>
                        <div class="grid gap-2 visible">
                            <span>{{ input.titular }}</span>
                        </div>
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>

            <CAccordion flush class="border-bottom-1">
                <CAccordionItem class="pb-2">
                    <CAccordionHeader class="flex gap-3">
                        <p class="text-gray-800 text-md font-semibold">Clasificación</p>
                    </CAccordionHeader>
                    <CAccordionBody>
                        <div class="grid gap-2 visible">
                            <span>{{ input.clasificacion }}</span>
                        </div>
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>

            <CAccordion flush class="border-bottom-1">
                <CAccordionItem class="pb-2">
                    <CAccordionHeader class="flex gap-3">
                        <p class="text-gray-800 text-md font-semibold">
                            Instrucciones de uso
                        </p>
                    </CAccordionHeader>
                    <CAccordionBody>
                        <div class="grid gap-2 visible">
                            <span>{{ input.instrucciones_de_uso }}</span>
                        </div>
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>

            <CAccordion flush class="border-bottom-1">
                <CAccordionItem class="pb-2">
                    <CAccordionHeader class="flex gap-3">
                        <p class="text-gray-800 text-md font-semibold">
                            Cultura, Modo de aplicación, Época e intervalo
                        </p>
                    </CAccordionHeader>
                    <CAccordionBody>
                        <div class="grid gap-2 visible">
                            <span>{{ input.clasificacion }}</span>
                        </div>
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>

            <CAccordion flush class="border-bottom-1">
                <CAccordionItem class="pb-2">
                    <CAccordionHeader class="flex gap-3">
                        <p class="text-gray-800 text-md font-semibold">
                            Intervalo de entrada área tratada
                        </p>
                    </CAccordionHeader>
                    <CAccordionBody>
                        <div class="grid gap-2 visible">
                            <span>{{ input.intervalo_entrada }}</span>
                        </div>
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>

            <CAccordion flush class="border-bottom-1">
                <CAccordionItem class="pb-2">
                    <CAccordionHeader class="flex gap-3">
                        <p class="text-gray-800 text-md font-semibold">Link</p>
                    </CAccordionHeader>
                    <CAccordionBody>
                        <div class="grid gap-2 visible">
                            <span>{{ input.link }}</span>
                        </div>
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>


            <CAccordion flush class="border-bottom-1">
                <CAccordionItem class="pb-2">
                    <CAccordionHeader class="flex gap-3">
                        <p class="text-gray-800 text-md font-semibold">Atención</p>
                    </CAccordionHeader>
                    <CAccordionBody>
                        <div class="grid gap-2 visible">
                            <span>{{ input.atencion }}</span>
                        </div>
                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>


            <a href="#"
                class="text-decoration-none text-center text-white default-bar h-16 my-5 grid items-center rounded-md w-1/2 mx-auto">Contactar</a>
        </div>
    </div>
</template>


<script>
import Slider from '@/components/others/SliderInsumos.vue';
import { emitAlert } from "@/libs/alert.js";
import * as inputService from '@/services/input.service.js';
import {
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
} from "@coreui/vue";
export default {
    components: {
        Slider,
        CAccordion,
        CAccordionItem,
        CAccordionHeader,
        CAccordionBody,
    },
    data() {
        return {
            input: null,
            images: []
        };
    },
    async created() {
        await this.getInputById();
    },
    methods: {
        async getInputById() {
            try {
                const { input, images } = await inputService.getById(this.$route.params.id);
                this.input = input;
                this.images = images;
            } catch (error) {
                emitAlert(error, 'error');
            }
        }
    }
};

</script>

<style scoped>
.rotate {
    transform: rotate(-90deg);
}
</style>
