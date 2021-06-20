<template>
  <!-- <div class="container"> -->
    <div class="flex">
      <div class="flex-none sticky bg-gray-50 h-screen top-0 p-3 pl-7 pr-20">
        <h6>Components</h6>
        <ul class="list-unstyled">
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
        <ul class="list-unstyled">
          <li>
            <router-link to="/documentation/tooltip" class="transition-all">Tooltip</router-link>
          </li>
        </ul>
      </div>
      <div class="container mx-auto p-3 ml-10 pr-40 mr-60">
        <router-view></router-view>
      </div>
    </div>
  <!-- </div> -->
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
a {
  @apply inline-block hover:bg-gray-100 py-1 pl-2 pr-4;
}
</style>
