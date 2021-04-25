<template>
  <div class="container">
    <div class="grid grid-cols-12">
      <div class="col-span-2 p-3">
        <ul class="list-unstyled">
          <li>
            <router-link to="/documentation/table">Table</router-link>
          </li>
          <li>
            <router-link to="/documentation/datepicker">Date Picker</router-link>
          </li>
          <li>
            <router-link to="/documentation/button">Button</router-link>
          </li>
          <li>
            <router-link to="/documentation/pagination">Pagination</router-link>
          </li>
          <li>
            <router-link to="/documentation/badge">Badge</router-link>
          </li>
          <li>
            <router-link to="/documentation/list">List</router-link>
          </li>
          <li>
            <router-link to="/documentation/modal">Modal</router-link>
          </li>
          <li>
            <router-link to="/documentation/spinner">Spinner</router-link>
          </li>
          <li>
            <router-link to="/documentation/tabs">Tabs</router-link>
          </li>
          <li>
            <router-link to="/documentation/dropdown">Dropdown</router-link>
          </li>
        </ul>
      </div>
      <div class="col-span-10 p-3">
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
