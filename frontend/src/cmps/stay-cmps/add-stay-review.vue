<template>
  <!-- todo -->
  <!-- addreview functionality -->
  <!-- name & date -->
  <section class="add-review flex column">
    <h2>Add a review</h2>
    <div class="review-preview-header flex">
      <img :src="user.imgUrl" alt="" class="host-img" v-if="hasImg" />
      <img
        src="~@/assets/images/review-avatar.png"
        alt=""
        class="host-img"
        v-else
      />
      <div class="review-preview-text-container">
        <h4>{{ user.fullname }}</h4>
        <h5>{{ now }}</h5>
      </div>
    </div>
    <add-review-ctgs />

    <div class="add-review-text">
      <textarea
        type="text"
        name="txt"
        autocomplete="off"
        placeholder="Write your opinion about this stay..."
      ></textarea>
      <button class="add-review-btn clean-btn" @click="addReview()">
        Send
      </button>
    </div>
  </section>
</template>

<script>
import addReviewCtgs from "@/cmps/stay-cmps/add-review-ctgs.vue";

export default {
  name: "addStayReview",
  props: {
    user: {
      type: Object,
      default: {},
    },
  },
  components: {
    addReviewCtgs,
  },

  methods: {
    addReview() {
      console.log("review added");
    },
  },
  computed: {
    hasImg() {
      return !this.user.imgUrl ? false : true;
    },
    now() {
      const dateObj = new Date();
      const month = dateObj.getUTCMonth() + 1;
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      const newdate = day + "." + month + "." + year;
      return newdate;
    },
  },
};
</script>

<style>
</style>