<template>
  <section class="filter-container flex align-center justify-center">
    <form
      @submit.prevent="updateTrip"
      class="max-filter flex space-between align-center"
    >
      <div class="input-container first-container" @click="shouldShow = false">
        <label>
          Location
          <input
            v-model="trip.destination"
            type="search"
            list="destination"
            class="dropdown"
            placeholder="Where are you going?"
          />
          <datalist id="destination">
            <option value="Tel Aviv"></option>
            <option value="Barcelona"></option>
            <option value="Paris"></option>
            <option value="Santorini"></option>
            <option value="New York"></option>
            <option value="Bali"></option>
          </datalist>
        </label>
      </div>
      <div class="input-container" @click="shouldShow = false">
        <!-- <trip-calendar-3 @updated="updateDates" /> -->
        <trip-calendar-2 @updated="updateDates" :masks="this.masks" />
      </div>
      <div
        class="input-container flex column"
        @click="shouldShow = !shouldShow"
      >
        <label>
          Guests
          <input class="guests" :placeholder="numOfGuests" disabled />
        </label>
        <button class="search-btn clickable" @click.stop="goExplore">
          <span class="material-icons-outlined"> search </span>
        </button>
      </div>
    </form>
    <div class="guests-modal flex column" v-if="shouldShow">
      <div class="guest-type-label flex space-between align-center">
        <div class="guest-label flex column">
          <span>Adults</span>
          <span>Ages 13 or above</span>
        </div>
        <div class="guest-btns flex align-center space-between">
          <button type="button" @click="updateGuests('adults', -1)">
            <span class="material-icons-sharp"> remove </span>
          </button>
          <span class="guests-num">{{ adults }}</span>
          <button type="button" @click="updateGuests('adults', 1)">
            <span class="material-icons-sharp"> add </span>
          </button>
        </div>
      </div>
      <div class="guest-type-label flex space-between align-center">
        <div class="guest-label flex column">
          <span>Children</span>
          <span>Ages 2-12</span>
        </div>
        <div class="guest-btns flex align-center space-between">
          <button type="button" @click="updateGuests('children', -1)">
            <span class="material-icons-sharp"> remove </span>
          </button>
          <span class="guests-num">{{ children }}</span>
          <button type="button" @click="updateGuests('children', 1)">
            <span class="material-icons-sharp"> add </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import tripCalendar from "../trip-calendar.vue";
import tripCalendar2 from "../trip-calendar2.vue";
import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
export default {
  data() {
    return {
      range: null,
      trip: {
        guests: {
          adults: 0,
          children: 0,
        },
        destination: null,
        dates: {},
      },

      shouldShow: false,
      masks: {
        input: "DD MMM",
      },
    };
  },
  components: {
    tripCalendar,
    tripCalendar2,
    Calendar,
    DatePicker,
  },
  computed: {
    currDest() {
      var dest = this.$store.getters.getDest;
      // console.log(dest);
      if (!dest) return "Start your search";
      else return dest;
    },
  },
  methods: {
    goExplore() {
      this.updateTrip();
      this.$router
        .push(`/explore?destination=${this.trip.destination}`)
        .catch(() => {});
    },
    updateGuests(type, number) {
      if (this.trip.guests[type] === 0 && number === -1) return;
      this.trip.guests[type] += number;
      this.updateTrip();
    },
    updateTrip() {
      // console.log("updating trip", this.trip);
      const trip = this.trip;
      this.$store.commit({ type: "setTrip", trip });
    },
    updateDates(dates) {
      // console.log(dates);
      this.trip.dates = dates;
      this.updateTrip();
    },
  },
  created() {
    // console.log("created");
    this.trip = this.$store.getters.getCurrTrip;
    // console.log(this.trip);
  },
  computed: {
    numOfGuests() {
      const guestsCount = this.trip.guests.children + this.trip.guests.adults;
      if (guestsCount > 1) return guestsCount + " guests";
      else if (guestsCount === 1) return guestsCount + " guest";
      else return "Add guests";
    },
    children() {
      if (this.trip.guests.children === null) return 0;
      else return this.trip.guests.children;
    },
    adults() {
      if (this.trip.guests.adults === null) return 0;
      else return this.trip.guests.adults;
    },
  },
  watch: {
    "$store.state.currTrip": {
      handler() {
        this.trip = this.$store.getters.getCurrTrip;
        // console.log(this.trip);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped>
</style>