<template>
  <div class="flex gap-3 w-5/6 mx-auto justify-center" v-if="value == 1">
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(1)"
    />
    <img
      src="@/assets/Calificar/GrayStar.svg"
      class="h-6 w-6"
      @click="calify(2)"
    />
    <img
      src="@/assets/Calificar/GrayStar.svg"
      class="h-6 w-6"
      @click="calify(3)"
    />
    <img
      src="@/assets/Calificar/GrayStar.svg"
      class="h-6 w-6"
      @click="calify(4)"
    />
    <img
      src="@/assets/Calificar/GrayStar.svg"
      class="h-6 w-6"
      @click="calify(5)"
    />
  </div>
  <div class="flex gap-3 w-5/6 mx-auto justify-center" v-if="value == 2">
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(1)"
    />
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(2)"
    />
    <img
      src="@/assets/Calificar/GrayStar.svg"
      class="h-6 w-6"
      @click="calify(3)"
    />
    <img
      src="@/assets/Calificar/GrayStar.svg"
      class="h-6 w-6"
      @click="calify(4)"
    />
    <img
      src="@/assets/Calificar/GrayStar.svg"
      class="h-6 w-6"
      @click="calify(5)"
    />
  </div>
  <div class="flex gap-3 w-5/6 mx-auto justify-center" v-if="value == 3">
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(1)"
    />
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(2)"
    />
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(3)"
    />
    <img
      src="@/assets/Calificar/GrayStar.svg"
      class="h-6 w-6"
      @click="calify(4)"
    />
    <img
      src="@/assets/Calificar/GrayStar.svg"
      class="h-6 w-6"
      @click="calify(5)"
    />
  </div>
  <div class="flex gap-3 w-5/6 mx-auto justify-center" v-if="value == 4">
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(1)"
    />
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(2)"
    />
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(3)"
    />
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(4)"
    />
    <img
      src="@/assets/Calificar/GrayStar.svg"
      class="h-6 w-6"
      @click="calify(5)"
    />
  </div>
  <div class="flex gap-3 w-5/6 mx-auto justify-center" v-if="value == 5">
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(1)"
    />
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(2)"
    />
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(3)"
    />
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(4)"
    />
    <img
      src="@/assets/Calificar/YellowStar.svg"
      class="h-6 w-6"
      @click="calify(5)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
  },
  methods: {
    calify(value){
      this.$emit('update:value', value)
    }
  }
};
</script>
