___

#### Notes {#ProgressNotes}

###### Progress mode

There are three basic modes of the progress bar:

- `indeterminate` is the simplest that shows progress continously until disabled (similar to loaders or spinners)
- `default` shows the progress from the `0` to the value of the `max` prop. The current value is stored in the `value` prop
- `timer` shows progress of the time defined in the `timer` prop

The progress can be changed to `indeterminate` at any time when using other modes. See the example below.

---

#### Example - props {#ExampleProgress}

<example name="ExampleProgress"></example>

#### Example - indeterminate {#ExampleProgressIndeterminate}

<example name="ExampleProgressIndeterminate"></example>

#### Example - indeterminate custom animations {#ExampleProgressIndeterminateVariables}

<example name="ExampleProgressIndeterminateStyle"></example>

#### Example - timer progress {#ExampleProgressTimer}

<example name="ExampleProgressTimer"></example>
