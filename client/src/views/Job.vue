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
      <div
        class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 text-center bg-gray-50 px-5 py-5"
      >
        <div class="flex justify-end" v-if="User">
          <button
            class="text-white bg-yellow-500 border-0 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-lg mx-4"
            @click.prevent="fillForm(job)"
          >
            Update
          </button>
          <button
            class="text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-lg"
            @click.prevent="deleteJob(job._id)"
          >
            Delete
          </button>
        </div>
        <div class="px-5 py-24">
          <h2
            class="text-gray-900 font-medium title-font tracking-wider text-sm"
          >
            Job Title : {{ job.title }}
          </h2>
          <h2>Company : {{ job.company }}</h2>
          <h2 class="text-gray-500">Salary Range : {{ job.salary }}</h2>
          <span
            class="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"
          ></span>
          <p class="leading-relaxed text-lg">
            {{ job.description }}
          </p>
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
      <div
        class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
        v-if="User"
      >
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
          Update Job
        </h2>
        <form ref="jobForm">
          <div class="relative mb-4 text-left">
            <label for="company" class="leading-7 text-sm text-gray-600"
              >Company</label
            >
            <input
              type="text"
              id="company"
              v-model="company"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <div class="relative mb-4 text-left">
            <label for="title" class="leading-7 text-sm text-gray-600"
              >Title</label
            >
            <input
              type="text"
              id="title"
              v-model="title"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4 text-left">
            <label for="title" class="leading-7 text-sm text-gray-600"
              >Job Url</label
            >
            <input
              type="text"
              id="title"
              v-model="url"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div class="relative mb-4 text-left">
            <label for="salary" class="leading-7 text-sm text-gray-600"
              >Salary Range</label
            >
            <input
              type="salary"
              id="salary"
              v-model="salary"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4 text-left">
            <label for="password" class="leading-7 text-sm text-gray-600"
              >Job Description</label
            >
            <textarea
              id="description"
              v-model="description"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button
            class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            @click.prevent="update(job._id)"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: { id: String },
  data() {
    return {
      title: "",
      company: "",
      description: "",
      salary: "",
      url: "",
    };
  },
  computed: {
    ...mapGetters({ Jobs: "StateJobs", User: "StateUser" }),
    job() {
      let job = {};
      job = this.Jobs.find((job) => {
        return job._id == this.id;
      });

      return job;
    },
  },
  methods: {
    ...mapActions(["DestroyJob", "updateJob"]),

    async deleteJob(id) {
      try {
        await this.DestroyJob(id);
        this.$router.push("/admin/manage-jobs");
      } catch (err) {
        alert(err.response.data.message);
        console.log(err.response.data.message);
      }
    },

    fillForm(job) {
      this.title = job.title;
      this.description = job.description;
      this.salary = job.salary;
      this.company = job.company;
      this.url = job.url;
    },

    async update(id) {
      const job = {
        id: id,
        title: this.title,
        company: this.company,
        description: this.description,
        salary: this.salary,
        url: this.url,
      };
      try {
        await this.updateJob(job);
        alert("Job updated successfully");
      } catch (err) {
        alert(err.response.data.message);
        console.log(err.response.data.message);
      }
    },
  },
};
</script>