import type { Meta, StoryObj } from "@storybook/html";
import { expect, userEvent } from "@storybook/test";

const meta: Meta = {
  title: "Components/Select",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないカスタムSelectコンポーネント。カスケードレイヤーを使用したCSS設計を採用しています。",
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // NOTE: This rule is disabled because the select element is not required in storybook.
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
  render: () => {
    const select = document.createElement("select");
    select.className = "select";
    select.innerHTML = `
      <option value="">--- Select ---</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      `;
    return select;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const select = canvas.querySelector("select") as HTMLSelectElement;

    expect(select).not.toBeNull();
    expect(select).toHaveClass("select");
    expect(select).not.toBeDisabled();

    await userEvent.selectOptions(select, "");
    expect(select).toHaveValue("");
  },
};

export const Separator: Story = {
  render: () => {
    const select = document.createElement("select");
    select.className = "select";
    select.innerHTML = `
      <option value="">--- Select ---</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <hr />
      <option value="option3">Option 3</option>
      `;
    return select;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const select = canvas.querySelector("select") as HTMLSelectElement;
    const separators = select.querySelectorAll("hr");

    expect(select).not.toBeNull();
    expect(select).toHaveClass("select");
    expect(select).not.toBeDisabled();
    expect(separators.length).toBe(1);
  },
};

export const Group: Story = {
  render: () => {
    const select = document.createElement("select");
    select.className = "select";
    select.innerHTML = `
      <option value="">--- Select ---</option>
      <option value="option1">Option 1</option>
      <optgroup label="Group 1">
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </optgroup>
      <optgroup label="Group 2">
        <option value="option4">Option 4</option>
        <option value="option5">Option 5</option>
      </optgroup>
      <option value="option6">Option 6</option>
      `;
    return select;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const select = canvas.querySelector("select") as HTMLSelectElement;
    const optgroups = select.querySelectorAll("optgroup");

    expect(select).not.toBeNull();
    expect(select).toHaveClass("select");
    expect(select).not.toBeDisabled();
    expect(optgroups.length).toBe(2);
    expect(optgroups[0].label).toBe("Group 1");
    expect(optgroups[0].querySelectorAll("option").length).toBe(2);
    expect(optgroups[1].label).toBe("Group 2");
    expect(optgroups[1].querySelectorAll("option").length).toBe(2);
  },
};

export const Multiple: Story = {
  render: () => {
    const container = document.createElement("div");
    const notSupportedMessage = document.createElement("p");
    notSupportedMessage.textContent = "Multiple select is not supported";
    notSupportedMessage.style.color = "red";
    notSupportedMessage.style.fontWeight = "bold";
    container.appendChild(notSupportedMessage);
    const select = document.createElement("select");
    select.className = "select";
    select.multiple = true;
    select.innerHTML = `
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      `;
    container.appendChild(select);
    return container;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const select = canvas.querySelector("select") as HTMLSelectElement;

    expect(select).not.toBeNull();
    expect(select).toHaveClass("select");
    expect(select.multiple).toBe(true);

    await userEvent.selectOptions(select, ["option1", "option2"]);
    expect(select).toHaveValue(["option1", "option2"]);
  },
};

export const Disabled: Story = {
  render: () => {
    const select = document.createElement("select");
    select.className = "select";
    select.disabled = true;
    select.innerHTML = `
      <option value="option1">Option 1</option>
      <option value="option2" selected>Option 2</option>
      <option value="option3">Option 3</option>
      `;
    return select;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const select = canvas.querySelector("select") as HTMLSelectElement;

    expect(select).not.toBeNull();
    expect(select).toHaveClass("select");
    expect(select).toBeDisabled();
    expect(select).toHaveValue("option2");

    const initialValue = select.value;
    await userEvent.click(select);
    expect(select).toHaveValue(initialValue);
  },
};

export const Invalid: Story = {
  render: () => {
    const container = document.createElement("div");
    const form = document.createElement("form");
    form.noValidate = true;

    const select = document.createElement("select");
    select.className = "select";
    select.id = "required-select";
    select.required = true;
    select.innerHTML = `
      <option value="">-- Select --</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      `;

    form.reportValidity();
    form.appendChild(select);
    container.appendChild(form);

    return container;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const select = canvas.querySelector("select") as HTMLSelectElement;
    const form = canvas.querySelector("form") as HTMLFormElement;

    expect(select).not.toBeNull();
    expect(select).toHaveClass("select");
    expect(select).toBeRequired();
    expect(select).toHaveValue("");

    form.reportValidity();

    expect(select.validity.valid).toBe(false);
    expect(select.validity.valueMissing).toBe(true);
  },
};
