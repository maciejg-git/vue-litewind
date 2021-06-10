import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

import Documentation from '../components/Documentation/Documentation.vue'
import DocumentationTable from '../components/Documentation/DocumentationTable.vue'
import DocumentationDatePicker from '../components/Documentation/DocumentationDatePicker.vue'
import DocumentationList from '../components/Documentation/DocumentationList.vue'
import DocumentationModal from '../components/Documentation/DocumentationModal.vue'
import DocumentationPagination from '../components/Documentation/DocumentationPagination.vue'

const routes = [
  {
    path: '/',
    component: HelloWorld,
  },
  {
    path: '/documentation',
    component: Documentation,
    children: [
      {
        path: 'table',
        component: DocumentationTable,
      },
      {
        path: 'datepicker',
        component: DocumentationDatePicker,
      },
      {
        path: 'list',
        component: DocumentationList,
      },
      {
        path: 'modal',
        component: DocumentationModal,
      },
      {
        path: 'pagination',
        component: DocumentationPagination,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "font-semibold pl-2",
  routes
})

export default router
