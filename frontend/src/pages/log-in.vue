<template>
  <main class="login-container">
    <p></p>
    <section v-if="!this.newUser" class="login-form-container flex column">
      <form class="login-form" @submit.prevent="login">
        <div class="login-form-header">
          <h2>Log in</h2>
        </div>
        <div class="login-form-body flex column">
          <h1>Welcome back</h1>
          <input
            type="text"
            class="login-input"
            name="username"
            autocomplete="off"
            placeholder="Username"
            v-model="loginCred.username"
          />
          <input
            type="password"
            class="login-input"
            name="password"
            autocomplete="off"
            placeholder="Password"
            v-model="loginCred.password"
          />
          <p>{{ msg }}</p>
          <button type="submit" class="login-btn clickable">Submit</button>
          <div class="login-actions-btns flex space-between">
            <button
              type="button"
              class="toggle-form-btn actions-btn"
              @click="toggleForm()"
            >
              New user
            </button>
            <!-- <button type="button" class="forgot-password-btn actions-btn">
              Forgot Password
            </button> -->
          </div>
        </div>
      </form>
    </section>
    <section v-else class="login-form-container flex column">
      <form class="login-form" @submit.prevent="doSignup">
        <div class="login-form-header">
          <h2>Sign up</h2>
        </div>
        <div class="login-form-body flex column">
          <h1>Welcome to Kumba</h1>
          <input
            type="text"
            class="login-input"
            name="fullname"
            placeholder="Full name"
            v-model="signupCred.fullname"
          />
          <input
            name="password"
            class="login-input"
            type="password"
            placeholder="Password"
            autocomplete="current-password"
            v-model="signupCred.password"
          />
          <input
            type="text"
            class="login-input"
            name="username"
            placeholder="Username"
            autocomplete="username"
            v-model="signupCred.username"
          />
          <input
            type="text"
            class="login-input"
            name="email"
            placeholder="Email"
            autocomplete="Email"
            v-model="signupCred.email"
          />
          <p>{{ msg }}</p>
          <button class="login-btn clickable" type="submit">Sign up</button>
          <div class="login-actions-btn flex space-between">
            <button
              type="button"
              class="toggle-form-btn actions-btn"
              @click="toggleForm()"
            >
              I already have an account
            </button>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: "log-in",

  data() {
    return {
      msg: "",
      newUser: false,
      loggedinUser: {
        nickname: null,
      },
      loginCred: { username: "", password: "" },
      signupCred: { username: "", password: "", fullname: "", email: "" },
    };
  },
  created() {
    const page = "login";
    this.$store.commit({ type: "setCurrPage", page });
  },
  methods: {
    toggleForm() {
      this.newUser = !this.newUser;
      this.msg = "";
    },
    async login() {
      if (!this.loginCred.username || !this.loginCred.password) {
        this.msg = "Please enter name and password";
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.msg = "Failed to login";
      }
    },
    logout() {
      userService.logoutUser();
      this.loggedinUser.nickname = null;
      this.loggedin = !this.loggedin;
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username ||
        !this.signupCred.email
      ) {
        this.msg = "Please fill up the form";
        return;
      }
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>
