<template>
  <section class="explore-btns">
    <button class="explore-btn">
      <div class="btn-expend" @click="setPriceShown">
        <span class="btn-txt" v-if="!isPriceRange">Price</span
        ><span class="btn-txt" v-else>{{ displayPriceRange }}</span>
        <span class="material-icons" v-if="!this.isPriceShown"
          >expand_more</span
        >
        <span class="material-icons" v-if="this.isPriceShown">expand_less</span>
      </div>
      <div class="price-filter-container" v-if="this.isPriceShown">
        <h3 class="avg">The average nightly price is {{ getPricesAvg }}</h3>
        <div class="price-filter">
          <HistogramSlider
            :width="360"
            :bar-height="100"
            :data="filterBy.prices"
            :min="10"
            :max="500"
            :hideFromTo="true"
            :grid="false"
            :barGap="1"
            :barRadius="2"
            :lineHeight="2"
            :clip="false"
            :primaryColor="histogramMainColor"
            :holderColor="histogramSecondaryColor"
            @finish="sliderChanged"
          />
          <div class="price-select-container">
            <div class="price-select" @click="shouldShow = false">
              <div class="label">min price</div>
              <div class="price-change">
                <div class="dollar">$</div>
                <input v-model="filterBy.price.min" placeholder="curr" />
              </div>
            </div>
            <h3>–</h3>
            <div class="price-select" @click="shouldShow = false">
              <div class="label">max price</div>
              <div class="price-change">
                <div class="dollar">$</div>
                <input v-model="filterBy.price.max" placeholder="curr" />
              </div>
            </div>
          </div>
        </div>

        <div class="price-save">
          <button class="clear" @click="clearPriceRange">Clear</button>
          <button class="save" @click="setPriceRange">Save</button>
        </div>
      </div>
    </button>
    <button class="explore-btn">
      <div class="btn-expend" @click="setTypeShown">
        <span class="btn-txt">Type of place</span>
        <span class="material-icons" v-if="!this.isTypeShown">expand_more</span>
        <span class="material-icons" v-if="this.isTypeShown">expand_less</span>
      </div>
      <div class="type-filter-container" v-if="this.isTypeShown">
        <div class="type-filter">
          <div class="type-of-place">
            <label class="container">
              <div class="type">
                <div class="type-header">Entire place</div>
                <div class="type-title">Have a place to yourself</div>
              </div>
              <input
                type="checkbox"
                id="entire place"
                value="Entire place"
                v-model="filterBy.typeOfPlace"
              />
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="type-of-place">
            <label class="container">
              <div class="type">
                <div class="type-header">Private room</div>
                <div class="type-title">
                  Have your own room and share some common spaces
                </div>
              </div>
              <input
                type="checkbox"
                id="private room"
                value="Private room"
                v-model="filterBy.typeOfPlace"
              />
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="type-of-place">
            <label class="container">
              <div class="type">
                <div class="type-header">Hotel room</div>
                <div class="type-title">
                  Have a private or shared room in a boutique hotel, hostel, and
                  more
                </div>
              </div>
              <input
                type="checkbox"
                id="hotel room"
                value="Hotel room"
                v-model="filterBy.typeOfPlace"
              />
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="type-of-place">
            <label class="container">
              <div class="type">
                <div class="type-header">Shared room</div>
                <div class="type-title">
                  Stay in a shared space, like a common room
                </div>
              </div>
              <input
                type="checkbox"
                id="shared room"
                value="Shared room"
                v-model="filterBy.typeOfPlace"
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

        <div class="type-save">
          <button class="clear" @click="clearTypeFilter">Clear</button>
          <button class="save" @click="setTypeFilter">Save</button>
        </div>
      </div>
    </button>
    <span class="buffer">|</span>
    <button
      class="explore-btn"
      @click="
        (e) => {
          e.target.classList.toggle('active'), toggleLabel('Wifi');
        }
      "
    >
      Wifi
    </button>
    <button
      class="explore-btn"
      @click="
        (e) => {
          e.target.classList.toggle('active'), toggleLabel('TV');
        }
      "
    >
      TV
    </button>
    <button
      class="explore-btn"
      @click="
        (e) => {
          e.target.classList.toggle('active'), toggleLabel('Kitchen');
        }
      "
    >
      Kitchen
    </button>
    <button
      class="explore-btn"
      @click="
        (e) => {
          e.target.classList.toggle('active'), toggleLabel('Air conditioning');
        }
      "
    >
      AC
    </button>
    <button
      class="explore-btn"
      @click="
        (e) => {
          e.target.classList.toggle('active'), toggleLabel('Smoking Allowed');
        }
      "
    >
      Smoking Allowed
    </button>
    <button
      class="explore-btn"
      @click="
        (e) => {
          e.target.classList.toggle('active'), toggleLabel('Pets Allowed');
        }
      "
    >
      Pets Allowed
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        price: {
          min: 10,
          max: 500,
        },
        typeOfPlace: [],
        labels: [],
        prices: [],
      },
      histogramMainColor: "#b0b0b0",
      histogramSecondaryColor: "#dddddd",
      stays: null,
      activeBtn: "",
      isPriceShown: false,
      isPriceRange: false,
      isTypeShown: false,
      isTypeSelect: false,

      priceRange: "",
    };
  },
  created() {
    this.getStaysPrices();
  },
  components: {},
  computed: {
    displayPriceRange() {
      if (this.filterBy.price.min > 10 && this.filterBy.price.max < 500) {
        return "$" + this.filterBy.price.min + " - $" + this.filterBy.price.max;
      } else if (
        this.filterBy.price.min > 10 &&
        this.filterBy.price.max >= 500
      ) {
        return "$" + this.filterBy.price.min + "+";
      } else if (
        this.filterBy.price.min <= 10 &&
        this.filterBy.price.max < 500
      ) {
        return "Up to $" + this.filterBy.price.max;
      } else if (
        this.filterBy.price.min <= 10 &&
        this.filterBy.price.max === 500
      ) {
        return "Price";
      }
    },
    getPricesAvg() {
      if (!this.filterBy.prices) return "0$";
      var avgsSum = this.filterBy.prices.reduce((a, b) => a + b);
      avgsSum = avgsSum / this.filterBy.prices.length;
      avgsSum = avgsSum.toFixed(1);
      return avgsSum + "$";
    },
  },
  methods: {
    setPriceShown() {
      this.isPriceShown = !this.isPriceShown;
      this.isTypeShown = false;
    },
    setTypeShown() {
      this.isTypeShown = !this.isTypeShown;
      this.isPriceShown = false;
    },
    toggleLabel(amenitie) {
      const idx = this.filterBy.labels.findIndex((label) => label === amenitie);
      if (idx === -1) this.filterBy.labels.push(amenitie);
      else this.filterBy.labels.splice(idx, 1);
      console.log(this.filterBy.labels);
      this.setFilter();
    },
    setFilter() {
      const filterBy = this.filterBy;
      console.log(filterBy);
      this.$store.commit({ type: "setFilter", filterBy });
      this.getStaysPrices();
    },
    getStaysPrices() {
      const stays = this.$store.getters.staysToShow;
      const staysPrices = stays.map((stay) => stay.price);
      this.filterBy.prices = staysPrices;
    },

    sliderChanged(values) {
      const valueMin = values.from;
      const valueMax = values.to;
      this.filterBy.price.min = valueMin;
      this.filterBy.price.max = valueMax;
    },
    clearPriceRange() {
      this.filterBy.price.min = 0;
      this.filterBy.price.max = 500;
    },
    setPriceRange() {
      this.isPriceShown = false;
      if (this.filterBy.price.min <= 0 && this.filterBy.price.max === 500) {
        this.isPriceRange = false;
      } else this.isPriceRange = true;
      this.setFilter();
    },

    setTypeFilter() {
      this.isTypeShown = false;
      console.log(this.filterBy.typeOfPlace);
      this.setFilter();
    },

    clearTypeFilter() {
      this.filterBy.typeOfPlace = [];
    },
  },
};
</script>

<style>
</style>