import { createRouter, createWebHistory } from "vue-router";

import Documentation from "../documentation/Documentation.vue";

import DocumentationInstall from "../documentation/DocumentationInstall.vue";

import DocumentationComponents from "../documentation/DocumentationComponents.vue";

import DocumentationTable from "../documentation/DocumentationTable.vue";
import DocumentationDatePicker from "../documentation/DocumentationDatePicker.vue";
import DocumentationList from "../documentation/DocumentationList.vue";
import DocumentationModal from "../documentation/DocumentationModal.vue";
import DocumentationTabs from "../documentation/DocumentationTabs.vue";
import DocumentationSpinner from "../documentation/DocumentationSpinner.vue";
import DocumentationCollapse from "../documentation/DocumentationCollapse.vue";
import DocumentationBadge from "../documentation/DocumentationBadge.vue";
import DocumentationDropdown from "../documentation/DocumentationDropdown.vue";
import DocumentationPagination from "../documentation/DocumentationPagination.vue";
import DocumentationCard from "../documentation/DocumentationCard.vue";
import DocumentationButton from "../documentation/DocumentationButton.vue";
import DocumentationChip from "../documentation/DocumentationChip.vue";
import DocumentationPopover from "../documentation/DocumentationPopover.vue";
import DocumentationProgress from "../documentation/DocumentationProgress.vue";
import DocumentationSidepanel from "../documentation/DocumentationSidepanel.vue";
import DocumentationAlert from "../documentation/DocumentationAlert.vue";
import DocumentationInput from "../documentation/DocumentationInput.vue";
import DocumentationTextarea from "../documentation/DocumentationTextarea.vue";
import DocumentationRadio from "../documentation/DocumentationRadio.vue";
import DocumentationCheckbox from "../documentation/DocumentationCheckbox.vue";
import DocumentationNavbar from "../documentation/DocumentationNavbar.vue";
import DocumentationRange from "../documentation/DocumentationRange.vue";
import DocumentationBreadcrumb from "../documentation/DocumentationBreadcrumb.vue";
import DocumentationChevron from "../documentation/DocumentationChevron.vue";
import DocumentationFormText from "../documentation/DocumentationFormText.vue";
import DocumentationSelect from "../documentation/DocumentationSelect.vue";
import DocumentationTree from "../documentation/DocumentationTree.vue";
import DocumentationClosebutton from "../documentation/DocumentationClosebutton.vue";
import DocumentationIcon from "../documentation/DocumentationIcon.vue";
import DocumentationDivider from "../documentation/DocumentationDivider.vue";
import DocumentationTrigger from "../documentation/DocumentationTrigger.vue";

import DocumentationTooltip from "../documentation/DocumentationTooltip.vue";

import DocumentationFormValidation from "../documentation/DocumentationFormValidation.vue";

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
