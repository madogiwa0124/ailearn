import type { Meta, StoryObj } from "@storybook/html";
import { expect } from "@storybook/test";

const meta: Meta = {
  title: "Components/Accordion",
  tags: ["autodocs"],
  argTypes: {
    transition: {
      control: { type: "boolean" },
      description: "Enable transition for accordion expansion",
    },
    outline: {
      control: { type: "boolean" },
      description: "Enable outline for accordion summary",
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
    const accordion = document.createElement("details");
    accordion.classList.add("accordion");
    if (args.transition) accordion.classList.add("--transition");
    if (args.outline) accordion.classList.add("--outline");
    accordion.innerHTML = `
      <summary class="accordion__summary" id="summary" aria-controls="content">
        Accordion Title
      </summary>
      <div class="accordion__content" id="content" aria-labelledby="summary">
        <p>This is the content of the accordion. It can contain any HTML elements.</p>
        <p>More content can be added here.</p>
      </div>
    `;
    container.appendChild(accordion);
    const additionalContent = document.createElement("div");
    additionalContent.innerHTML = "Additional content";
    container.appendChild(additionalContent);
    return container;
  },
  args: {
    transition: false,
    outline: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const accordion = canvas.querySelector(".accordion") as HTMLDetailsElement;
    const summary = accordion.querySelector("summary") as HTMLElement;
    const content = accordion.querySelector(
      ".accordion__content",
    ) as HTMLElement;
    expect(accordion.open).toBe(false);
    expect(content).not.toBeVisible();
    summary.click();
    expect(accordion.open).toBe(true);
    // Wait for transition to complete
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(content).toBeVisible();
    summary.click();
    expect(accordion.open).toBe(false);
    expect(content).not.toBeVisible();
  },
};
