<template>
  <div class="stay-card">
        <div class="stay-card-header flex ">
          <img class="guest-img" :src="stay.imgUrls[0]" />
          <span class="card-key">{{ stay.name }}</span>
        </div>
        <div>
          <span class="card-key">Price per night:</span><span>$ {{ stay.price }}</span>
        </div>
        <div>
          <span class="card-key">Address:</span
          ><span>{{ stay.loc.country }} , {{ stay.loc.city }} </span>
        </div>
        <div>
          <span class="card-key">Property type:</span> <span>{{stay.propertyType}}</span>
        </div>
        <div>
          <span class="card-key">Capacity:</span> <span>{{stay.capacity}}</span>
        </div>
        <div class="card-actions flex space-between">
           <button class="clean-btn clickable " title="Edit">
                        <span class="material-icons-outlined">edit</span>
                      </button>
           <button class="clean-btn clickable " title="Delete">
                        <span class="material-icons-outlined">delete</span>
                      </button>
        
        </div>
      </div>
</template>

<script>
export default {
  name: "stay-cards",
  props: {
    stay: {
      type: Object,
      default: {},
    },
  },
  data(){
    return{
      // totalPrice: null,
    }
  },
  created() {
      // const { start, end } = this.stay.dates;
      // const days = (Date.parse(end) - Date.parse(start)) / (1000 * 3600 * 24);
      // this.totalPrice = Number(parseInt(days * this.stay.stay.price)).toLocaleString() + ".00"
      
        },
  computed: {
    // startDateToShow() {
    //   const currDate = new Date(this.stay.dates.start);
    //   const year = currDate.getFullYear();
    //   const month = currDate.getMonth() + 1;
    //   const day = currDate.getDate();
    //   const dateToDisplay = day + "/" + month + "/" + currDate.getFullYear();
    //   return dateToDisplay;
    // },
    // endDateToShow() {
    //   const currDate = new Date(this.stay.dates.end);
    //   const year = currDate.getFullYear();
    //   const month = currDate.getMonth() + 1;
    //   const day = currDate.getDate();
    //   const dateToDisplay = day + "/" + month + "/" + year;
    //   return dateToDisplay;
    // },
  },
  methods: {
    // approve() {
    //   console.log("approved");
    //   this.stay.status = "approved";
    //   const stay = JSON.parse(JSON.stringify(this.stay));
    //   this.$store.dispatch({ type: "updateOrder", stay });
    // },
    // decline() {
    //   console.log("declined");
    //   this.stay.status = "declined";
    //   const stay = JSON.parse(JSON.stringify(this.stay));
    //   this.$store.dispatch({ type: "updateOrder", stay });
    // },
  },
};
</script>

<style>
</style>