
<template>
  <!--  -->
  <section class="main-layout2 dashboard-page">
    <!-- <p>{{myOrders}}</p> -->
    <section class="dashboard-container flex space-between column">
      

      <section class="dash-main-container flex column">
        <section class="dash-header flex space-between">
          <div class="dash-nav flex column space-evenly">
            <div class="header-menu">
              <button
                value="my Stays"
                @click="showMyStays()"
                class="clean-btn clickable"
              >
                <span class="material-icons"> cottage</span>
                My Stays
              </button>
            </div>
            <div class="header-menu">
              <button
                value="orders"
                @click="showMyOrders()"
                class="clean-btn clickable"
              >
                <span class="material-icons">list_alt</span>
                My Orders
              </button>
            </div>
          </div>
          <div class="stats-container flex space-between">
            <div class="total-rate dash-div">
              <h3>Total Rate</h3>
              <div class="flex space-between column rates-data">
                <div>
                  <span class="flex">
                    <i class="fa fa-star" aria-hidden="true"></i
                    >{{ totalRateAvg }} <small class="avg"> avg</small></span
                  >
                </div>
                <div class="flex space-between">
                  <span>{{ totalRateCount }} <small>reviews</small></span>
                </div>
                <!-- <p>
                4%<i class="fa fa-long-arrow-alt-up" aria-hidden="true"></i>
              </p> -->
              </div>
            </div>

            <div class="dash-div">
              <h3>Total revenues</h3>
              <div>
                <!-- <span>$ {{ totalEarningToShow }}</span> -->
                <table>
                  <tr>
                    <td title="Past month">Month</td>
                    <td title="Past year">Year</td>
                    <td title="All revenues">Total</td>
                  </tr>
                  <tr>
                    <td class="nums-td">${{ monthEarningToShow }}</td>
                    <td class="nums-td">${{ yearEarningToShow }}</td>
                    <td class="nums-td">${{ totalEarningToShow }}</td>
                  </tr>
                </table>
              </div>
              <!-- <div>
              <span>{{totalOrders}} hosts</span>
            </div> -->
            </div>
            <div class="orders-div dash-div">
              <h3>Orders</h3>
              <div class="flex column">
                <!-- <span>{{ totalOrders }}</span> -->
                <table>
                  <tr>
                    <td>Total</td>
                    <td>Pending</td>
                    <td>Approved</td>
                    <td>Declined</td>
                  </tr>
                  <tr>
                    <td class="nums-td">{{ totalOrders }}</td>
                    <td class="nums-td">{{ pendingOrders }}</td>
                    <td class="nums-td">{{ approvedOrders }}</td>
                    <td class="nums-td">{{ declinedOrders }}</td>
                  </tr>
                  <!--<tr>
                </tr>
                <tr>
                </tr> -->
                </table>
                <!-- <div class="circle-container flex column">
                <div class="flex align-center space-around">
                  <span title="approved" class="circle green-circle"></span>
                  <p>{{ approvedOrders }}</p>
                </div>
                <div class="flex align-center space-around">
                  <span title="pending" class="circle yellow-circle"></span>
                  <p>{{ pendingOrders }}</p>
                </div>
                <div class="flex align-center space-around">
                  <span title="decline" class="circle red-circle"></span>
                  <p>{{ declinedOrders }}</p> -->
                <!-- </div> -->
                <!-- </div> -->
              </div>
            </div>
            <div class="dash-div">
              <div>
                <h3>Guests</h3>
                <span></span>
                <table>
                  <tr>
                    <td>Active</td>
                    <td>Past</td>
                    <td>Planned</td>
                  </tr>
                  <tr>
                    <td class="nums-td">{{ activeGuests }}</td>
                    <td class="nums-td">{{ pastGuests }}</td>
                    <td class="nums-td">{{ plannedGuests }}</td>
                  </tr>
                </table>
              </div>

              <!-- <div>
              <img
                v-for="(guest, id) in activeGuests"
                :key="id"
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="guest"
                class="host-img"
              />
            </div> -->
            </div>
          </div>
        </section>

        <section class="dash-info-container">
          <section class="host-stay-container">
            <section class="host-stay-list" v-if="shouldShow === 'my stays'">
              <div class="host-stay-list-table">
                <div class="thead">
                  <div class="thead-container gray-box-shadow">
                    <!-- flex space-evenly align-center -->
                    <span class="guest-img"></span>
                    <span>Name</span>
                    <span>Price per night</span>
                    <span>Address</span>
                    <span class="stay-actions">Actions</span>
                  </div>
                </div>

                <!-- for in
                      v-for="stay in myStays" :key="stay._id" > -->
                <div class="tbody">
                  <div
                    class="host-stay-preview gray-box-shadow"
                    v-for="stay in myStays"
                    :key="stay.id"
                  >
                    <span class="flex align-center">
                      <img :src="stay.imgUrls[0]" alt="" class="stay-icon" />
                    </span>
                    <span>
                      <!-- fix hrefs -->
                      <a href="#/stay/60b624e305f90634a567b2ac">{{
                        stay.name
                      }}</a>
                    </span>
                    <span>
                      <a href="#/stay/60b624e305f90634a567b2ac"
                        >$ {{ stay.price }}</a
                      >
                    </span>
                    <span>
                      <a href="#/stay/60b624e305f90634a567b2ac"
                        >{{ stay.loc.country }} , {{ stay.loc.city }}</a
                      >
                    </span>
                    <span class="stay-actions">
                      <button class="clean-btn clickable">
                        <i class="fa fa-edit" aria-hidden="true"></i>Edit
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section class="host-order-list" v-if="shouldShow === 'my orders'">
              <section class="host-order-container" v-loading="loading">
                <section class="host-order-list">
                  <div class="host-order-list-table">
                    <div class="thead">
                      <div class="thead-container gray-box-shadow">
                        <span class="guest-img"></span>
                        <span>Guest name</span>
                        <span>Stay name</span>
                        <span>Check in - check out</span>
                        <!-- <span>Check out</span> -->
                        <span>Status</span>
                        <span>Revenue</span>
                        <span>Actions</span>
                      </div>
                    </div>
                    <div class="tbody">
                      <!-- for in
                      v-for="order in myOrders" :key="order._id" > -->

                      <!-- <div
                        v-for="order in myOrders"
                        :key="order._id"
                        class="host-stay-preview"
                      > -->
                      <order-data
                        :order="order"
                        class="host-stay-preview gray-box-shadow"
                        v-for="order in myOrders"
                        :key="order._id"
                      />
                      <!-- <span >
                          <img class="host-img" :src="order.buyer.imgUrl" />
                        </span>
                        <span>{{ order.buyer.fullname }}</span>
                        <span>{{ order.dates.start }}</span>
                        <span>{{ order.dates.end }}</span>
                        <span>{{ order.status }}</span>
                        <span>$ {{ order.stay.price }}</span>
                        <span class="stay-actions flex align-center">
                          <button class="clean-btn clickable">
                            <i class="fa fa-check" aria-hidden="true"></i
                            >Re-Approve
                          </button>
                        </span> -->
                      <!-- </div> -->
                      <!-- <div class="host-stay-preview">
                        <span>
                        <img src="https://randomuser.me/api/portraits/women/61.jpg" alt="user">
                        </span>
                        <span>Krystal Jason</span>
                        <span>Sun Aug 01 2021</span>
                        <span>Sat Aug 07 2021</span>
                        <span>declined</span>
                        <span>$ 1,920</span>
                        <span class="stay-actions">
                          <button>
                          <i class="fas fa-check" aria-hidden="true">
                          </i>Re-Approve</button>
                        </span>
                      </div> -->
                    </div>
                  </div>
                </section>
              </section>
            </section>
            <!-- <section class="host-rates" v-if="shouldShow === 'my rates'"> -->
            <!-- <h1>rates</h1>
            </section> -->
          </section>
        </section>
      </section>
      <!-- /////////// -->
      <section class="cards-container flex column space-between align-center">
       <div v-if="shouldShow === 'my orders'">
        <h1>My orders</h1>
      <order-cards
                        :order="order"
                        
                        v-for="order in myOrders"
                        :key="order._id"
                      />
       </div>
       <div v-if="shouldShow === 'my stays'">
        <h1>My stays</h1>
      <stay-cards
                        :stay="stay"
                        
                        v-for="stay in myStays"
                        :key="stay._id"
                      />
       </div>
      </section>
      <!-- <div class="order-card">
        <div class="order-card-header flex space-evenly">
          <img class="guest-img" :src="order.buyer.imgUrl" />
          <span>{{ order.buyer.fullname }}</span>
        </div>
        <div>
          <span>Status:</span><span>{{ order.status }}</span>
        </div>
        <div>
          <span>Dates:</span
          ><span>{{ startDateToShow }} - {{ endDateToShow }} </span>
        </div>
        <div>
          <span>Revenue:</span> <span>$ {{ this.totalPrice }}</span>
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
      </div> -->
      <!-- ////////////////// -->
    </section>
  </section>
</template>

<script>
import orderData from "@/cmps/stay-cmps/order-data.vue";
import orderCards from "@/cmps/stay-cmps/order-cards.vue";
import stayCards from "@/cmps/stay-cmps/stay-cards.vue";

export default {
  name: "host-dashboard",
  components: {
    orderData,
    orderCards,
    stayCards
  },
  data() {
    return {
      currUser: null,
      shouldShow: "my orders",
      allOrders: [],
      myOrders: [],
      allStays: [],
      myStays: [],
    };
  },
  created() {
    const page = "hostDashboard";
    this.$store.commit({ type: "setCurrPage", page });
    // this.$store.dispatch({ type: "loadOrders" });
    // this.myOrders = this.getDemoOrders
    this.currUser = this.$store.getters.loggedinUser;
    console.log(this.currUser);
    this.allOrders = this.$store.getters.getOrders;
    console.log(this.allOrders);
    this.myOrders = this.userOrders;
    this.allStays = this.getAllStays;
    this.userStays;
    // this.dateToShow
  },
  computed: {
    loading() {
      this.$store.getters.isLoading;
    },
    getDemoOrders() {
      return this.$store.getters.getDemoOrders;
    },
    // getOrders() {
    //   return this.$store.getters.getOrders;
    // },
    getUser() {
      return this.$store.getters.loggedinUser;
    },
    getAllStays() {
      const stays = this.$store.getters.staysToShow;
      return stays;
    },
    userStays() {
      this.allStays.forEach((stay) => {
        const stayHost = stay.host.fullname;
        // console.log('host', stayHost)
        // console.log('user', this.currUser.fullname)
        if (this.currUser.fullname === stayHost) {
          // console.log('adding')
          this.myStays.push(stay);
        }
      });
    },
    userOrders() {
      // console.log(this.allOrders)
      var currUserOrders = [];
      console.log(this.allOrders);
      this.allOrders.forEach((order) => {
        const orderHostId = order.host._id;
        console.log("userid", this.currUser._id, "hostid", orderHostId);
        // console.log('host', stayHost)
        // console.log('user', this.currUser.fullname)
        if (this.currUser._id === orderHostId) {
          // console.log('adding')
          console.log(order.dates);
          currUserOrders.push(order);
        }
      });
      console.log(currUserOrders);
      currUserOrders.sort(function (a, b) {
        return new Date(b.dates.start) - new Date(a.dates.start);
      });

      return currUserOrders;
    },
    totalRateAvg() {
      var count = 0;
      var sum = 0;
      this.myStays.forEach((stay) => {
        // console.log(count , stay.reviews)
        stay.reviews.forEach((review) => {
          const reviewRatings = Object.values(review.rate);
          count += reviewRatings.length;
          // console.log('array ratings', reviewRatings)
          var currSum = reviewRatings.reduce(
            (sumRate, rating) => sumRate + rating,
            0
          );
          sum += currSum;
        });
      });
      // console.log('sum', sum , 'count', count)
      return (sum / count).toFixed(1);
    },
    totalRateCount() {
      var count = 0;
      // var sum = 0;
      this.myStays.forEach((stay) => {
        // console.log(count , stay.reviews)
        stay.reviews.forEach((review) => {
          const reviewRatings = Object.values(review.rate);
          count++;
          // console.log('array ratings', reviewRatings)
          // var currSum = reviewRatings.reduce(
          //   (sumRate, rating) => sumRate + rating,
          //   0
          // );
          // sum += currSum;
        });
      });
      // console.log('sum', sum , 'count', count)
      return count;
    },
    totalOrders() {
      return this.myOrders.length;
    },
    pendingOrders() {
      var ordersToShowCount = 0;
      if (this.myOrders.length > 0) {
        this.myOrders.forEach((order) => {
          if (order.status === "pending") {
            ordersToShowCount++;
          }
        });
        return ordersToShowCount;
      }
    },
    approvedOrders() {
      var ordersToShowCount = 0;
      if (this.myOrders.length > 0) {
        this.myOrders.forEach((order) => {
          if (order.status === "approved") {
            ordersToShowCount++;
          }
        });
      }
      return ordersToShowCount;
    },
    declinedOrders() {
      var ordersToShowCount = 0;
      if (this.myOrders.length > 0) {
        this.myOrders.forEach((order) => {
          if (order.status === "declined") {
            ordersToShowCount++;
          }
        });
      }
      return ordersToShowCount;
    },
    totalEarningToShow() {
      var ordersPrice = [];
      // var ordersDates=[]
      if (this.myOrders.length > 0) {
        this.myOrders.forEach((order) => {
          // console.log('toshow', order)
          const { start, end } = order.dates;
          const days =
            (Date.parse(end) - Date.parse(start)) / (1000 * 3600 * 24);
          const CURRORDERPRICE = parseInt(days * order.stay.price);
          // console.log(CURRORDERPRICE)
          ordersPrice.push(CURRORDERPRICE);
        });
      }
      // console.log('prices', ordersPrice)
      var sum = ordersPrice.reduce((sum, price) => sum + price, 0);
      // var sum = 100000
      // Number(sum).toLocaleString()
      return Number(sum).toLocaleString();
    },
    yearEarningToShow() {
      var ordersPrice = [];
      if (this.myOrders.length > 0) {
        this.myOrders.forEach((order) => {
          const currYear = new Date().getFullYear() + "";
          const orderYear = order.dates.start.slice(
            0,
            order.dates.start.indexOf("-")
          );
          if (orderYear === currYear) {
            const { start, end } = order.dates;
            const days =
              (Date.parse(end) - Date.parse(start)) / (1000 * 3600 * 24);
            const CURRORDERPRICE = parseInt(days * order.stay.price);
            ordersPrice.push(CURRORDERPRICE);
          }
        });
      }
      var sum = ordersPrice.reduce((sum, price) => sum + price, 0);

      return Number(sum).toLocaleString();
    },
    monthEarningToShow() {
      var ordersPrice = [];
      const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      const d = new Date();
      const currMonth = months[d.getMonth()];
      if (this.myOrders.length > 0) {
        this.myOrders.forEach((order) => {
          const orderMonth = order.dates.start.split("-")[1];
          if (orderMonth === currMonth) {
            const { start, end } = order.dates;
            const days =
              (Date.parse(end) - Date.parse(start)) / (1000 * 3600 * 24);
            const CURRORDERPRICE = parseInt(days * order.stay.price);
            ordersPrice.push(CURRORDERPRICE);
          }
        });
      }
      var sum = ordersPrice.reduce((sum, price) => sum + price, 0);
      return Number(sum).toLocaleString();
    },
    activeGuests() {
      var activeGuestsCount = 0;
      if (this.myOrders.length > 0) {
        this.myOrders.forEach((order) => {
          const { start, end } = order.dates;
          // console.log(start , end)
          var now = Date.now();
          var orderStart = Date.parse(start);
          var orderEnd = Date.parse(end);
          // console.log(now, orderStart, orderEnd  )
          if (now <= orderEnd && now >= orderStart) {
            activeGuestsCount++;
          } else {
            // console.log("order not active");
          }
        });
      }
      // console.log("active", activeGuestsCount);
      return activeGuestsCount;
    },
    plannedGuests() {
      var plannedGuestsCount = 0;
      if (this.myOrders.length > 0) {
        this.myOrders.forEach((order) => {
          const { start, end } = order.dates;
          // console.log(start , end)
          var now = Date.now();
          var orderStart = Date.parse(start);
          var orderEnd = Date.parse(end);
          // console.log(now, orderStart, orderEnd  )
          if (now < orderStart) {
            plannedGuestsCount++;
          } else {
            // console.log("order not active");
          }
        });
      }
      // console.log("active", activeGuestsCount);
      return plannedGuestsCount;
    },
    pastGuests() {
      var pastGuestsCount = 0;
      if (this.myOrders.length > 0) {
        this.myOrders.forEach((order) => {
          const { start, end } = order.dates;
          // console.log(start , end)
          var now = Date.now();
          var orderStart = Date.parse(start);
          var orderEnd = Date.parse(end);
          // console.log(now, orderStart, orderEnd  )
          if (now > orderEnd) {
            pastGuestsCount++;
          } else {
            // console.log("order not active");
          }
        });
      }
      // console.log("active", activeGuestsCount);
      return pastGuestsCount;
    },
  },
  methods: {
    showMyStays() {
      this.shouldShow = "my stays";
      // console.log(this.shouldShow);
    },
    showMyOrders() {
      this.shouldShow = "my orders";
      // console.log(this.shouldShow);
    },
    showMyRates() {
      this.shouldShow = "my rates";
      // console.log(this.shouldShow);
    },
  },
};
</script>

<style>
</style>