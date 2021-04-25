import vTable from "./vTable.vue"
import vTabs from "./vTabs.vue"
import vTab from "./vTab.vue"
import vDatePicker from "./vDatePicker.vue"
import vCard from "./vCard.vue"
import vSidepanel from "./vSidepanel.vue"
import vButton from "./vButton.vue"
import vPagination from "./vPagination.vue"
import vDropdown from "./vDropdown.vue"
import vDropdownMenuItem from "./vDropdownMenuItem.vue"
import vDropdownHeader from "./vDropdownHeader.vue"
import vList from "./vList.vue"
import vListItem from "./vListItem.vue"
import vCollapse from "./vCollapse.vue"
import vModal from "./vModal.vue"
import vBadge from "./vBadge.vue"
import vPopover from "./vPopover.vue"

const plugin = {
  install(app) {
    app.component("v-table", vTable);
    app.component("v-tabs", vTabs);
    app.component("v-tab", vTab);
    app.component("v-date-picker", vDatePicker);
    app.component("v-card", vCard);
    app.component("v-sidepanel", vSidepanel);
  }
}

export default plugin;

export { vTable }
