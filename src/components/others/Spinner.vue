<template>
    <div style="border-top-color:transparent"
        class=" border-4 border-lime-500 border-solid rounded-full animate-spin mx-auto"
            :class="{'w-6': small, 'h-6': small, 'h-8': !small, 'w-8': !small}" 
        ></div>
</template>

<script>
export default {
    props: {
        small: Boolean,
    }
}
</script>