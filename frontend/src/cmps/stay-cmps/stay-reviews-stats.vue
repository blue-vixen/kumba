<template>
  <section>

    <div class="review-stats">
      <div class="review-ctg flex space-between">
        <label for="Cleanliness">Cleanliness</label>
       <div class="flex">

        <div class="gray-scale flex">
          <div
            v-for="(num, idx) in 5"
            :key="idx"
            :class="{ blackbgc: num <= Cleanliness }"
            class="scale"
          ></div>
        </div>
        <span class="points">{{Cleanliness}}</span>
      </div>
       </div>
    
    <div class="review-ctg flex space-between">
      <label for="Communication">Communication</label>
      <div class="flex">

      <div class="gray-scale flex">
        <div
          v-for="(num, idx) in 5"
          :key="idx"
          :class="{ blackbgc: num <= Communication }"
          class="scale"
        ></div>
      </div>
      <span class="points">{{Communication}}</span>
      </div>
    </div>
    <div class="review-ctg flex space-between">
      <label for="CheckIn">Check-in</label>
      <div class="flex">

      <div class="gray-scale flex">
        <div
          v-for="(num, idx) in 5"
          :key="idx"
          :class="{ blackbgc: num <= CheckIn }"
          class="scale"
        ></div>
      </div>
      <span class="points">{{CheckIn}}</span>
      </div>
    </div>
    <div class="review-ctg flex space-between">
      <label for="Accuracy">Accuracy</label>
      <div class="flex">

      <div class="gray-scale flex">
        <div
          v-for="(num, idx) in 5"
          :key="idx"
          :class="{ blackbgc: num <= Accuracy }"
          class="scale"
        ></div>
      </div>
        <span class="points">{{Accuracy}}</span>
      </div>
    </div>
    <div class="review-ctg flex space-between">
      <label for="Location">Location</label>
      <div class="flex">

      <div class="gray-scale flex">
        <div
          v-for="(num, idx) in 5"
          :key="idx"
          :class="{ blackbgc: num <= Location }"
          class="scale"
        ></div>
      </div>
        <span class="points">{{Location}}</span>
      </div>
    </div>

    <div class="review-ctg flex space-between">
      <label for="Accessibility">Accessibility</label>
      
      <div class="flex">
      <div class="gray-scale flex">
        <div
          v-for="(num, idx) in 5"
          :key="idx"
          :class="{ blackbgc: num <= Accessibility }"
          class="scale"
        ></div>
      </div>
        <span class="points">{{Accessibility}}</span>
    </div>
      </div>
  </div>
  </section>
</template>

<script>
export default {
  name: "stayReviewsStats",
  props: {
    reviews: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      rate: 0,
      Cleanliness: 0,
      Communication: 0,
      CheckIn: 0,
      Accuracy: 0,
      Location: 0,
      Accessibility: 0,
    };
  },
  created() {
    this.reviewsRateScoreAvg();
  },
  methods: {
    reviewsRateScoreAvg() {
      var ratingsScores = {
        cleanlinessScore: [],
        checkInScore: [],
        locationScore: [],
        communicationScore: [],
        accuracyScore: [],
        accessibilityScore: [],
      };
      this.reviews.forEach((review) => {
        // console.log(review.rate)
        const { cleanliness } = review.rate;
        ratingsScores.cleanlinessScore.push(cleanliness);
        const { checkIn } = review.rate;
        ratingsScores.checkInScore.push(checkIn);
        const { location } = review.rate;
        ratingsScores.locationScore.push(location);
        const { communication } = review.rate;
        ratingsScores.communicationScore.push(communication);
        const { accuracy } = review.rate;
        ratingsScores.accuracyScore.push(accuracy);
        const { accessibility } = review.rate;
        ratingsScores.accessibilityScore.push(accessibility);
      });
      // console.log(ratingsScores)

      ratingsScores.cleanlinessScore = (
        ratingsScores.cleanlinessScore.reduce(this.add) / this.reviews.length
      ).toFixed(1);
      ratingsScores.checkInScore = (
        ratingsScores.checkInScore.reduce(this.add) / this.reviews.length
      ).toFixed(1);
      ratingsScores.locationScore = (
        ratingsScores.locationScore.reduce(this.add) / this.reviews.length
      ).toFixed(1);
      ratingsScores.communicationScore = (
        ratingsScores.communicationScore.reduce(this.add) / this.reviews.length
      ).toFixed(1);
      ratingsScores.accuracyScore = (
        ratingsScores.accuracyScore.reduce(this.add) / this.reviews.length
      ).toFixed(1);
      ratingsScores.accessibilityScore = (
        ratingsScores.accessibilityScore.reduce(this.add) / this.reviews.length
      ).toFixed(1);

      // console.log(ratingsScores)

      this.Cleanliness = ratingsScores.cleanlinessScore;
      this.CheckIn = ratingsScores.checkInScore;
      this.Location = ratingsScores.locationScore;
      this.Communication = ratingsScores.communicationScore;
      this.Accuracy = ratingsScores.accuracyScore;
      this.Accessibility = ratingsScores.accessibilityScore;

      return ratingsScores;
    },
    setColor(num, type) {
      this[type] = num;
    },
    add(accumulator, a) {
      return accumulator + a;
    },
  },
  computed: {},
};
</script>

<style>
</style>