import vTable from "./vTable.vue";
import vTabs from "./vTabs.vue";
import vTab from "./vTab.vue";
import vDatePicker from "./vDatePicker.vue";
import vCard from "./vCard.vue";
import vSidepanel from "./vSidepanel.vue";
import vButton from "./vButton.vue";
import vPagination from "./vPagination.vue";
import vDropdown from "./vDropdown.vue";
import vDropdownMenuItem from "./vDropdownMenuItem.vue";
import vDropdownHeader from "./vDropdownHeader.vue";
import vList from "./vList.vue";
import vListItem from "./vListItem.vue";
import vCollapse from "./vCollapse.vue";
import vModal from "./vModal.vue";
import vBadge from "./vBadge.vue";
import vPopover from "./vPopover.vue";
import vCloseButton from "./vCloseButton.vue";
import vChevron from "./vChevron.vue";
import vDivider from "./vDivider.vue";
import vSpinner from "./vSpinner.vue";
import vProgress from "./vProgress.vue";
import vNavbar from "./vNavbar.vue";
import vAlert from "./vAlert.vue";
import vInput from "./vInput.vue";
import vTextarea from "./vTextarea.vue";
import vSelect from "./vSelect.vue";
import vRadio from "./vRadio.vue";
import vCheckbox from "./vCheckbox.vue";
import vRange from "./vRange.vue";
import vBreadcrumb from "./vBreadcrumb.vue";
import vFormText from "./vFormText.vue";
import vAccordion from "./vAccordion.vue"
import vIcon from "./vIcon.vue"

import vTree from "./vTree.vue"

import vAutocomplete from "./vAutocomplete.vue"

import tooltip from "../directives/tooltip.js";

import vButtonCollapse from "./vButtonCollapse.vue"
import vButtonDropdown from "./vButtonDropdown.vue"

export {
  vButton,
  vTable,
  vTabs,
  vTab,
  vDatePicker,
  vCard,
  vSidepanel,
  vPagination,
  vDropdown,
  vDropdownMenuItem,
  vDropdownHeader,
  vList,
  vListItem,
  vCollapse,
  vModal,
  vBadge,
  vPopover,
  vCloseButton,
  vChevron,
  vSpinner,
  vProgress,
  vNavbar,
  vAlert,
  vInput,
  vTextarea,
  vSelect,
  vRadio,
  vCheckbox,
  vRange,
  vBreadcrumb,
  vFormText,
  vDivider,
  vAccordion,
  vIcon,
  tooltip,

  vAutocomplete,
  vTree,

  vButtonCollapse,
  vButtonDropdown,
};

export { 
  buttonPlugin, 
  tablePlugin, 
  inputPlugin,
  selectPlugin,
  textareaPlugin,
  checkboxPlugin,
  spinnerPlugin,
  sidepanelPlugin,
  breadcrumbPlugin,
  radioPlugin,
  datepickerPlugin,
  rangePlugin,
  badgePlugin,
  cardPlugin,
  tabsPlugin,
  modalPlugin,
  paginationPlugin,
  listPlugin,
  alertPlugin,
  navbarPlugin,
  progressPlugin,
  dropdownPlugin,
  collapsePlugin,
  popoverPlugin,
  closebuttonPlugin,
  dividerPlugin,
  tooltipPlugin,
  // chevron
  // accordion
  // icon
} from "./plugin"

function install(app) {
  app.component("v-table", vTable);
  app.component("v-tabs", vTabs);
  app.component("v-tab", vTab);
  app.component("v-date-picker", vDatePicker);
  app.component("v-card", vCard);
  app.component("v-button", vButton);
  app.component("v-pagination", vPagination);
  app.component("v-dropdown", vDropdown);
  app.component("v-dropdown-menu-item", vDropdownMenuItem);
  app.component("v-dropdown-header", vDropdownHeader);
  app.component("v-list", vList);
  app.component("v-list-item", vListItem);
  app.component("v-collapse", vCollapse);
  app.component("v-modal", vModal);
  app.component("v-badge", vBadge);
  app.component("v-popover", vPopover);
  app.component("v-spinner", vSpinner);
  app.component("v-sidepanel", vSidepanel);
  app.component("v-progress", vProgress);
  app.component("v-navbar", vNavbar);
  app.component("v-alert", vAlert);
  app.component("v-input", vInput);
  app.component("v-textarea", vTextarea);
  app.component("v-radio", vRadio);
  app.component("v-checkbox", vCheckbox);
  app.component("v-range", vRange);
  app.component("v-select", vSelect);
  app.component("v-breadcrumb", vBreadcrumb);
  app.component("v-close-button", vCloseButton);
  app.component("v-chevron", vChevron);
  app.component("v-form-text", vFormText);
  app.component("v-divider", vDivider);
  app.component("v-accordion", vAccordion);
  app.component("v-icon", vIcon);

  app.component("v-autocomplete", vAutocomplete);
  app.component("v-tree", vTree);

  app.directive("tooltip", tooltip);

  app.component("v-button-collapse", vButtonCollapse);
  app.component("v-button-dropdown", vButtonDropdown);
}

export { install as plugin };
