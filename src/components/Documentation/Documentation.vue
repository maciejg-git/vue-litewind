<template>
  <v-navbar class="px-4 py-3">
    <span class="text-lg font-bold">VueTailwind</span>
    <div class="inline-block ml-5">
      <a href="">Docs</a>
    </div>
  </v-navbar>
  <div class="container mx-auto lg:max-w-screen-xl">
    <div class="flex">
      <div class="sidebar hidden md:block flex-none sticky top-20 p-3">
        <ul class="list-unstyled ml-2">
          <li>
            <router-link
              to="/documentation/installation"
              active-class="active"
              class="transition-all"
            >
              Installation
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/styling"
              active-class="active"
              class="transition-all"
            >
              Styling
            </router-link>
          </li>
        </ul>

        <!-- components -->

        <h6>
          <router-link to="/documentation/components" class="transition-all">
            Components
          </router-link>
        </h6>
        <ul class="list-unstyled ml-2">
          <li>
            <router-link
              to="/documentation/table"
              active-class="active"
              class="transition-all"
            >
              Table
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/datepicker"
              active-class="active"
              class="transition-all"
            >
              Date Picker
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/button"
              active-class="active"
              class="transition-all"
            >
              Button
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/pagination"
              active-class="active"
              class="transition-all"
            >
              Pagination
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/badge"
              active-class="active"
              class="transition-all"
            >
              Badge
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/list"
              active-class="active"
              class="transition-all"
            >
              List
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/modal"
              active-class="active"
              class="transition-all"
            >
              Modal
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/tabs"
              active-class="active"
              class="transition-all"
            >
              Tabs
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/dropdown"
              active-class="active"
              class="transition-all"
            >
              Dropdown
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/card"
              active-class="active"
              class="transition-all"
            >
              Card
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/collapse"
              active-class="active"
              class="transition-all"
            >
              Collapse
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/spinner"
              active-class="active"
              class="transition-all"
            >
              Spinner
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/progress"
              active-class="active"
              class="transition-all"
            >
              Progress
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/sidepanel"
              active-class="active"
              class="transition-all"
            >
              Sidepanel
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/closebutton"
              active-class="active"
              class="transition-all"
            >
              Close button
            </router-link>
          </li>
          <!-- <li> -->
          <!--   <router-link to="/documentation/navbar" class="transition-all">Navbar</router-link> -->
          <!-- </li> -->
          <li>
            <router-link
              to="/documentation/popover"
              active-class="active"
              class="transition-all"
            >
              Popover
            </router-link>
          </li>
        </ul>

        <!-- directives -->

        <h6 class="mt-4">Directives</h6>
        <ul class="list-unstyled ml-2">
          <li>
            <router-link
              to="/documentation/tooltip"
              active-class="active"
              class="transition-all"
            >
              Tooltip
            </router-link>
          </li>
        </ul>
      </div>
      <div class="container mx-auto p-3 md:ml-10 w-full md:px-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import "highlight.js/styles/default.css";

export default {};
</script>

<style scoped>
h3 {
  @apply text-3xl;
  @apply font-semibold;
}
h4 {
  @apply text-2xl;
  @apply font-semibold;
}
h5 {
  @apply text-xl;
  @apply font-semibold;
}
h6 {
  @apply text-lg;
  @apply font-semibold;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 2em;
}
a.active {
  @apply inline-block font-semibold hover:bg-gray-100 py-1 pr-4 pl-4;
}
a {
  @apply inline-block hover:bg-gray-100 py-1 pr-4 pl-2;
}
.sidebar {
  height: calc(100vh - 5rem);
}
</style>
