<template>
  <div class="container mx-auto">
    <div class="flex">
      <div class="hidden md:block flex-none sticky h-screen top-0 p-3 pl-7 pr-20">
        <ul class="list-unstyled ml-2">
          <li>
            <router-link to="/documentation/installation" class="transition-all">Installation</router-link>
          </li>
          <li>
            <router-link to="/documentation/styling" class="transition-all">Styling</router-link>
          </li>
        </ul>
        <h6>

          <router-link to="/documentation/components" class="transition-all">Components</router-link>
        </h6>
        <ul class="list-unstyled ml-2">
          <li>
            <router-link to="/documentation/table" class="transition-all">Table</router-link>
          </li>
          <li>
            <router-link to="/documentation/datepicker" class="transition-all">Date Picker</router-link>
          </li>
          <li>
            <router-link to="/documentation/button" class="transition-all">Button</router-link>
          </li>
          <li>
            <router-link to="/documentation/pagination" class="transition-all">Pagination</router-link>
          </li>
          <li>
            <router-link to="/documentation/badge" class="transition-all">Badge</router-link>
          </li>
          <li>
            <router-link to="/documentation/list" class="transition-all">List</router-link>
          </li>
          <li>
            <router-link to="/documentation/modal" class="transition-all">Modal</router-link>
          </li>
          <li>
            <router-link to="/documentation/tabs" class="transition-all">Tabs</router-link>
          </li>
          <li>
            <router-link to="/documentation/dropdown" class="transition-all">Dropdown</router-link>
          </li>
          <li>
            <router-link to="/documentation/card" class="transition-all">Card</router-link>
          </li>
          <li>
            <router-link to="/documentation/collapse" class="transition-all">Collapse</router-link>
          </li>
          <li>
            <router-link to="/documentation/spinner" class="transition-all">Spinner</router-link>
          </li>
          <li>
            <router-link to="/documentation/progress" class="transition-all">Progress</router-link>
          </li>
          <li>
            <router-link to="/documentation/sidepanel" class="transition-all">Sidepanel</router-link>
          </li>
          <li>
            <router-link to="/documentation/closebutton" class="transition-all">Close button</router-link>
          </li>
          <!-- <li> -->
          <!--   <router-link to="/documentation/navbar" class="transition-all">Navbar</router-link> -->
          <!-- </li> -->
          <li>
            <router-link to="/documentation/popover" class="transition-all">Popover</router-link>
          </li>
        </ul>
        <h6 class="mt-4">Directives</h6>
        <ul class="list-unstyled ml-2">
          <li>
            <router-link to="/documentation/tooltip" class="transition-all">Tooltip</router-link>
          </li>
        </ul>
      </div>
      <div class="container mx-auto p-3 md:ml-10 w-full md:w-8/12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import "highlight.js/styles/default.css";

export default {

}
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
</style>
