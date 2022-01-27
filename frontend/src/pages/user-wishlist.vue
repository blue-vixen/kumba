<template>
  <section class="main-layout2 wish-list">
    <h1 class="user-wishlist-h1">My wishlist</h1>
    <stay-list :stays="wishStays" />
  </section>
</template>

<script>
import stayList from "@/cmps/stay-cmps/stay-list.vue";
import { userService } from "../../services/user.service.js";

export default {
  name: "user-wishlist",

  components: {
    stayList,
  },

  data() {
    return {
      currUser: null,
      stays: null,
    };
  },
  created() {
    this.currUser = userService.getLoggedinUser();
    this.stays = this.$store.getters.staysToShow;
    const page = "wishlist";
    this.$store.commit({ type: "setCurrPage", page });
  },
  computed: {
    wishStays() {
      var currWishStays = [];
      this.stays.forEach((stay) => {
        const stayID = stay._id;
        console.log(stayID);
        if (this.currUser.wishList.includes(stayID)) {
          console.log("adding", stayID);
          currWishStays.push(stay);
        }
      });
      return currWishStays;
    },
  },
  watch: {
    $route: {
      handler() {
        this.currTrip = this.$store.getters.getCurrTrip;
        const { destination } = this.$route.query;
        this.currTrip.destination = destination;
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>