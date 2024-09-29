<template>
    <div class="flex items-center justify-center">
        <img v-for="(star, index) in 5" :key="index"
            :src="index < calcAverageRating() ? '/Star.svg' : '/StarGray.svg'" alt="Calificacion"
            class="h-4 w-4" />
    </div>
</template>


<script allowJs>
export default {
    props: {
        qualifications: Array,
        average: Number
    },
    methods: {
        calcAverageRating() {
            if(this.average != null && this.average > 0){
                return Math.min(this.average, 5);
            }
            
            if (this.qualifications.length == 0) return 0;

            const total = this.qualifications.reduce((sum, q) => sum + q.puntaje, 0);
            const average = total / this.qualifications.length;
            return Math.min(average, 5); // Asegurarse de que el puntaje no sea mayor a 5
        }
    },
    created() {
    },
};
</script>