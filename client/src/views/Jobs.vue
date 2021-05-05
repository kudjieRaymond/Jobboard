<template>
  <div class="hello">
    <!-- <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="-my-8 divide-y-2 divide-gray-100">
          <div
            class="py-8 flex flex-wrap md:flex-nowrap"
            v-for="job in jobs"
            :key="job._id" @click="showJob(job._id)"
          >
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="font-semibold title-font text-gray-700"
                >CATEGORY</span
              >
              <span class="mt-1 text-gray-500 text-sm"
                >Posted: {{ job.createdAt }}</span
              >
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                {{ job.title }}
              </h2>
              <p class="leading-relaxed">
                {{ job.description }}
              </p>
              <a class="text-indigo-500 inline-flex items-center mt-4"
                >Learn More
                <svg
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <section class="text-gray-600 body-font">
      <div class="container px-0 py-24 mx-auto">
        <div class="w-full pr-0">
          <table class="table-fixed text-left shadow-lg bg-white">
            <thead class="w-full pr-0">
              <tr>
                <th class="w-1/4 bg-blue-100 text-left px-8 py-4">Title</th>
                <th class="w-1/4 bg-blue-100 text-left px-8 py-4">
                  Description
                </th>
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
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Jobs",
  data() {
    return {
      jobs: [],
    };
  },
  created() {
    this.GetJobs();
  },
  computed: {
    ...mapGetters({ Jobs: "StateJobs", User: "StateUser" }),
  },
  methods: {
    ...mapActions(["GetJobs"]),
    // getAllJobs() {
    //   axios
    //     .get("jobs")
    //     .then((response) => {
    //       this.jobs = response.data;
    //     })
    //     .catch((e) => {
    //       alert(e);
    //     });
    // },
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table tbody tr:hover td {
  background-color: rgb(178, 240, 255);
}
</style>
