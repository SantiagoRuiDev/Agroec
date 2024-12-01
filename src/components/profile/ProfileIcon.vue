<template>
    <img src="@/assets/People/Farmer.svg" v-if="profile == 'Agricultor'" alt="Profile Icon" :class="{'w-16': weight, 'h-16': height}"/>
    <img src="@/assets/People/Business.svg" v-if="profile == 'Comerciante'" alt="Profile Icon" :class="{'w-16': weight, 'h-16': height}"/>
    <img src="@/assets/People/Business.svg" v-if="profile == 'Comerciante Agroquimicos'" alt="Profile Icon" :class="{'w-16': weight, 'h-16': height}"/>
    <img src="@/assets/People/Business.svg" v-if="profile == 'Comerciante Agroquímicos'" alt="Profile Icon" :class="{'w-16': weight, 'h-16': height}"/>
    <img src="@/assets/People/Aso.svg" v-if="profile == 'Asociación Agricola'" alt="Profile Icon" :class="{'w-16': weight, 'h-16': height}"/>
    <img src="@/assets/People/Aso.svg" v-if="profile == 'Asociación Agrícola'" alt="Profile Icon" :class="{'w-16': weight, 'h-16': height}"/>
</template>

<script>
export default {
    props: {
        profile: String,
        height: Boolean,
        weight: Boolean
    }
}
</script>