<template>
  <div>
    <h4>
      {{ stays.length }} stays
      <span class="dest-filter" v-if="currDestination.destination">
        in {{ this.currDestination.destination }}</span
      >
    </h4>
    <stayFilterAmenities />
    <ul class="stay-list-container clean-list">
      <li v-for="stay in stays" :key="stay._id" class="stay-preview-container">
        <stay-preview :stay="stay" />
      </li>
    </ul>
  </div>
</template>

<script>
import stayPreview from "@/cmps/stay-cmps/stay-preview.vue";
import stayFilterAmenities from "@/cmps/stay-cmps/stay-filter-amenities.vue";

export default {
  name: "stayList",
  props: {
    stays: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      currDestination: null,
    };
  },
  created() {
    this.getCurrDest;
  },
  methods: {},
  computed: {
    getCurrDest() {
      this.currDestination = this.$store.getters.getCurrTrip;
    },
  },
  components: {
    stayPreview,
    stayFilterAmenities,
  },
};
</script>

<style>
</style>