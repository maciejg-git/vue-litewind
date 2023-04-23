import { createRouter, createWebHistory } from "vue-router";

import Documentation from "../documentation/pages/Documentation.vue";

const DocumentationInstall = () => import('../documentation/pages/DocumentationInstall.vue')

const DocumentationComponents = () => import('../documentation/pages/DocumentationComponents.vue')

const DocumentationTable = () => import('../documentation/pages/DocumentationTable.vue')
const DocumentationDatePicker = () => import('../documentation/pages/DocumentationDatePicker.vue')
const DocumentationList = () => import('../documentation/pages/DocumentationList.vue')
const DocumentationModal = () => import('../documentation/pages/DocumentationModal.vue')
const DocumentationTabs = () => import('../documentation/pages/DocumentationTabs.vue')
const DocumentationTab = () => import('../documentation/pages/DocumentationTab.vue')
const DocumentationSpinner = () => import('../documentation/pages/DocumentationSpinner.vue')
const DocumentationCollapse = () => import('../documentation/pages/DocumentationCollapse.vue')
const DocumentationBadge = () => import('../documentation/pages/DocumentationBadge.vue')
const DocumentationDropdown = () => import('../documentation/pages/DocumentationDropdown.vue')
const DocumentationDropdownMenuItem = () => import('../documentation/pages/DocumentationDropdownMenuItem.vue')
const DocumentationPagination = () => import('../documentation/pages/DocumentationPagination.vue')
const DocumentationCard = () => import('../documentation/pages/DocumentationCard.vue')
const DocumentationButton = () => import('../documentation/pages/DocumentationButton.vue')
const DocumentationChip = () => import('../documentation/pages/DocumentationChip.vue')
const DocumentationPopover = () => import('../documentation/pages/DocumentationPopover.vue')
const DocumentationProgress = () => import('../documentation/pages/DocumentationProgress.vue')
const DocumentationSidepanel = () => import('../documentation/pages/DocumentationSidepanel.vue')
const DocumentationAlert = () => import('../documentation/pages/DocumentationAlert.vue')
const DocumentationInput = () => import('../documentation/pages/DocumentationInput.vue')
const DocumentationTextarea = () => import('../documentation/pages/DocumentationTextarea.vue')
const DocumentationRadio = () => import('../documentation/pages/DocumentationRadio.vue')
const DocumentationCheckbox = () => import('../documentation/pages/DocumentationCheckbox.vue')
const DocumentationNavbar = () => import('../documentation/pages/DocumentationNavbar.vue')
const DocumentationRange = () => import('../documentation/pages/DocumentationRange.vue')
const DocumentationBreadcrumb = () => import('../documentation/pages/DocumentationBreadcrumb.vue')
const DocumentationChevron = () => import('../documentation/pages/DocumentationChevron.vue')
const DocumentationFormText = () => import('../documentation/pages/DocumentationFormText.vue')
const DocumentationSelect = () => import('../documentation/pages/DocumentationSelect.vue')
const DocumentationTree = () => import('../documentation/pages/DocumentationTree.vue')
const DocumentationClosebutton = () => import('../documentation/pages/DocumentationClosebutton.vue')
const DocumentationIcon = () => import('../documentation/pages/DocumentationIcon.vue')
const DocumentationDivider = () => import('../documentation/pages/DocumentationDivider.vue')
const DocumentationTrigger = () => import('../documentation/pages/DocumentationTrigger.vue')
const DocumentationTooltip = () => import('../documentation/pages/DocumentationTooltip.vue')
const DocumentationFormValidation = () => import('../documentation/pages/DocumentationFormValidation.vue')

const routes = [
  {
    path: "/",
    redirect: "/documentation/installation",
  },
  {
    path: "/documentation",
    component: Documentation,
    children: [
      {
        path: "installation",
        component: DocumentationInstall,
      },
      {
        path: "components",
        component: DocumentationComponents,
      },

      // components

      {
        path: "table",
        component: DocumentationTable,
      },
      {
        path: "datepicker",
        component: DocumentationDatePicker,
      },
      {
        path: "list",
        component: DocumentationList,
      },
      {
        path: "modal",
        component: DocumentationModal,
      },
      {
        path: "pagination",
        component: DocumentationPagination,
      },
      {
        path: "tabs",
        component: DocumentationTabs,
      },
      {
        path: "tab",
        component: DocumentationTab,
      },
      {
        path: "spinner",
        component: DocumentationSpinner,
      },
      {
        path: "collapse",
        component: DocumentationCollapse,
      },
      {
        path: "badge",
        component: DocumentationBadge,
      },
      {
        path: "dropdown",
        component: DocumentationDropdown,
      },
      {
        path: "dropdown-menu-item",
        component: DocumentationDropdownMenuItem,
      },
      {
        path: "card",
        component: DocumentationCard,
      },
      {
        path: "button",
        component: DocumentationButton,
      },
      {
        path: "chip",
        component: DocumentationChip,
      },
      {
        path: "popover",
        component: DocumentationPopover,
      },
      {
        path: "progress",
        component: DocumentationProgress,
      },
      {
        path: "sidepanel",
        component: DocumentationSidepanel,
      },
      {
        path: "alert",
        component: DocumentationAlert,
      },
      {
        path: "input",
        component: DocumentationInput,
      },
      {
        path: "textarea",
        component: DocumentationTextarea,
      },
      {
        path: "radio",
        component: DocumentationRadio,
      },
      {
        path: "checkbox",
        component: DocumentationCheckbox,
      },
      {
        path: "navbar",
        component: DocumentationNavbar,
      },
      {
        path: "range",
        component: DocumentationRange,
      },
      {
        path: "closebutton",
        component: DocumentationClosebutton,
      },
      {
        path: "breadcrumb",
        component: DocumentationBreadcrumb,
      },
      {
        path: "chevron",
        component: DocumentationChevron,
      },
      {
        path: "formtext",
        component: DocumentationFormText,
      },
      {
        path: "divider",
        component: DocumentationDivider,
      },
      {
        path: "icon",
        component: DocumentationIcon,
      },
      {
        path: "select",
        component: DocumentationSelect,
      },
      {
        path: "tree",
        component: DocumentationTree,
      },
      {
        path: "form-validation",
        component: DocumentationFormValidation,
      },
      {
        path: "trigger",
        component: DocumentationTrigger,
      },
      {
        path: "autocomplete",
        component: DocumentationSelect,
      },

      // directives

      {
        path: "tooltip",
        component: DocumentationTooltip,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path) return
    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ el: to.hash })
        }, 1000)
      })
    }
    return { top: 0 }
  },
});

export default router;
