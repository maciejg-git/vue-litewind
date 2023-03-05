import { createRouter, createWebHistory } from "vue-router";

import Documentation from "../documentation/pages/Documentation.vue";

import DocumentationInstall from "../documentation/pages/DocumentationInstall.vue";

import DocumentationComponents from "../documentation/pages/DocumentationComponents.vue";

import DocumentationTable from "../documentation/pages/DocumentationTable.vue";
import DocumentationDatePicker from "../documentation/pages/DocumentationDatePicker.vue";
import DocumentationList from "../documentation/pages/DocumentationList.vue";
import DocumentationModal from "../documentation/pages/DocumentationModal.vue";
import DocumentationTabs from "../documentation/pages/DocumentationTabs.vue";
import DocumentationSpinner from "../documentation/pages/DocumentationSpinner.vue";
import DocumentationCollapse from "../documentation/pages/DocumentationCollapse.vue";
import DocumentationBadge from "../documentation/pages/DocumentationBadge.vue";
import DocumentationDropdown from "../documentation/pages/DocumentationDropdown.vue";
import DocumentationPagination from "../documentation/pages/DocumentationPagination.vue";
import DocumentationCard from "../documentation/pages/DocumentationCard.vue";
import DocumentationButton from "../documentation/pages/DocumentationButton.vue";
import DocumentationChip from "../documentation/pages/DocumentationChip.vue";
import DocumentationPopover from "../documentation/pages/DocumentationPopover.vue";
import DocumentationProgress from "../documentation/pages/DocumentationProgress.vue";
import DocumentationSidepanel from "../documentation/pages/DocumentationSidepanel.vue";
import DocumentationAlert from "../documentation/pages/DocumentationAlert.vue";
import DocumentationInput from "../documentation/pages/DocumentationInput.vue";
import DocumentationTextarea from "../documentation/pages/DocumentationTextarea.vue";
import DocumentationRadio from "../documentation/pages/DocumentationRadio.vue";
import DocumentationCheckbox from "../documentation/pages/DocumentationCheckbox.vue";
import DocumentationNavbar from "../documentation/pages/DocumentationNavbar.vue";
import DocumentationRange from "../documentation/pages/DocumentationRange.vue";
import DocumentationBreadcrumb from "../documentation/pages/DocumentationBreadcrumb.vue";
import DocumentationChevron from "../documentation/pages/DocumentationChevron.vue";
import DocumentationFormText from "../documentation/pages/DocumentationFormText.vue";
import DocumentationSelect from "../documentation/pages/DocumentationSelect.vue";
import DocumentationTree from "../documentation/pages/DocumentationTree.vue";
import DocumentationClosebutton from "../documentation/pages/DocumentationClosebutton.vue";
import DocumentationIcon from "../documentation/pages/DocumentationIcon.vue";
import DocumentationDivider from "../documentation/pages/DocumentationDivider.vue";
import DocumentationTrigger from "../documentation/pages/DocumentationTrigger.vue";

import DocumentationTooltip from "../documentation/pages/DocumentationTooltip.vue";

import DocumentationFormValidation from "../documentation/pages/DocumentationFormValidation.vue";

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
    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ el: to.hash })
        }, 1000)
      })
    }
  },
});

export default router;
