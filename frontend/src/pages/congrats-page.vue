<template>
  <div class="main-layout2 confirm-page">
    <div class="header">Congrats</div>
    <div class="title">Your order is pending confirmation from the host</div>

    <div class="title2">While you are waiting, plan your trip:</div>
    <div class="more-todo">
      <div class="todo">
        <img
          src="https://www.lagos-milos.com/wp-content/uploads/2019/01/lagos_rent_a_car_milos_background.jpg"
        />

        <h2>Rent a car</h2>
      </div>
      <div class="todo">
        <img
          src="https://www.futurity.org/wp/wp-content/uploads/2020/03/spending-on-experiences-versus-buying-things_1600.jpg"
        />

        <h2>Explore Experiences</h2>
      </div>
      <div class="todo">
        <img
          src="https://image.freepik.com/free-vector/abstract-flat-map-city-plan-town-detailed-city-map_257312-609.jpg"
        />

        <h2>Learn more about Tel Aviv</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "congrats-page",
  data() {
    return {};
  },
  created() {
    const page = "congrats";
    this.$store.commit({ type: "setCurrPage", page });
  },
  computed: {
    stays() {
      return this.$store.getters.staysToShow;
    },
  },
};
</script>

<style>
</style>