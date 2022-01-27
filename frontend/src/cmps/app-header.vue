<template>
  <section
    class="main-header"
    :class="{
      details: stayDetails,
      fullheader: !miniFilter && (homePage || explore),
      top: topOfPage,
      'explore-page': explore,
      'home-page': homePage,
    }"
  >
    <div
      class="notify-modal alert"
      :class="{ showNotes: notify }"
      @click="killModal"
    >
      <p>You have a new message!</p>
      <!-- <p v-if="lastNote">{{ lastNote.txt }}</p> -->
      <p>You order to Adadouf's house has been approved by Adi Adadouf.</p>
      <a href="#/dashboard">Show more</a>
    </div>
    <section class="main-header-container flex space-between">
      <div class="logo clickable flex align-center" @click.stop="goHome">
        <h1 class="logo-txt">Kumb</h1>
      </div>
      <button
        @click="miniFilter = !miniFilter"
        class="mini-filter flex space-between align-center clickable"
        :class="{ hide: !miniFilter, hideFilter }"
      >
        {{ currDest }} <span></span>
      </button>
      <div class="nav flex align-center justify-center">
        <router-link to="/explore">Explore</router-link>
        <router-link to="/host">Become a Host</router-link>
        <div class="notifications-container">
          <span
            class="material-icons notification-btn"
            @click="this.openNotifications"
          >
            notifications
          </span>
          <!-- <p v-if="notificationsCount > 0" class="notifications">
            {{ notificationsCount }}
          </p> -->
        </div>
        <!-- <div v-if="notify" class="notify-modal alert">
          <p>You have a new message!</p>
        </div> -->
        <div
          class="main-screen"
          v-if="this.isNotificationsModal"
          @click="this.openNotifications"
        ></div>

        <section
          class="notifications-modal-container"
          v-if="this.isNotificationsModal"
        >
          <div class="notifications-modal">
            <div class="header-notifi">Notifications</div>
            <div
              class="notifications-cards flex gray-box-shadow align-center"
              v-for="(notification, idx) in notifications"
              :key="idx"
            >
              <img :src="notification.from.imgUrl" alt="" class="host-img" />
              <div class="card-details">
                <div class="host-details">
                  {{ notification.from.stayName }}
                </div>

                <div class="notif-card">
                  <h4 class="notifications-card-txt">
                    {{ notification.txt }}
                  </h4>
                  <h5 class="notifications-timer">{{ getCreatedTime(idx) }}</h5>
                </div>
                <!-- <pre>{{ notifications }}</pre> -->
                <!-- <a class="trips-link" href="#/orders">Read More</a> -->
              </div>
            </div>
            <div class="no-notifications" v-if="notifications.length === 0">
              <div class="separator"></div>

              <div>You have no new notifications</div>
            </div>
          </div>
        </section>

        <button
          class="user-menu-btn clickable flex align-center clickable"
          @click="shouldShow = !shouldShow"
        >
          <span class="material-icons-round" v-if="!currUser">
            account_circle
          </span>
          <span v-else>
            <img
              v-if="currUser && !hasImg"
              class="avatar"
              :src="require('../assets/images/avatar.png')" />
            <img
              v-if="currUser && hasImg"
              class="avatar"
              :src="loggedinUser.imgUrl"
          /></span>
        </button>
      </div>
    </section>
    <div class="user-nav" v-if="shouldShow">
      <div class="user-nav2">
        <a href="#/login" v-if="!currUser">Log in</a>
        <a href="#/messages" class="a1" v-if="currUser">Messages</a>
        <a href="#/trips" class="a1" v-if="currUser">Trips</a>
        <a href="#/wishList" class="a1 gray-box-shadow" v-if="currUser"
          >Wish List</a
        >
        <!-- <a href="#/notifications" v-if="currUser">Notifications</a> -->
        <a href="#/host" v-if="!currUser || !loggedinUser.isHost"
          >Host your home</a
        >
        <a href="#/dashboard" v-if="currUser">Dashboard</a>
        <a href="#/account" class="gray-box-shadow" v-if="currUser">Account</a>
        <!-- <a href="#/help">Help</a> -->
        <a @click.stop="logout" class="clickable" v-if="currUser">Logout</a>
        <a href="#/about">About</a>
      </div>
    </div>
    <stay-filter :class="{ hide: miniFilter, hideFilter }" />
    <section class="mobile-nav">
      <router-link class="active" to="/explore">
        <span class="material-icons-outlined"> search </span>
        <p>Explore</p>
      </router-link>
      <a href="#/wishList">
        <span class="material-icons-outlined"> favorite_border </span>
        <p>Wishlist</p>
      </a>
      <a href="#/trips">
        <span class="trips"></span>
        <p>Trips</p>
      </a>
      <a>
        <span class="material-icons-outlined"> chat_bubble_outline </span>
        <p>Inbox</p>
        <p v-if="notificationsCount > 0" class="notifications">
          {{ notificationsCount }}
        </p>
      </a>
      <a href="#/account">
        <span class="material-icons-outlined"> account_circle </span>
        <p>Profile</p>
      </a>
    </section>
  </section>
</template>

<script>
import stayFilter from "../cmps/stay-cmps/stay-filter.vue";
import { socketService } from "../../services/socket.service.js";
import { showMsg } from "../../services/event-bus.service.js";
export default {
  data() {
    return {
      miniFilter: false,
      shouldShow: false,
      currPage: null,
      loggedinUser: null,
      hideFilter: false,
      topOfPage: true,
      isNotificationsModal: false,
    };
  },

  methods: {
    killModal() {
      this.$store.commit({ type: "killModal" });
    },
    logout() {
      this.loggedinUser = null;
      this.$store.dispatch({ type: "logout" });
      this.goHome();
      this.shouldShow = false;
    },
    goHome() {
      this.$router.push("/").catch(() => {});
    },
    handleScroll(event) {
      if (window.scrollY === 0) {
        this.miniFilter = false;
        this.topOfPage = true;
      } else {
        this.topOfPage = false;
      }
      if (window.scrollY > 50) this.miniFilter = true;
      if (this.currPage === "stayDetails") this.miniFilter = true;
    },
    closeModal() {
      this.shouldShow = !this.shouldShow;
    },
    openNotifications() {
      this.isNotificationsModal = !this.isNotificationsModal;
      console.log(this.notifications);
    },
    getCreatedTime(idx) {
      const currDate = new Date(this.notifications[idx].createdAt);
      const year = currDate.getFullYear();
      const month = currDate.getMonth() + 1;
      const day = currDate.getDate();
      const hours = currDate.getHours();
      const minutes = currDate.getMinutes();

      console.log(currDate);

      return day + "/" + month + "/" + year + " , " + hours + ":" + minutes;
    },
  },
  computed: {
    lastNote() {
      if (this.$store.getters.lastNotification) {
        return this.$store.getters.lastNotification;
      } else return "";
    },
    notify() {
      return this.$store.getters.notify;
    },
    notifications() {
      return this.$store.getters.notifications;
    },
    notificationsCount() {
      return this.$store.getters.notificationsCount;
    },

    hasImg() {
      var user = this.$store.getters.loggedinUser;
      return user && user.imgUrl !== null ? true : false;
    },
    currUser() {
      var user = this.$store.getters.loggedinUser;
      return user ? true : false;
    },
    currDest() {
      var dest = this.$store.getters.getDest;
      if (!dest) return "Start your search";
      else return dest;
    },
    stayDetails() {
      // console.log(this.currPage);
      if (this.currPage === "stayDetails") return true;
      else return false;
    },
    explore() {
      // console.log(this.currPage);
      if (this.currPage === "explore") return true;
      else return false;
    },
    homePage() {
      // console.log(this.currPage);
      if (this.currPage === "homePage") return true;
      else return false;
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.loggedinUser = this.$store.getters.loggedinUser;
  },
  updated() {
    this.loggedinUser = this.$store.getters.loggedinUser;
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    stayFilter,
    showMsg,
  },
  watch: {
    "$store.state.currPage": {
      handler() {
        this.shouldShow = false;
        this.currPage = this.$store.getters.currPage;
        this.miniFilter =
          this.currPage !== "homePage" && this.currPage !== "explore";
        this.hideFilter =
          this.currPage !== "homePage" &&
          this.currPage !== "explore" &&
          this.currPage !== "stayDetails";
      },
      immediate: true,
      deep: true,
    },
    $route: {
      handler() {
        this.shouldShow = false;
      },
    },
  },
};
</script>

<style>
</style>