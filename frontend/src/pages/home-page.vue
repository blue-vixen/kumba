<template>
  <section class="home-page main-layout2">
    <section class="main-hero full">
      <h1>Not sure where to go? Perfect.</h1>
      <button class="gray-box-shadow clickable" @click="goExplore">
        <h3>I'm flexible</h3>
      </button>
    </section>
    <h1 class="dest-header">Popular Destinations</h1>
    <section class="dest-container">
      <div class="gallery-container">
        <section class="dest-gallery">
          <router-link to="/explore?destination=New York">
            <img src="~@/assets/images/NY2.jpg" />
            <h3>New York</h3>
          </router-link>
          <router-link to="/explore?destination=Santorini">
            <img src="~@/assets/images/SAN4.jpg" />
            <h3>Santorini</h3>
          </router-link>
          <router-link to="/explore?destination=Tel Aviv">
            <img src="~@/assets/images/TA1.jpg" />
            <h3>Tel Aviv</h3>
          </router-link>
          <router-link to="/explore?destination=Paris">
            <img src="~@/assets/images/paris.jpg" />
            <h3>Paris</h3>
          </router-link>
        </section>
      </div>
    </section>
    <h1 class="tr-header">Top Rated</h1>
    <section class="toprated-container">
      <section class="top-rated-gallery">
        <router-link to="/stay/61b21619dcbbeca56b4e124e">
          <img src="~@/assets/images/tr1.jpg" />
          <h3>Neve Tsedek area - Cosy and sunny</h3>
        </router-link>
        <router-link to="/stay/61b215f3dcbbeca56b4e0549">
          <img src="~@/assets/images/tr2.jpeg" />
          <h3>Magnifique Appart, Paris, France</h3>
        </router-link>
        <router-link to="/stay/61b21585dcbbeca56b4dd121">
          <img src="~@/assets/images/tr4.jpg" />
          <h3>Lava Cave suite, Greece</h3>
        </router-link>
        <router-link to="/stay/61b2155ddcbbeca56b4dbe47">
          <img src="~@/assets/images/tr3.jpeg" />
          <h3>Sky The Lodge, Santorini</h3>
        </router-link>
      </section>
    </section>
    <section class="host-container full">
      <section class="host">
        <h1>Become a host!</h1>

        <button class="clickable" @click="goHost">
          <h3>Learn more</h3>
        </button>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  methods: {},
  created() {
    const page = "homePage";
    this.$store.commit({ type: "setCurrPage", page });
  },
  methods: {
    goExplore() {
      this.$router.push("/explore").catch(() => {});
    },
    goHost() {
      this.$router.push("/host").catch(() => {});
    },
  },
};
</script>

<style>
</style>