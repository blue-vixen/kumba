<template>
  <div id="app">
    <HistogramSlider
      style="margin: 200px auto"
      :width="600"
      :bar-height="100"
      :data="data"
      :prettify="prettify"
      :drag-interval="true"
      :force-edges="false"
      :colors="['#4facfe', '#00f2fe']"
      :min="new Date(2004, 11, 24).valueOf()"
      :max="new Date(2017, 11, 24).valueOf()"
    />
  </div>
</template>

<script>
import data from "./data.json";

export default {
  name: "App",

  data() {
    return {
      data: data.map(d => new Date(d)),
      prettify: function(ts) {
        return new Date(ts).toLocaleDateString("en", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }
    };
  }
};
</script>

<style>

</style>