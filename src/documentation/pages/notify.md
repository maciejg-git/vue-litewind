___

#### Notes {#NotifyNotes}

###### Usage

The notfication system include two parts: `v-notify-container` and `useNotify` function.
In order to set it up, the first step is to place `v-notify-container` in one of the top level components (for example in `App.vue`). This component is set up early in the hierarchy to make sure it is available before adding any notifications. With the component in place you can then import `useNotify` function anywhere in your application and start displaying notifications.

While adding `v-notify-container` you can use its props to define default settings for all notifications.

The `v-notify` component, which is single notification in the container, is created automatically and should not be used directly in the templates.

###### Notify container position

Notify container does not have any classes by default apart from `fixed` position. You should add few basic tailwind classes in order to set it up:

- `top-*` , `bottom-*`, `left-*` or `right-*` to place it in desired position,
- `w-*` class to set width of notifications,
- `space-y-*` to optionally add some gaps between notifications,
- `px-*` or `py-*` classes to optionally add padding to the container

For example `bottom-4 md:right-10 w-full md:w-[350px] space-y-4` classes will make notifications appear in the bottom right corner of the screen (centered on small screens), notifications will be 350px wide (full width on small screens) and seperated with 1rem of space. This is the same setup as in example below.

###### Adding new notifications

To add new notifications import and call `useNotify` function anywhere in your application. You can then use the returned object and its `push` function to add new notifications. `Push` function can take single `string` argument that will add very basic notifiation with the default settings. For more control and customization you can supply an `object` as an argument that will allow few additional options.

```javascript
import { useNotify } from "vue-litewind";

let notify = useNotify();

notify.push(text: string)

// or

notify.push({
  header: string,
  text: string,
  icon: string | object,
  dismissable: boolean,
  autoDismissDelay: number,
  static: boolean,
  props: object,
  variant: string,
  options: object,
})
```

The properties of the `object` argument are:

- `header`, `text` and `icon` - set content of the notify,
- `dismissable`, `autoDismissDelay` and `static` - override respective props of `v-notify-container` for current notification,
- `props` - is an object with the `v-notify` props. See reference above.
- `variant` and `options` - are options that can store any value defined by user. These options can be useful, for example, to identify notifications when using slots. See example below (custom notify)

###### Hiding notifications

By default notifications will auto close after short delay (defined by `auto-hide-delay` prop of the `v-notify-container`). That behavior can be disabled globally by enabling `static` prop of the `v-notify-container`. If only selected notifications should be manually dismissed use `static` property of the argument when calling `push` function. 

By default hovering over `v-notify-container` pauses all timers and restarts them after pointer leaves element.

###### Teleport

Since `v-notify-container` is positioned as a `fixed` element it is recommended to teleport it to the `body` element.

---

#### Example - notify {#ExampleNotify}

<example name="ExampleNotify"></example>
