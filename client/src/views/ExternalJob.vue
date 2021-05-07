<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex">
      <div class="">
        <span v-if="User">
          <router-link
            to="/admin/manage-jobs"
            class="inline-flex items-center bg-blue-100 border-0 py-1 px-3 focus:outline-none hover:bg-blue-200 rounded text-base mt-4 md:mt-0"
          >
            Back</router-link
          >
        </span>
        <span v-else>
          <router-link
            to="/"
            class="inline-flex items-center bg-blue-100 border-0 py-1 px-3 focus:outline-none hover:bg-blue-200 rounded text-base mt-4 md:mt-0"
          >
            Back</router-link
          >
        </span>
      </div>
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 bg-gray-50 px-5 py-5">
        <div class="px-5 py-24">
          <h2
            class="text-gray-900 font-medium title-font tracking-wider text-sm text-center"
          >
            Job Title : {{ job.title }}
          </h2>
          <h2>Company : {{ job.company }}</h2>
          <span
            class="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"
          ></span>
          <p
            class="leading-relaxed text-lg text-left"
            v-html="job.description"
          ></p>
          <p class="my-10 cursor-pointer">
            <a
              :href="job.url"
              target="blank"
              class="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg mx-4 my-4"
              >Apply</a
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: { id: String },
  computed: {
    ...mapGetters({ Jobs: "StateExternalJobs", User: "StateUser" }),
    job() {
      let job = {};
      job = this.Jobs.find((job) => {
        return job.id == this.id;
      });

      return job;
    },
  },
};
</script>