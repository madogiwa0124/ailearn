import type { Meta, StoryObj } from "@storybook/html";
import { expect } from "@storybook/test";

const meta: Meta = {
  title: "Components/Toggle",
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component: "example text.",
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // NOTE: This rule is disabled because the input element is not required in storybook.
            // https://dequeuniversity.com/rules/axe/4.10/select-name?application=RuleDescription
            // https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-20-level-a--aa-rules
            id: "select-name",
            enabled: false,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const container = document.createElement("div");
    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.className = "toggle";
    toggle.checked = args.checked;
    toggle.disabled = args.disabled;
    container.appendChild(toggle);
    return container;
  },
  args: {
    checked: false,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const toggle = canvas.querySelector(
      "input[type='checkbox'].toggle",
    ) as HTMLInputElement;
    expect(toggle).not.toBeNull();
    toggle.click();
    expect(toggle).toBeChecked();
    toggle.click();
    expect(toggle).not.toBeChecked();
  },
};

export const Disabled: Story = {
  render: (_args) => {
    const container = document.createElement("div");
    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.className = "toggle";
    toggle.disabled = true;
    container.appendChild(toggle);
    return container;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const toggle = canvas.querySelector(
      "input[type='checkbox'].toggle",
    ) as HTMLInputElement;
    expect(toggle).not.toBeNull();
    expect(toggle).toBeDisabled();
  },
};
