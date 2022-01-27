<template>
  <div class="order-card">
    <div class="order-card-header flex">
      <img class="guest-img" :src="order.buyer.imgUrl" />
      <span class="card-key">{{ order.buyer.fullname }}</span>
    </div>
    <div>
      <span class="card-key">Status:</span><span>{{ order.status }}</span>
    </div>
    <div>
      <span class="card-key">Dates:</span
      ><span>{{ startDateToShow }} - {{ endDateToShow }} </span>
    </div>
    <div>
      <span class="card-key">Expected revenue:</span>
      <span>$ {{ this.totalPrice }}</span>
    </div>
    <div>
      <span class="card-key">Stay:</span> <span>{{ order.stay.name }}</span>
    </div>
    <div class="card-actions">
      <section class="pre-approved">
        <button
          class="approve-btn"
          @click="approve"
          v-if="this.order.status === 'pending'"
        >
          Approve
        </button>
        <button
          class="decline-btn"
          @click="decline"
          v-if="this.order.status === 'pending'"
        >
          Decline
        </button>
        <button
          class="approve-btn"
          @click="approve"
          v-if="this.order.status === 'declined'"
        >
          Approve
        </button>
        <button
          class="decline-btn"
          @click="decline"
          v-if="this.order.status === 'approved'"
        >
          Decline
        </button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-cards",
  props: {
    order: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      totalPrice: null,
    };
  },
  created() {
    const { start, end } = this.order.dates;
    const days = (Date.parse(end) - Date.parse(start)) / (1000 * 3600 * 24);
    this.totalPrice =
      Number(parseInt(days * this.order.stay.price)).toLocaleString() + ".00";
  },
  computed: {
    startDateToShow() {
      const currDate = new Date(this.order.dates.start);
      const year = currDate.getFullYear();
      const month = currDate.getMonth() + 1;
      const day = currDate.getDate();
      const dateToDisplay = day + "/" + month + "/" + currDate.getFullYear();
      return dateToDisplay;
    },
    endDateToShow() {
      const currDate = new Date(this.order.dates.end);
      const year = currDate.getFullYear();
      const month = currDate.getMonth() + 1;
      const day = currDate.getDate();
      const dateToDisplay = day + "/" + month + "/" + year;
      return dateToDisplay;
    },
  },
  methods: {
    approve() {
      console.log("approved");
      this.order.status = "approved";
      const order = JSON.parse(JSON.stringify(this.order));
      this.$store.dispatch({ type: "updateOrder", order });
    },
    decline() {
      console.log("declined");
      this.order.status = "declined";
      const order = JSON.parse(JSON.stringify(this.order));
      this.$store.dispatch({ type: "updateOrder", order });
    },
  },
};
</script>

<style>
</style>