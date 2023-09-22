import { render, fireEvent, prettyDOM, waitFor, waitForElementToBeRemoved } from "@testing-library/vue";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import NotifyContainer from "../components/vNotifyContainer.vue";
import * as styles from "../styles/components";
import { useNotify } from "../../src/components/composition/use-notify";
import {
  notifications,
  setNotifyOptions,
  removeNotify,
  removeNotifyById,
} from "../../src/components/composition/use-notify";

let global = {
  stubs: {},
  provide: {
    mods: styles,
    _notify: {
      notifications,
      setNotifyOptions,
      removeNotify,
      removeNotifyById,
    }
  },
}

beforeEach(() => {
  notifications.value = []
})

test("renders component (string argument)", async () => {
  const { getByRole, getByText, findByText } = render(NotifyContainer, {
    props: {},
    global,
  });

  let notify = useNotify();

  notify.push('notify text')

  expect(await findByText('notify text')).toBeInTheDocument()
});

test("renders component (object argument)", async () => {
  const { getByRole, getByText, findByText } = render(NotifyContainer, {
    props: {},
    global,
  });

  let notify = useNotify();

  notify.push({
    header: "notify header",
    text: "notify text"
  })

  expect(await findByText('notify header')).toBeInTheDocument()
  expect(await findByText('notify text')).toBeInTheDocument()
});

test("renders mulitple notifications", async () => {
  const { getByRole, getByText, findByText } = render(NotifyContainer, {
    props: {},
    global,
  });

  let notify = useNotify();

  notify.push('notify text')
  notify.push('notify text 2')
  notify.push('notify text 3')

  expect(await findByText('notify text')).toBeInTheDocument()
  expect(await findByText('notify text 2')).toBeInTheDocument()
  expect(await findByText('notify text 3')).toBeInTheDocument()
});

test.skip("should hide notification after 10 seconds (default delay)", async () => {
  const { getByRole, getByText, findByText, queryByText } = render(NotifyContainer, {
    props: {},
    global,
  });

  let notify = useNotify();

  notify.push('notify text')

  expect(await findByText('notify text')).toBeInTheDocument()

  await waitForElementToBeRemoved(() => queryByText('notify text'), {timeout: 12000})
}, 12000);

test.skip("should hide notification after 2 seconds (autoDismissDelay property)", async () => {
  const { getByRole, getByText, findByText, queryByText } = render(NotifyContainer, {
    props: {},
    global,
  });

  let notify = useNotify();

  notify.push({
    header: "notify header",
    text: "notify text",
    autoDismissDelay: 2000,
  })

  expect(await findByText('notify header')).toBeInTheDocument()
  expect(await findByText('notify text')).toBeInTheDocument()

  await waitForElementToBeRemoved(() => queryByText('notify text'), {timeout: 3000})
}, 3000);

test("renders dismissable component by default", async () => {
  const { getByRole, getByText, findByText, container } = render(NotifyContainer, {
    props: {},
    global,
  });

  let notify = useNotify();

  notify.push('notify text')

  await waitFor(() => {
    expect(container.querySelector("svg")).toBeInTheDocument();
  })
});

test("renders static component (dissmisable property)", async () => {
  const { getByRole, getByText, findByText, container } = render(NotifyContainer, {
    props: {
      dismissable: false,
    },
    global,
  });

  let notify = useNotify();

  notify.push('notify text')

  await waitFor(() => {
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  })
});

test("should remove notify after clicking close button", async () => {
  const { getByRole, findByText, queryByText } = render(NotifyContainer, {
    global,
    props: {},
  });

  let notify = useNotify();

  notify.push('notify text')

  expect(await findByText('notify text')).toBeInTheDocument()

  let button = getByRole("button");
  await fireEvent.click(button);

  expect(queryByText('notify text')).not.toBeInTheDocument()
});
