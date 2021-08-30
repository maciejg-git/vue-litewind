import vButton from "./vButton.vue";
import vTable from "./vTable.vue";
import vTabs from "./vTabs.vue";
import vTab from "./vTab.vue";
import vDatePicker from "./vDatePicker.vue";
import vCard from "./vCard.vue";
import vSidepanel from "./vSidepanel.vue";
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
import tooltip from "../directives/tooltip.js";

function plugin(component, ...args) {
  return {
    install: function (app) {
      app.component(component[0], component[1]);
      if (args.length) {
        for (let c of args) {
          app.component(c[0], c[1]);
        }
      }
    },
  };
}

function directive(directive, ...args) {
  return {
    install: function (app) {
      app.directive(directive[0], directive[1]);
      if (args.length) {
        for (let d of args) {
          app.directive(d[0], d[1]);
        }
      }
    },
  };
}

const buttonPlugin = plugin(["v-button", vButton]);
const tablePlugin = plugin(["v-table", vTable]);
const inputPlugin = plugin(["v-input", vInput]);
const selectPlugin = plugin(["v-select", vSelect]);
const textareaPlugin = plugin(["v-textarea", vTextarea]);
const checkboxPlugin = plugin(["v-checkbox", vCheckbox]);
const spinnerPlugin = plugin(["v-spinner", vSpinner]);
const sidepanelPlugin = plugin(["v-sidepanel", vSidepanel]);
const breadcrumbPlugin = plugin(["v-breadcrumb", vBreadcrumb]);
const radioPlugin = plugin(["v-radio", vRadio]);
const datepickerPlugin = plugin(["v-datepicker", vDatePicker]);
const rangePlugin = plugin(["v-range", vRange]);
const badgePlugin = plugin(["v-badge", vBadge]);
const cardPlugin = plugin(["v-card", vCard]);
const tabsPlugin = plugin(["v-tabs", vTabs], ["v-tab", vTab]);
const modalPlugin = plugin(["v-modal", vModal]);
const paginationPlugin = plugin(["v-pagination", vPagination]);
const listPlugin = plugin(["v-list", vList], ["v-list-item", vListItem]);
const alertPlugin = plugin(["v-alert", vAlert]);
const navbarPlugin = plugin(["v-navbar", vNavbar]);
const progressPlugin = plugin(["v-progress", vProgress]);
const dropdownPlugin = plugin(
  ["v-dropdown", vDropdown],
  ["v-dropdown-menu-item", vDropdownMenuItem],
  ["v-dropdown-header", vDropdownHeader]
);
const collapsePlugin = plugin(["v-collapse", vCollapse]);
const popoverPlugin = plugin(["v-popover", vPopover]);
const closebuttonPlugin = plugin(["v-close-button", vCloseButton]);
const tooltipPlugin = directive("tooltip", tooltip);

export {
  buttonPlugin,
  tablePlugin,
  inputPlugin,
  selectPlugin,
  textareaPlugin,
  checkboxPlugin,
  spinnerPlugin,
  tabsPlugin,
  sidepanelPlugin,
  breadcrumbPlugin,
  radioPlugin,
  datepickerPlugin,
  rangePlugin,
  badgePlugin,
  cardPlugin,
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
  tooltipPlugin,
};
