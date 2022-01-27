<template>
  <div>
    <span class="flex align-center">
      <!-- <img src="https://randomuser.me/api/portraits/women/16.jpg" alt="user" class="host-img"/> -->
      <img class="guest-img" :src="order.buyer.imgUrl" />
    </span>
    <span>{{ order.buyer.fullname }}</span>
    <span>{{order.stay.name}}</span>
    <span>{{ startDateToShow }} - {{ endDateToShow }} </span>
    <!-- <span>{{ endDateToShow }}</span> -->
    <span class="capitalize">{{ order.status }}</span>
    <span>$ {{ this.totalPrice}}</span>


    <section class="pre-approved">


      <button class="approve-btn" @click="approve" v-if="this.order.status === 'pending'">Approve</button>
      <button class="decline-btn" @click="decline" v-if="this.order.status === 'pending'">Decline</button>
      <button class="approve-btn" @click="approve" v-if="this.order.status === 'declined'">Approve</button>
      <button class="decline-btn" @click="decline" v-if="this.order.status === 'approved'">Decline</button>
    </section>


    <!-- <span class="stay-actions flex align-center space-evenly">
      <button class="clean-btn clickable" @click="approve">
        <i class="fa fa-check" aria-hidden="true"></i>
      </button>
      <button class="clean-btn clickable" @click="decline">
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
    </span> -->
  </div>
</template>

<script>
export default {
  name: "order-data",
  props: {
    order: {
      type: Object,
      default: {},
    },
  },
  data(){
    return{
      totalPrice: null,
    }
  },
  created() {
      const { start, end } = this.order.dates;
      const days = (Date.parse(end) - Date.parse(start)) / (1000 * 3600 * 24);
      this.totalPrice = Number(parseInt(days * this.order.stay.price)).toLocaleString() + ".00"
      
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