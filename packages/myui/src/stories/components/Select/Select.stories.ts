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

    await userEvent.selectOptions(select, "option2");
    expect(select).toHaveValue("option2");
  },
};

export const Disabled: Story = {
  render: () => {
    const select = document.createElement("select");
    select.className = "select";
    select.disabled = true;
    select.innerHTML = `
      <option value="option1">Option 1</option>
      <option value="option2" selected>Option 2 (選択済み)</option>
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
    const label = document.createElement("label");
    label.textContent = "必須項目";
    label.setAttribute("for", "required-select");

    const select = document.createElement("select");
    select.className = "select";
    select.id = "required-select";
    select.required = true;
    select.innerHTML = `
      <option value="">-- 選択してください --</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      `;

    form.reportValidity();
    form.appendChild(label);
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
