<template>
  <div class="main-layout2 explore-page">
    <stay-list :stays="stays" v-loading="loading" />
  </div>
</template>

<script>
import stayList from "@/cmps/stay-cmps/stay-list.vue";

export default {
  name: "stay-app",
  data() {
    return {
      currTrip: {
        guests: { children: null, adults: null },
        destination: "",
        dates: {},
      },
    };
  },

  computed: {
    stays() {
      return this.$store.getters.staysToShow;
    },
    loading() {
      return this.$store.getters.isLoading;
    },
  },
  created() {
    this.currTrip = this.$store.getters.getCurrTrip;
    console.log(this.currTrip);
    const page = "explore";
    this.$store.commit({ type: "setCurrPage", page });
  },
  watch: {
    $route: {
      handler() {
        this.currTrip = this.$store.getters.getCurrTrip;
        const { destination } = this.$route.query;
        this.currTrip.destination = destination;
        console.log(this.currTrip);
      },
      immediate: true,
    },
  },
  components: {
    stayList,
  },
};
</script>



<style>
</style>