<template>
  <div class="review-stats">
    <div class="add-review-ctg flex space-between">
      <label for="Cleanliness">Cleanliness</label>

      <div class="flex">
        <div class="gray-scale flex clickable">
          <div
            v-for="(num, idx) in 5"
            :key="idx"
            :class="{ blackbgc: num <= Cleanliness }"
            class="scale"
            @click="changeColor(num, 'Cleanliness')"
          ></div>
        </div>
        <span class="points">{{ showFixedCleanliness }}</span>
      </div>
    </div>
    <!-- not belong here -->
    <!-- <div class="flex">

        <div class="gray-scale flex">
          <div
            v-for="(num, idx) in 5"
            :key="idx"
            :class="{ blackbgc: num <= Cleanliness }"
            class="scale"
          ></div>
        </div>
        <span class="points">{{Cleanliness}}</span>
      </div> -->
    <!-- not belong here -->

    <div class="add-review-ctg flex space-between">
      <label for="Communication">Communication</label>
      <div class="flex">
        <div class="gray-scale flex clickable">
          <div
            v-for="(num, idx) in 5"
            :key="idx"
            :class="{ blackbgc: num <= Communication }"
            class="scale"
            @click="changeColor(num, 'Communication')"
          ></div>
        </div>
        <span class="points">{{ showFixedCommunication }}</span>
      </div>
    </div>
    <div class="add-review-ctg flex space-between">
      <label for="CheckIn">Check-in</label>
      <div class="flex">
        <div class="gray-scale flex clickable">
          <div
            v-for="(num, idx) in 5"
            :key="idx"
            :class="{ blackbgc: num <= CheckIn }"
            class="scale"
            @click="changeColor(num, 'CheckIn')"
          ></div>
        </div>
        <span class="points">{{ showFixedCheckIn }}</span>
      </div>
    </div>
    <div class="add-review-ctg flex space-between">
      <label for="Accuracy">Accuracy</label>
      <div class="flex">
        <div class="gray-scale flex clickable">
          <div
            v-for="(num, idx) in 5"
            :key="idx"
            :class="{ blackbgc: num <= Accuracy }"
            class="scale"
            @click="changeColor(num, 'Accuracy')"
          ></div>
        </div>
        <span class="points">{{ showFixedAccuracy }}</span>
      </div>
    </div>
    <div class="add-review-ctg flex space-between">
      <label for="Location">Location</label>
      <div class="flex">
        <div class="gray-scale flex clickable">
          <div
            v-for="(num, idx) in 5"
            :key="idx"
            :class="{ blackbgc: num <= Location }"
            class="scale"
            @click="changeColor(num, 'Location')"
          ></div>
        </div>
        <span class="points">{{ showFixedLocation }}</span>
      </div>
    </div>
    <div class="add-review-ctg flex space-between">
      <label for="Accessibility">Accessibility</label>
      <div class="flex">
        <div class="gray-scale flex clickable">
          <div
            v-for="(num, idx) in 5"
            :key="idx"
            :class="{ blackbgc: num <= Accessibility }"
            class="scale"
            @click="changeColor(num, 'Accessibility')"
          ></div>
        </div>
        <span class="points">{{ showFixedAccessibility }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addReviewCtgs",
  data() {
    return {
      rate: 5,
      Cleanliness: 5,
      Communication: 5,
      CheckIn: 5,
      Accuracy: 5,
      Location: 5,
      Accessibility: 5,
    };
  },
  methods: {
    changeColor(num, type) {
      this[type] = num;
    },
  },
  computed: {
    showFixedAccessibility() {
      return this.Accessibility.toFixed(1);
    },
    showFixedLocation() {
      return this.Location.toFixed(1);
    },
    showFixedAccuracy() {
      return this.Accuracy.toFixed(1);
    },
    showFixedCheckIn() {
      return this.CheckIn.toFixed(1);
    },
    showFixedCommunication() {
      return this.Communication.toFixed(1);
    },
    showFixedCleanliness() {
      return this.Cleanliness.toFixed(1);
    },
  },
};
</script>

<style>
</style>