<template>
  <section class="user-account main-layout2">
    <h1>personal info</h1>
    <section class="main-user-details flex">
        <section class="user-detials-info">
          <div class="user-details-header flex">
            <!-- <img
              src="~@/assets/images/review-avatar.png"
              alt=""
              class="host-img"
            /> -->
             <img
            class="host-img"
            :src="require(`@/assets/images/avatars/${currUser.imgUrl}.jpg`)"
          />
            <div class="review-preview-text-container">
              <h2>Hi, i'm {{ userFirstName }}</h2>
            </div>
          </div>
          <div class="full-name-container gray-box-shadow">
            <h4>Full name</h4>
            <p>{{ currUser.fullname }}</p>
          </div>
          <div class="user-name-container gray-box-shadow">
            <h4>User name</h4>
            <p>{{ currUser.username }}</p>
          </div>
          <div class="email-container gray-box-shadow">
            <h4>Email</h4>
            <p>{{ currUser.email }}</p>
          </div>
          <button class="edit-info-btn">Edit</button>
        
      </section>
      <section class="general-info-container">
        <div class="security info">
          <!-- <img src="" alt=""> -->
          <h3>Which details can be edited?</h3>
          <p>
            Details MiCasa uses to verify your identity can’t be changed.
            Contact info and some personal details can be edited, But we may ask
            you verify your identity the next time you book or create a listing.
          </p>
        </div>
        <div class="shared info">
          <!-- <img src="" alt=""> -->
          <h3>What info is shared with others?</h3>
          <p>
            MiCasa only releases contact information for hosts and guests after
            a reservation is confirmed. Your personal details will not be
            published
          </p>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { userService } from "../../services/user.service.js";

export default {
  name: "user-account",
  data() {
    return {
      currUser: null,
    };
  },
  created() {
    const user = userService.getLoggedinUser();
    this.currUser = user;
    // var isWish = user.wishList.filter((wish) => wish === this.stay._id);
    // if (isWish.length > 0) this.isLiked = true;
    // console.log(isWish, this.isLiked, this.stay._id);
  },
  computed: {
    userFirstName() {
      const firstNameEnd = this.currUser.fullname.indexOf(" ");
      const userFirstName = this.currUser.fullname.slice(0, firstNameEnd);
      return userFirstName;
    },
  },
};
</script>

<style>
</style>