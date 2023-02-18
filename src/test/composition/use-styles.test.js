import useStyles from "../../components/composition/use-styles";
import { ref, computed, reactive } from "vue"

const elements = [
  "element",
  "element2",
  "element3",
  "element4",
]

const props = reactive({
  styleElement: "",
  styleElement2: "",
  styleElement3: "",
  styleElement4: "",
  base: "test",
  variant: "",
})

afterEach(() => {
  props.styleElement = ""
  props.styleElement2 = ""
  props.styleElement3 = ""
  props.styleElement4 = ""
  props.base = "test"
  props.variant = ""
})

describe("correctly generates", () => {
  test("classes", () => {
    let { classes } = useStyles("test", props, {
      element: null,
      element2: null,
      element3: null,
      element4: null,
    });

    elements.forEach((el) => {
      expect(classes[el].value).toMatch('test__' + el)
    })
  });

  test("states", () => {
    let { states } = useStyles("test", props, {
      element: {
        states: ["state", "state2"]
      },
      element2: null,
      element3: null,
      element4: null,
    });

    expect(states.element.value.state).toMatch('test__element--state-state')
    expect(states.element.value.state2).toMatch('test__element--state2-state')
  });

  test("classes with fixed classes", () => {
    let { classes } = useStyles("test", props, {
      element: {
        fixed: "fixed-class"
      },
      element2: null,
      element3: null,
      element4: null,
    });

    expect(classes.element.value).toMatch(/fixed-class/)
  });

  test("classes with variants", () => {
    let { variants } = useStyles("test", props, {
      element: {
        variants: ["variant", "variant2"]
      },
      element2: null,
      element3: null,
      element4: null,
    });

    expect(variants.element.value.variant).toMatch('test__element--variant')
    expect(variants.element.value.variant2).toMatch('test__element--variant2')
  });

  test("classes with computed props", () => {
    let propTest = ref(true)

    let { classes } = useStyles("test", props, {
      element: {
        prop: computed(() => propTest.value ? "prop-test-class-true" : "prop-test-class-false")
      },
      element2: null,
      element3: null,
      element4: null,
    });

    expect(classes.element.value).toMatch('test__element prop-test-class-true')
  });

  test("additional classes with style prop", () => {
    props.styleElement = "style style2"

    let { classes } = useStyles("test", props, {
      element: null,
      element2: null,
      element3: null,
      element4: null,
    });

    expect(classes.element.value).toMatch('test__element--style test__element--style2 test__element')
  });

  test("classes with element name", () => {
    let { classes } = useStyles("test", props, {
      element: {
        name: "element-name"
      },
      element2: null,
      element3: null,
      element4: null,
    });

    expect(classes.element.value).toMatch('test__element-name')
  });

  test("classes with variant prop", () => {
    props.styleElement = "primary:primary-style secondary:secondary-style default"

    let { classes } = useStyles("test", props, {
      element: null,
      element2: null,
      element3: null,
      element4: null,
    });

    expect(classes.element.value).toMatch('test__element--default test__element')

    props.variant = "primary"

    expect(classes.element.value).toMatch('test__element--primary-style test__element--default test__element')

    props.variant = "secondary"

    expect(classes.element.value).toMatch('test__element--secondary-style test__element--default test__element')
  });

  test("classes with base prop", () => {
    props.base = "test2"

    let { classes } = useStyles("test", props, {
      element: null,
      element2: null,
      element3: null,
      element4: null,
    });

    expect(classes.element.value).toMatch('test2__element')
  });

  test("classes, states and variants", () => {
    let propTest = ref(true)

    props.styleElement = "primary:primary-style secondary:secondary-style default"

    let { classes, states, variants } = useStyles("test", props, {
      element: {
        name: "element-name",
        states: ["state", "state2"],
        variants: ["variant", "variant2"],
        fixed: "fixed-class",
        prop: computed(() => propTest.value ? "prop-test-class-true" : "prop-test-class-false"),
      },
      element2: null,
      element3: null,
      element4: null,
    });

    expect(classes.element.value).toMatch('fixed-class test__element-name--default test__element-name prop-test-class-true')
    expect(states.element.value.state).toMatch('test__element-name--state-state')
    expect(states.element.value.state2).toMatch('test__element-name--state2-state')
    expect(variants.element.value.variant).toMatch('test__element-name--variant')
    expect(variants.element.value.variant2).toMatch('test__element-name--variant2')

    props.variant = "primary"

    expect(classes.element.value).toMatch('fixed-class test__element-name--primary-style test__element-name--default test__element-name prop-test-class-true')
    expect(states.element.value.state).toMatch('test__element-name--state-state')
    expect(states.element.value.state2).toMatch('test__element-name--state2-state')
    expect(variants.element.value.variant).toMatch('test__element-name--variant')
    expect(variants.element.value.variant2).toMatch('test__element-name--variant2')

    props.variant = "secondary"

    expect(classes.element.value).toMatch('fixed-class test__element-name--secondary-style test__element-name--default test__element-name prop-test-class-true')
    expect(states.element.value.state).toMatch('test__element-name--state-state')
    expect(states.element.value.state2).toMatch('test__element-name--state2-state')
    expect(variants.element.value.variant).toMatch('test__element-name--variant')
    expect(variants.element.value.variant2).toMatch('test__element-name--variant2')
  });
})

// class state variants prop change
