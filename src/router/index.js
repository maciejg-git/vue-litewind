import { createRouter, createWebHistory } from "vue-router";

const Documentation = () => import('../documentation/pages/Documentation.vue')

const Install = () => import('../documentation/pages/DocumentationInstall.vue')
const Styling = () => import('../documentation/pages/DocumentationStyling.vue')
const Components = () => import('../documentation/pages/DocumentationComponents.vue')
const FormValidation = () => import('../documentation/pages/DocumentationFormValidation.vue')

const Table = () => import('../documentation/pages/DocumentationTable.vue')
const DatePicker = () => import('../documentation/pages/DocumentationDatePicker.vue')
const List = () => import('../documentation/pages/DocumentationList.vue')
const ListItem = () => import('../documentation/pages/DocumentationListItem.vue')
const Modal = () => import('../documentation/pages/DocumentationModal.vue')
const Tabs = () => import('../documentation/pages/DocumentationTabs.vue')
const Tab = () => import('../documentation/pages/DocumentationTab.vue')
const Spinner = () => import('../documentation/pages/DocumentationSpinner.vue')
const Collapse = () => import('../documentation/pages/DocumentationCollapse.vue')
const Badge = () => import('../documentation/pages/DocumentationBadge.vue')
const Dropdown = () => import('../documentation/pages/DocumentationDropdown.vue')
const DropdownMenuItem = () => import('../documentation/pages/DocumentationDropdownMenuItem.vue')
const Pagination = () => import('../documentation/pages/DocumentationPagination.vue')
const Card = () => import('../documentation/pages/DocumentationCard.vue')
const Button = () => import('../documentation/pages/DocumentationButton.vue')
const Chip = () => import('../documentation/pages/DocumentationChip.vue')
const Popover = () => import('../documentation/pages/DocumentationPopover.vue')
const PopoverHeader = () => import('../documentation/pages/DocumentationPopoverHeader.vue')
const Progress = () => import('../documentation/pages/DocumentationProgress.vue')
const Sidepanel = () => import('../documentation/pages/DocumentationSidepanel.vue')
const Alert = () => import('../documentation/pages/DocumentationAlert.vue')
const Input = () => import('../documentation/pages/DocumentationInput.vue')
const Textarea = () => import('../documentation/pages/DocumentationTextarea.vue')
const Radio = () => import('../documentation/pages/DocumentationRadio.vue')
const Checkbox = () => import('../documentation/pages/DocumentationCheckbox.vue')
const Navbar = () => import('../documentation/pages/DocumentationNavbar.vue')
const Range = () => import('../documentation/pages/DocumentationRange.vue')
const Breadcrumb = () => import('../documentation/pages/DocumentationBreadcrumb.vue')
const Chevron = () => import('../documentation/pages/DocumentationChevron.vue')
const FormText = () => import('../documentation/pages/DocumentationFormText.vue')
const Select = () => import('../documentation/pages/DocumentationSelect.vue')
const Tree = () => import('../documentation/pages/DocumentationTree.vue')
const Closebutton = () => import('../documentation/pages/DocumentationClosebutton.vue')
const Icon = () => import('../documentation/pages/DocumentationIcon.vue')
const Divider = () => import('../documentation/pages/DocumentationDivider.vue')
const Trigger = () => import('../documentation/pages/DocumentationTrigger.vue')
const Grid = () => import('../documentation/pages/DocumentationGrid.vue')
const Notify = () => import('../documentation/pages/DocumentationNotify.vue')
const Backdrop = () => import('../documentation/pages/DocumentationBackdrop.vue')

const Tooltip = () => import('../documentation/pages/DocumentationTooltip.vue')

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
        component: Install,
      },
      {
        path: "styling",
        component: Styling,
      },
      {
        path: "components",
        component: Components,
      },
      {
        path: "form-validation",
        component: FormValidation,
      },

      // components

      {
        path: "table",
        component: Table,
      },
      {
        path: "datepicker",
        component: DatePicker,
      },
      {
        path: "list",
        component: List,
      },
      {
        path: "list-item",
        component: ListItem,
      },
      {
        path: "modal",
        component: Modal,
      },
      {
        path: "pagination",
        component: Pagination,
      },
      {
        path: "tabs",
        component: Tabs,
      },
      {
        path: "tab",
        component: Tab,
      },
      {
        path: "spinner",
        component: Spinner,
      },
      {
        path: "collapse",
        component: Collapse,
      },
      {
        path: "badge",
        component: Badge,
      },
      {
        path: "dropdown",
        component: Dropdown,
      },
      {
        path: "dropdown-menu-item",
        component: DropdownMenuItem,
      },
      {
        path: "card",
        component: Card,
      },
      {
        path: "button",
        component: Button,
      },
      {
        path: "chip",
        component: Chip,
      },
      {
        path: "popover",
        component: Popover,
      },
      {
        path: "popover-header",
        component: PopoverHeader,
      },
      {
        path: "progress",
        component: Progress,
      },
      {
        path: "sidepanel",
        component: Sidepanel,
      },
      {
        path: "alert",
        component: Alert,
      },
      {
        path: "input",
        component: Input,
      },
      {
        path: "textarea",
        component: Textarea,
      },
      {
        path: "radio",
        component: Radio,
      },
      {
        path: "checkbox",
        component: Checkbox,
      },
      {
        path: "navbar",
        component: Navbar,
      },
      {
        path: "range",
        component: Range,
      },
      {
        path: "closebutton",
        component: Closebutton,
      },
      {
        path: "breadcrumb",
        component: Breadcrumb,
      },
      {
        path: "chevron",
        component: Chevron,
      },
      {
        path: "formtext",
        component: FormText,
      },
      {
        path: "divider",
        component: Divider,
      },
      {
        path: "icon",
        component: Icon,
      },
      {
        path: "select",
        component: Select,
      },
      {
        path: "tree",
        component: Tree,
      },
      {
        path: "trigger",
        component: Trigger,
      },
      {
        path: "autocomplete",
        component: Select,
      },
      {
        path: "grid",
        component: Grid,
      },
      {
        path: "notify",
        component: Notify,
      },
      {
        path: "backdrop",
        component: Backdrop,
      },

      // directives

      {
        path: "tooltip",
        component: Tooltip,
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
