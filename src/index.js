import * as components from "./components"

import { default as tooltip } from "./directives/tooltip"

export { setValidationMessage } from "./validators"

export * from "./components"

export {
//   vButton,
//   vTable,
//   vTabs,
//   vTab,
//   vDatePicker,
//   vCard,
//   vSidepanel,
//   vPagination,
//   vDropdown,
//   vDropdownMenuItem,
//   vDropdownHeader,
//   vList,
//   vListItem,
//   vCollapse,
//   vModal,
//   vBadge,
//   vPopover,
//   vCloseButton,
//   vChevron,
//   vSpinner,
//   vProgress,
//   vNavbar,
//   vAlert,
//   vBreadcrumb,
//   vDivider,
//   vAccordion,
//   vIcon,
//   vTreeNode,
//   vTree,
//   vButtonCollapse,
//   vButtonDropdown,
//
//   vForm,
//   vInput,
//   vTextarea,
//   vSelect,
//   vRange,
//   vRadioGroup,
//   vRadio,
//   vCheckboxGroup,
//   vCheckbox,
//   vCheckboxSimple,
//   vFormText,
//   vAutocomplete,
//
//   tooltip,
//
  // setValidationMessage,
};

// export { 
//   buttonPlugin, 
//   tablePlugin, 
//   inputPlugin,
//   selectPlugin,
//   textareaPlugin,
//   checkboxPlugin,
//   spinnerPlugin,
//   sidepanelPlugin,
//   breadcrumbPlugin,
//   radioPlugin,
//   datepickerPlugin,
//   rangePlugin,
//   badgePlugin,
//   cardPlugin,
//   tabsPlugin,
//   modalPlugin,
//   paginationPlugin,
//   listPlugin,
//   alertPlugin,
//   navbarPlugin,
//   progressPlugin,
//   dropdownPlugin,
//   collapsePlugin,
//   popoverPlugin,
//   closebuttonPlugin,
//   dividerPlugin,
//   tooltipPlugin,
  // chevron
  // accordion
  // icon
// } from "./plugin"

const defaultOptions = {
  components: [
    ...Object.keys(components)
  ],
  defaultProps: {},
}

let globalOptions = null

let componentPlugin = {
  install(app, options) {
    options = options || {}

    globalOptions = {
      ...defaultOptions,
      ...options,
    }

    let c = Object.entries(globalOptions.components)

    globalOptions.components.forEach((component) => {
      app.component(component, components[component]);
    })
    // app.component("v-table", components.vTable);
    // app.component("v-tabs", vTabs);
    // app.component("v-tab", vTab);
    // app.component("v-date-picker", vDatePicker);
    // app.component("v-card", vCard);
    // app.component("v-button", vButton);
    // app.component("v-pagination", vPagination);
    // app.component("v-dropdown", vDropdown);
    // app.component("v-dropdown-menu-item", vDropdownMenuItem);
    // app.component("v-dropdown-header", vDropdownHeader);
    // app.component("v-list", vList);
    // app.component("v-list-item", vListItem);
    // app.component("v-collapse", vCollapse);
    // app.component("v-modal", vModal);
    // app.component("v-badge", vBadge);
    // app.component("v-popover", vPopover);
    // app.component("v-spinner", vSpinner);
    // app.component("v-sidepanel", vSidepanel);
    // app.component("v-progress", vProgress);
    // app.component("v-navbar", vNavbar);
    // app.component("v-alert", vAlert);
    // app.component("v-breadcrumb", vBreadcrumb);
    // app.component("v-close-button", vCloseButton);
    // app.component("v-chevron", vChevron);
    // app.component("v-divider", vDivider);
    // app.component("v-accordion", vAccordion);
    // app.component("v-icon", vIcon);
    // app.component("v-tree-node", vTreeNode);
    // app.component("v-tree", vTree);
    // app.component("v-button-collapse", vButtonCollapse);
    // app.component("v-button-dropdown", vButtonDropdown);

    app.directive("tooltip", tooltip);
  }
}

let formPlugin = {
  install(app) {
    app.component("v-input", vInput);
    app.component("v-textarea", vTextarea);
    app.component("v-radio", vRadio);
    app.component("v-checkbox", vCheckbox);
    app.component("v-range", vRange);
    app.component("v-select", vSelect);
    app.component("v-form-text", vFormText);
    app.component("v-autocomplete", vAutocomplete);
    app.component("v-checkbox-group", vCheckboxGroup);
    app.component("v-radio-group", vRadioGroup);
    app.component("v-form", vForm);
    app.component("v-checkbox-simple", vCheckboxSimple);
  }
}

// export { install as plugin };
export { componentPlugin, formPlugin, globalOptions }
