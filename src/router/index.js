import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

import Documentation from '../components/Documentation/Documentation.vue'
import DocumentationTable from '../components/Documentation/DocumentationTable.vue'
import DocumentationDatePicker from '../components/Documentation/DocumentationDatePicker.vue'
import DocumentationList from '../components/Documentation/DocumentationList.vue'
import DocumentationModal from '../components/Documentation/DocumentationModal.vue'
import DocumentationTabs from '../components/Documentation/DocumentationTabs.vue'
import DocumentationSpinner from '../components/Documentation/DocumentationSpinner.vue'
import DocumentationCollapse from '../components/Documentation/DocumentationCollapse.vue'
import DocumentationBadge from '../components/Documentation/DocumentationBadge.vue'
import DocumentationDropdown from '../components/Documentation/DocumentationDropdown.vue'
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
      {
        path: 'tabs',
        component: DocumentationTabs,
      },
      {
        path: 'spinner',
        component: DocumentationSpinner,
      },
      {
        path: 'collapse',
        component: DocumentationCollapse,
      },
      {
        path: 'badge',
        component: DocumentationBadge,
      },
      {
        path: 'dropdown',
        component: DocumentationDropdown,
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
