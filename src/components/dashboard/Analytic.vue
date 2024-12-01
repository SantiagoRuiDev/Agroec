<template>
  <apexcharts
    v-if="!extended && !smallSize"
    :width="chartWidth"
    class="mx-auto"
    :height="chartHeight"
    :type="type"
    :options="chartOptions"
    :series="series"
  ></apexcharts>
  <apexcharts
    v-if="extended"
    class="mx-auto"
    :width="extendedWidth"
    :height="extendedHeight"
    :type="type"
    :options="chartOptions"
    :series="series"
  ></apexcharts>
  <apexcharts
    v-if="!extended && smallSize"
    :width="chartWidthSmall"
    class="mx-auto"
    :height="chartHeightSmall"
    :type="type"
    :options="chartOptions"
    :series="series"
  ></apexcharts>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    type: String,
    extended: Boolean,
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 10],
        },
      ],
      extendedWidth: 350,
      extendedHeight: 300,
      chartWidth: 400, // Ancho del gráfico en píxeles
      chartHeight: 300, // Alto del gráfico en píxeles
      chartWidthSmall: 185, // Ancho del gráfico en píxeles
      chartHeightSmall: 120, // Alto del gráfico en píxeles
      smallSize: false,
    };
  },
  created() {
    if (window.innerWidth < 768) {
      this.smallSize = true;
    } else {
      this.smallSize = false;
    }
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      if (window.innerWidth < 768) {
        this.smallSize = true;
      } else {
        this.smallSize = false;
      }
    },
  },
};
</script>
