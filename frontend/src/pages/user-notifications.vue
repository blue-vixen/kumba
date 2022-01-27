<template>
  <section class="notifications-page main-layout2">
    <h1 class="notifications-header">My notifications</h1>
    <section class="notifications-list flex column">
      <div class="notifications-container">
        <div
          class="
            notifications-card
            flex
            space-between
            gray-box-shadow
            align-center
          "
          v-for="(notification, idx) in notifications"
          :key="idx"
        >
          <img :src="notification.from.imgUrl" alt="" class="host-img" />
          <span class="flex column">
            <h3>{{ notification.from.fullname }}</h3>
            <!-- <h4>{{notification.createdAt}}</h4> -->
          </span>
          <h4 class="notifications-card-txt">
            {{ notification.txt }}
          </h4>
          <!-- <pre>{{ notifications }}</pre> -->
          <a class="trips-link" href="#/orders">Read More</a>
        </div>
      </div>
      <button class="clear-all-btn clickable">Clear all</button>
    </section>
  </section>
</template>

<script>
export default {
  name: "user-notifications",
  data() {
    return {
      notifications,


    };
  },
  computed: {
    notifications() {
      return this.$store.getters.notifications;
    },
    dateToShow(notification) {
      const currDate = new Date(notification.createdAt);
      const year = currDate.getFullYear();
      const month = currDate.getMonth() + 1;
      const day = currDate.getDate();
      const dateToDisplay = day + "/" + month + "/" + year;
      return dateToDisplay;
    },
  },
  created() {
    const page = "notifications";
    this.$store.commit({ type: "setCurrPage", page });
  },
};
</script>

<style>
</style>