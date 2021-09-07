import { createRouter, createWebHistory } from "vue-router";
import Test from "../components/Test.vue";

import Documentation from "../components/Documentation/Documentation.vue";

import DocumentationInstall from "../components/Documentation/DocumentationInstall.vue";

import DocumentationComponents from "../components/Documentation/DocumentationComponents.vue";

import DocumentationTable from "../components/Documentation/DocumentationTable.vue";
import DocumentationDatePicker from "../components/Documentation/DocumentationDatePicker.vue";
import DocumentationList from "../components/Documentation/DocumentationList.vue";
import DocumentationModal from "../components/Documentation/DocumentationModal.vue";
import DocumentationTabs from "../components/Documentation/DocumentationTabs.vue";
import DocumentationSpinner from "../components/Documentation/DocumentationSpinner.vue";
import DocumentationCollapse from "../components/Documentation/DocumentationCollapse.vue";
import DocumentationBadge from "../components/Documentation/DocumentationBadge.vue";
import DocumentationDropdown from "../components/Documentation/DocumentationDropdown.vue";
import DocumentationPagination from "../components/Documentation/DocumentationPagination.vue";
import DocumentationCard from "../components/Documentation/DocumentationCard.vue";
import DocumentationButton from "../components/Documentation/DocumentationButton.vue";
import DocumentationPopover from "../components/Documentation/DocumentationPopover.vue";
import DocumentationProgress from "../components/Documentation/DocumentationProgress.vue";
import DocumentationSidepanel from "../components/Documentation/DocumentationSidepanel.vue";
import DocumentationAlert from "../components/Documentation/DocumentationAlert.vue";
import DocumentationInput from "../components/Documentation/DocumentationInput.vue";
import DocumentationSelect from "../components/Documentation/DocumentationSelect.vue";
import DocumentationTextarea from "../components/Documentation/DocumentationTextarea.vue";
import DocumentationRadio from "../components/Documentation/DocumentationRadio.vue";
import DocumentationCheckbox from "../components/Documentation/DocumentationCheckbox.vue";
import DocumentationNavbar from "../components/Documentation/DocumentationNavbar.vue";
import DocumentationRange from "../components/Documentation/DocumentationRange.vue";
import DocumentationBreadcrumb from "../components/Documentation/DocumentationBreadcrumb.vue";
import DocumentationChevron from "../components/Documentation/DocumentationChevron.vue";
import DocumentationFormText from "../components/Documentation/DocumentationFormText.vue";
import DocumentationClosebutton from "../components/Documentation/DocumentationClosebutton.vue";

import DocumentationTooltip from "../components/Documentation/DocumentationTooltip.vue";

import DocumentationStyling from "../components/Documentation/DocumentationStyling.vue";

const routes = [
  {
    path: "/",
    component: Test,
    // redirect: "/documentation/installation",
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
        path: "styling",
        component: DocumentationStyling,
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
        path: "select",
        component: DocumentationSelect,
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
});

export default router;
