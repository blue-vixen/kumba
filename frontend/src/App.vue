<template>
  <div id="app">
    <app-header />
    <user-msg />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import appHeader from "./cmps/app-header.vue";
import appFooter from "./cmps/app-footer.vue";
import userMsg from "./cmps/user-msg.vue";

export default {
  head: {
    link: [
      {
        rel: "icon",
        href: require("./assets/icon.png"),
      },
    ],
  },
  created() {
    this.$store.dispatch({ type: "loadStays" });
    this.$store.dispatch({ type: "setUser" });
    this.$store.dispatch({ type: "loadOrders" });
  },
  components: {
    appHeader,
    appFooter,
    userMsg,
  },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
