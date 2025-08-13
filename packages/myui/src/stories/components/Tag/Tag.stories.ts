import type { Meta, StoryObj } from "@storybook/html";
import { expect } from "@storybook/test";

const meta: Meta = {
  title: "Components/Tag",
  tags: ["autodocs"],
  argTypes: {
    outline: {
      control: { type: "boolean" },
      description: "Enable or disable the outline style for the tag.",
    },
    label: {
      control: { type: "text" },
      description: "The label text for the tag.",
    },
    size: {
      control: { type: "select" },
      options: ["small", "default"],
      description: "The size of the tag.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the tag for link or button.",
    },
    transition: {
      control: { type: "boolean" },
      description: "Enable or disable the transition effect for the tag.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "example text.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const container = document.createElement("div");
    const tag = document.createElement("div");
    tag.className = "tag";
    if (args.outline) tag.classList.add("--outline");
    tag.classList.add(`--${args.size}` || "default");
    if (args.transition) tag.classList.add("--transition");
    const tagText = document.createElement("span");
    tagText.textContent = args.label;
    tag.appendChild(tagText);
    container.appendChild(tag);
    return container;
  },
  args: {
    outline: false,
    label: "Tag label",
    size: "default",
    transition: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const tag = canvas.querySelector(".tag") as HTMLElement;
    const tagText = tag.querySelector("span") as HTMLSpanElement;

    expect(canvas).not.toBeNull();
    expect(tag).not.toBeNull();
    expect(tag).toHaveClass("tag");
    expect(tagText).toHaveTextContent("Tag label");

    expect(tag).not.toHaveClass("--outline");
    expect(tag).not.toHaveClass("--small");
    expect(tag).not.toHaveClass("--transition");
  },
};

export const Link: Story = {
  render: (args) => {
    const container = document.createElement("div");
    const tag = document.createElement("button");
    tag.className = "tag";
    if (args.outline) tag.classList.add("--outline");
    if (args.disabled) tag.disabled = true;
    if (args.transition) tag.classList.add("--transition");
    const tagText = document.createElement("span");
    tagText.textContent = args.label;
    tag.appendChild(tagText);
    container.appendChild(tag);
    return container;
  },
  args: {
    label: "Tag label",
    disabled: false,
    transition: false,
    outline: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const tag = canvas.querySelector(".tag") as HTMLButtonElement;
    const tagText = tag.querySelector("span") as HTMLSpanElement;

    expect(canvas).not.toBeNull();
    expect(tag).not.toBeNull();
    expect(tag).toHaveClass("tag");
    expect(tagText).toHaveTextContent("Tag label");

    expect(tag.tagName).toBe("button");
    expect(tag).not.toBeDisabled();
  },
};

export const Outline: Story = {
  render: (args) => {
    const container = document.createElement("div");
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.classList.add("--outline");
    tag.classList.add(`--${args.size}` || "default");
    if (args.transition) tag.classList.add("--transition");
    const tagText = document.createElement("span");
    tagText.textContent = args.label;
    tag.appendChild(tagText);
    container.appendChild(tag);
    return container;
  },
  args: {
    label: "Tag label",
    size: "default",
    transition: false,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const tag = canvas.querySelector(".tag") as HTMLElement;
    const tagText = tag.querySelector("span") as HTMLSpanElement;

    expect(canvas).not.toBeNull();
    expect(tag).not.toBeNull();
    expect(tag).toHaveClass("tag");
    expect(tag).toHaveClass("--outline");
    expect(tagText).toHaveTextContent("Tag label");
  },
};

export const WithIcon: Story = {
  render: (args) => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "10px";
    const tagIconLeft = document.createElement("div");
    tagIconLeft.className = "tag";
    tagIconLeft.innerHTML = `<span class="icon">+</span> <span>${args.label}</span>`;
    const tagIconRight = document.createElement("div");
    tagIconRight.className = "tag";
    tagIconRight.innerHTML = `<span>${args.label}</span> <span class="icon">-</span>`;
    container.appendChild(tagIconLeft);
    container.appendChild(tagIconRight);
    return container;
  },
  args: {
    label: "tag with Icon",
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const tags = canvas.querySelectorAll(".tag") as NodeListOf<HTMLElement>;

    expect(canvas).not.toBeNull();
    expect(tags).toHaveLength(2);

    const leftIconTag = tags[0];
    const leftIcon = leftIconTag.querySelector(".icon") as HTMLSpanElement;
    const leftText = leftIconTag.querySelectorAll("span")[1] as HTMLSpanElement;

    expect(leftIconTag).toHaveClass("tag");
    expect(leftIcon).toHaveTextContent("+");
    expect(leftText).toHaveTextContent("tag with Icon");

    const rightIconTag = tags[1];
    const rightIcon = rightIconTag.querySelector(".icon") as HTMLSpanElement;
    const rightText = rightIconTag.querySelectorAll(
      "span",
    )[0] as HTMLSpanElement;

    expect(rightIconTag).toHaveClass("tag");
    expect(rightIcon).toHaveTextContent("-");
    expect(rightText).toHaveTextContent("tag with Icon");
  },
};
