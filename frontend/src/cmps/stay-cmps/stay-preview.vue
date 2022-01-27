<template>
  <section class="stay-preview clickable" @click="goToStay">
    <div class="stay-preview-slideshow">
      <stay-preview-slideshow :imgs="stay.imgUrls" />
      <div class="like-stay">
        <span
          class="material-icons"
          :class="{ active: isLiked }"
          @click.stop="toggleWishList"
          >favorite</span
        >
      </div>
    </div>
    <div class="stay-preview-info">
      <div class="reviews-preview">
        <div class="star-preview">
          <span class="material-icons-outlined">star</span>
        </div>
        <span class="review-avg">{{ this.reviewsRateAvg }}&nbsp;</span
        ><span class="reviews-total"
          >({{ this.stay.reviews.length }} reviews)</span
        >
      </div>
      <div class="property-type">
        {{ this.stay.propertyType }} • {{ this.stay.loc.city }}
      </div>
      <div class="stayname">{{ this.stay.name }}</div>
      <div class="stay-price">
        <span class="bold">${{ this.stay.price }}</span> / night
      </div>
    </div>
  </section>
</template>

<script>
import stayPreviewSlideshow from "@/cmps/stay-cmps/stay-preview-slideshow.vue";
import { showMsg } from "../../../services/event-bus.service.js";

export default {
  name: "stayPreview",
  props: {
    stay: {
      type: Object,
      default: {},
    },
  },
  components: {
    stayPreviewSlideshow,
    showMsg,
  },
  data() {
    return {
      isLiked: false,
    };
  },
  created() {
    const user = this.$store.getters.loggedinUser;
    if (user && user.wishList && user.wishList.length > 0) {
      var isWish = user.wishList.filter((wish) => wish === this.stay._id);
      if (isWish.length > 0) this.isLiked = true;
    }
  },
  computed: {
    reviewsRateAvg() {
      var avgsSum = 0;
      this.stay.reviews.forEach((review) => {
        const sumRates = (obj) => Object.values(obj).reduce((a, b) => a + b);
        const currSum = sumRates(review.rate);
        const currSumAvg = currSum / 6;
        avgsSum += currSumAvg;
      });
      avgsSum = avgsSum / this.stay.reviews.length;
      return avgsSum.toFixed(1);
    },
  },
  methods: {
    goToStay() {
      this.$router.push("/stay/" + this.stay._id);
    },
    toggleWishList() {
      const loggedinUser = this.$store.getters.loggedinUser;
      if (!loggedinUser) {
        showMsg("Please log in first", "danger");
        console.log("please login first");
      } else {
        var stayId = this.stay._id;
        console.log(stayId);
        this.$store.dispatch({ type: "toggleWishList", stayId });
        this.isLiked = !this.isLiked;
      }
    },
  },
};
</script>
