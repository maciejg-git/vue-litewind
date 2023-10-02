import useTailwindStyles from "../../components/composition/use-tailwind-styles";
import { reactive } from "vue";

let global = {
  provide: {
    mods: {
      test: {
        test: {
          element: {
            classes: `
              static
              static2
            `,
            size: {
              medium: `
              medium
              medium2
              `,
              small: `
              small
              small2
              `,
            },
            variant: {
              classes: `
              variant
              variant2
              `,
              primary: `
              primary
              primary2
              `,
              secondary: `
              secondary
              secondary2
              `,
            },
            effect: {
              ring: `
                ring
                ring2
              `,
            },
            fn: {
              fn: () => `
                function
                function2
              `,
              fn2: () => `
                function
                function2
              `,
            },
            special: {
              optional: true,
              raised: `
              raised
              raised2
              `,
            },
            data: (i) => {
              return i === 1 ? "data" : "data2"
            },
            preset: {
              plain: `
              plain
              plain2
              `,
            },
          },
          element2: {
            classes: `
              static
              static2
            `,
            size: {
              medium: `
              medium
              medium2
              `,
              small: `
              small
              small2
              `,
            },
            variant: {
              classes: `
              variant
              variant2
              `,
              primary: `
              primary
              primary2
              `,
              secondary: `
              secondary
              secondary2
              `,
            },
            effect: {
              ring: `
                ring
                ring2
              `,
            },
            special: {
              optional: true,
              raised: `
              raised
              raised2
              `,
            },
            preset: {
              plain: `
              plain
              plain2
              `,
            },
          },
        },
      },
    },
  },
};

let elements = {
  element: {
    fixed: "element-fixed element-fixed2",
  },
  element2: {
    fixed: "element2-fixed element2-fixed2",
  },
};

let elementsExternal = {
  element: {
    fixed: "element-fixed element-fixed2",
    externalVariants: ["variant"]
  },
  element2: {
    fixed: "element2-fixed element2-fixed2",
    externalVariants: ["variant", "size"]
  },
};

const props = reactive({
  modElement: "",
  modElement2: "",
  base: "test",
  variant: "",
});

afterEach(() => {
  props.modElement = "";
  props.modElement2 = "";
  props.base = "test";
  props.variant = "";
});

describe("adds classes", () => {
  test("fixed", () => {
    let { classes, variants } = useTailwindStyles(
      props,
      global.provide.mods.test,
      elements
    );

    expect(classes.element.value).toMatch(/element-fixed element-fixed2/);
    expect(classes.element2.value).toMatch(/element2-fixed element2-fixed2/);
  });

  test("element classes (classes property)", () => {
    let { classes, variants } = useTailwindStyles(
      props,
      global.provide.mods.test,
      elements
    );

    expect(classes.element.value).toMatch(/static static2/);
    expect(classes.element2.value).toMatch(/static static2/);
  });

  test("variant static classes (classes property)", () => {
    let { classes, variants } = useTailwindStyles(
      props,
      global.provide.mods.test,
      elements
    );

    expect(classes.element.value).toMatch(/variant variant2/);
    expect(classes.element2.value).toMatch(/variant variant2/);
  });

  test("default variants classes", () => {
    let { classes, variants } = useTailwindStyles(
      props,
      global.provide.mods.test,
      elements
    );

    expect(classes.element.value).toMatch(
      /.*medium medium2.*primary primary2.*ring ring2/
    );
    expect(classes.element2.value).toMatch(
      /.*medium medium2.*primary primary2.*ring ring2/
    );
  });
});

test("does not add optional variants classes", () => {
  let { classes, variants } = useTailwindStyles(
    props,
    global.provide.mods.test,
    elements
  );

  expect(classes.element.value).not.toMatch(/raised raised2/);
  expect(classes.element2.value).not.toMatch(/raised raised2/);
});

test("adds mod-element prop classes", () => {
  props.modElement = "variant:secondary size:small";
  props.modElement2 = "variant:secondary size:small";

  let { classes, variants } = useTailwindStyles(
    props,
    global.provide.mods.test,
    elements
  );

  expect(classes.element.value).toMatch(/variant variant2.*secondary secondary2/);
  expect(classes.element2.value).toMatch(/variant variant2.*secondary secondary2/);
  expect(classes.element.value).toMatch(/small small2/);
  expect(classes.element2.value).toMatch(/small small2/);
  expect(classes.element.value).not.toMatch(/variant variant2.*primary primary2/);
  expect(classes.element.value).not.toMatch(/variant variant2.*primary primary2/);
  expect(classes.element2.value).not.toMatch(/medium medium2/);
  expect(classes.element2.value).not.toMatch(/medium medium2/);
});

test("adds only preset classes", () => {
  props.modElement = "preset:plain";
  props.modElement2 = "preset:plain";

  let { classes, variants } = useTailwindStyles(
    props,
    global.provide.mods.test,
    elements
  );

  expect(classes.element.value).toMatch("plain plain2");
  expect(classes.element2.value).toMatch("plain plain2");
});

test("should return variant function", () => {
  props.modElement = "fn:fn";

  let { classes, variants } = useTailwindStyles(
    props,
    global.provide.mods.test,
    elements
  );

  expect(classes.element.value).toMatch(/function function2/);
});

test("should return external variants", async () => {
  let { classes, variants } = useTailwindStyles(
    props,
    global.provide.mods.test,
    elementsExternal,
  );

  expect(classes.element.value).toMatch("static static2");
  expect(classes.element2.value).toMatch("static static2");
  expect(variants.element.classes).toMatch("variant variant2");
  expect(variants.element.primary).toMatch("primary primary2");
  expect(variants.element.secondary).toMatch("secondary secondary2");
  expect(variants.element2.classes).toMatch("variant variant2");
  expect(variants.element2.primary).toMatch("primary primary2");
  expect(variants.element2.secondary).toMatch("secondary secondary2");
  expect(variants.element2.small).toMatch("small small2");
  expect(variants.element2.medium).toMatch("medium medium2");
});
