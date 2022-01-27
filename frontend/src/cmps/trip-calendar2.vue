<template>
  <section class="trip-calendar">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8" @submit.prevent>
      <div class="mb-4">
        <v-date-picker
          @input="updateDates"
          v-model="range"
          mode="date"
          :masks="masks"
          is-range
          :columns="2"
          is-expanded
          :popover="{ visibility: 'click', visibility: 'focus' }"
          color="gray"
        >
          <template v-slot="{ inputValue, inputEvents, isDragging }">
            <div
              class="
                flex flex-col
                sm:flex-row
                justify-start
                items-center
                dates-container
              "
            >
              <div class="relative flex-grow checkin">
                <svg
                  class="
                    text-gray-600
                    w-4
                    h-full
                    mx-2
                    absolute
                    pointer-events-none
                  "
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path></svg
                ><label
                  >Check in
                  <input
                    ref="dateInput"
                    placeholder="Add dates"
                    class="
                      flex-grow
                      pl-8
                      pr-2
                      py-1
                      bg-gray-100
                      border
                      rounded
                      w-full
                    "
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="inputValue.start"
                    v-on="inputEvents.start"
                  />
                </label>
              </div>
              <span class="flex-shrink-0 m-2">
                <svg
                  class="w-4 h-4 stroke-current text-gray-600"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <div class="relative flex-grow checkout">
                <svg
                  class="
                    text-gray-600
                    w-4
                    h-full
                    mx-2
                    absolute
                    pointer-events-none
                  "
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <label
                  >Check out
                  <input
                    placeholder="Add dates"
                    class="
                      flex-grow
                      pl-8
                      pr-2
                      py-1
                      bg-gray-100
                      border
                      rounded
                      w-full
                    "
                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                    :value="inputValue.end"
                    v-on="inputEvents.end"
                /></label>
              </div>
            </div>
          </template>
        </v-date-picker>
      </div>
    </form>
  </section>
</template>
<script>
export default {
  props: ["dates", "masks"],
  data() {
    return {
      range: {
        start: null,
        end: null,
      },
      input: null,
      // masks: {
      //   input: "DD MMM",
      // },
    };
  },
  methods: {
    updateDates() {
      // console.log(this.range);
      this.$emit("updated", this.range);
    },
    focusInput() {
      this.input.focus();
      this.$refs.dateInput.focus();
    },
  },
  created() {
    this.range = this.$store.getters.getDates;
    // console.log(this.range);
  },
  mounted() {
    this.$nextTick(() => {
      this.input = this.$refs.dateInput;
    });
  },
};
</script>

<style scoped>
.mx-2 {
  display: none !important;
}
</style>