<template>

    <div class="content w-11/12 mx-auto grid my-5 gap-2  md:w-1/2">

        <div class="content-cards grid grid-cols-3 gap-2 items-center justify-center">

            <RouterLink :to="'/licitacion/' + product.id" v-for="product in products" :key="product.id">
                <div class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center">
                    <img :src="product.imagen" alt="App Icon" class="w-12 h-12 mx-auto" />
                    <h1 class="text-gray-500 text-sm">{{ product.nombre }}</h1>
                </div>
            </RouterLink>
        </div>
    </div>

</template>

<script allowJs>
import { emitAlert } from "@/libs/alert.js";
import * as productService from '@/services/product.service.js';
export default {
    data() {
        return {
            products: [],
        };
    },
    created: async function () {
        await this.getMarketProducts();
    },
    methods: {
        async getMarketProducts() {
            try {
                this.products = await productService.getMarketProducts();
            } catch (error) {
                return emitAlert(error.message, "error");
            }
        }
    },
};
</script>