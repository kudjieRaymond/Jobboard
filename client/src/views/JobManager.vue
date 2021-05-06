<template>
  <section class="text-gray-600 body-font">
    <div class="container px-0 py-24 mx-auto flex">
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <table class="table-fixed text-left shadow-lg bg-white">
          <thead>
            <tr>
              <th class="w-1/4 bg-blue-100 text-left px-8 py-4">Title</th>
              <th class="w-1/4 bg-blue-100 text-left px-8 py-4">Description</th>
              <th class="w-1/4 bg-blue-100 text-left px-8 py-4">Company</th>
              <th class="w-1/4 bg-blue-100 text-left px-8 py-4">Salary</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="job in Jobs"
              :key="job._id"
              @click="showJob(job._id)"
              class="cursor-pointer border px-2 py-4"
            >
              <!-- <a href=""> -->
              <td class="px-4 py-4">{{ job.title }}</td>
              <td class="py-4">{{ stripText(job.description) }}</td>
              <td class="py-4">{{ job.company }}</td>
              <td class="py-4">{{ job.title }}</td>
              <!-- </a> -->
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
      >
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
          Create Job
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
            @click.prevent="storeJob"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      company: "",
      description: "",
      salary: "",
      url: "",
    };
  },
  created() {
    this.GetUserJobs();
    this.GetJobs();
  },
  computed: {
    ...mapGetters({ Jobs: "StateUserJobs", User: "StateUser" }),
  },
  methods: {
    ...mapActions(["CreateJob", "GetUserJobs", "GetJobs"]),

    stripText: function (description) {
      if (description.length > 40) {
        return description.slice(0, 40) + "...";
      }
      return description;
    },

    showJob(_id) {
      this.$router.push({
        name: "showJob",
        params: { id: _id },
      });
    },

    async storeJob() {
      const Job = {
        title: this.title,
        company: this.company,
        description: this.description,
        salary: this.salary,
        url: this.url,
      };
      try {
        await this.CreateJob(Job);
        alert("Job added successfully");
        this.$refs.jobForm.reset();
      } catch (err) {
        alert(err.response.data.message);
        console.log(err.response.data.message);
      }
    },
  },
};
</script>
<style scoped>
table tbody tr:hover td {
  background-color: rgb(178, 240, 255);
}
</style>