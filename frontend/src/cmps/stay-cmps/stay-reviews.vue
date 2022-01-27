<template>
  <!-- todos -->
  <!-- show more TXT func -->

  <section class="stay-reviews-container">
    <div class="stay-reviews-header gray-box-shadow">
      <span class="material-icons-outlined"> star </span>
      <h2>
        {{ reviewsRateAvg }}
        · {{ this.reviews.length }} reviews
      </h2>
      <div class="stay-reviews-stats">
        <stay-reviews-stats :reviews="reviews" />
      </div>
      <stay-reviews-list :reviews="reviews" />
    </div>
    <add-stay-review v-if="loggedin" :user="loggedinUser" />
  </section>
</template>

<script>
import addStayReview from "./add-stay-review.vue";
import stayReviewsStats from "./stay-reviews-stats.vue";
import stayReviewsList from "./stay-reviews-list.vue";

export default {
  name: "stayReviews",
  props: {
    reviews: {
      type: Array,
      default: [],
    },
  },
  components: {
    addStayReview,
    stayReviewsStats,
    stayReviewsList,
  },
  data() {
    return {
      loggedinUser: null,
    };
  },
  created() {
    this.loggedinUser = this.$store.getters.loggedinUser;
  },
  computed: {
    loggedin() {
      return !this.loggedinUser ? false : true;
    },
    reviewsRateAvg() {
      // console.log('reviews' , this.reviews);
      // console.log('reviews', this.reviews);
      var avgsSum = 0;
      this.reviews.forEach((review) => {
        // console.log('review rate', review.rate)
        const sumRates = (obj) => Object.values(obj).reduce((a, b) => a + b);
        const currSum = sumRates(review.rate);
        const currSumAvg = currSum / 6;
        avgsSum += currSumAvg;
        // console.log('currsum', currSum, 'avgsum', avgsSum)
      });
      avgsSum = avgsSum / this.reviews.length;
      // console.log( 'final', avgsSum)
      return avgsSum.toFixed(1);
    },

    reviewRateAvg(review) {
      console.log(review);
      // const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);
      // const sum = sumValues(review.rate);
      //  const sum = this.stay.reviews.rate.reduce(
      //   (sum, rate) => sum + rate.score,{});
      console.log("sum", sum);
      return sum / 6;
    },
  },
};
</script>

<style>
</style>