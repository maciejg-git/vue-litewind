___

#### Path {#BreadcrumbPath}

Path is an `Array` of `Objects` where each object should have `label` property and `to` or `href` property that are used as `to` prop for router-link. Optional `icon` property is a name of the icon that prepends element of the path.

``` javascript
let path = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Documentation",
    to: "/",
  },
  {
    label: "Breadcrumb",
  },
],;
```

---

#### Example {#ExampleBreadcrumb}

<example name="ExampleBreadcrumb" auto-show-code></example>
