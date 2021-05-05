<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 class="title-font font-medium text-3xl text-gray-900">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </h1>
        <p class="leading-relaxed mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </p>
      </div>
      <div
        class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
      >
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
          Sign Up
        </h2>
        <div class="relative mb-4 text-left">
          <label for="firstname" class="leading-7 text-sm text-gray-600"
            >Firstname</label
          >
          <input
            type="text"
            id="firstname"
            v-model="firstname"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class="relative mb-4 text-left">
          <label for="lastname" class="leading-7 text-sm text-gray-600"
            >LastName</label
          >
          <input
            type="text"
            id="lastname"
            v-model="lastname"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div class="relative mb-4 text-left">
          <label for="email" class="leading-7 text-sm text-gray-600"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class="relative mb-4 text-left">
          <label for="password" class="leading-7 text-sm text-gray-600"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          @click.prevent="submit"
        >
          Login
        </button>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      errors: [],
    };
  },
  methods: {
    ...mapActions(["Register"]),

    async submit() {
      try {
        await this.Register({
          firstname: this.firstname,
          lastname: this.lastname,
          password: this.password,
          email: this.email,
        });
        this.$router.push("/jobs");
      } catch (err) {
        alert(err.response.data.message);
        console.log(err.response.data);
      }
    },

    // register() {
    //   console.log(this.firstname);
    //   axios
    //     .post("http://localhost:3000/register", {
    //       firstname: this.firstname,
    //       lastname: this.lastname,
    //       password: this.password,
    //       email: this.email,
    //     })
    //     .then(() => {
    //       alert("user logged in");
    //     })
    //     .catch((err) => {
    //       alert(err.data);
    //       console.log(err.data);
    //     });
    // },
  },
};
</script>