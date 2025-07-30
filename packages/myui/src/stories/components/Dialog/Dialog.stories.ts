import type { Meta, StoryObj } from "@storybook/html";
import { expect, userEvent, within } from "@storybook/test";

const meta: Meta = {
  title: "Components/Dialog",
  tags: ["autodocs"],
  argTypes: {
    backDropBlur: {
      type: "boolean",
      description: "Enable backdrop blur effect",
      defaultValue: false,
    },
    transition: {
      type: "boolean",
      description: "Enable dialog transition",
      defaultValue: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないダイアログコンポーネント。カスケードレイヤーを使用したCSS設計を採用しています。ダイアログは、ユーザーに重要な情報を表示したり、確認を求めたりするために使用されます。",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const container = document.createElement("div");
    const dialog = document.createElement("dialog");
    dialog.className = "dialog";
    if (args.backDropBlur) dialog.classList.add("--backdrop-blur");
    if (args.transition) dialog.classList.add("--transition");

    dialog.innerHTML = `
      <header class="dialog__header">
        <p style="font-weight: bold;">Are you sure?</p>
      </header>
      <div class="dialog__content">
        <p class="p">Do you really want to delete this item? Do you really want to delete this item?</p>
        <p class="p">This action cannot be undone.</p>
      </div>
      <footer class="dialog__footer">
        <button class="btn" onClick="const dialog = document.querySelector('.dialog'); dialog.close()">
          Cancel
        </button>
        &nbsp;
        <button class="btn --primary">Save</button>
      </footer>
    `;
    const openDialogButton = document.createElement("button");
    openDialogButton.textContent = "Open Dialog";
    openDialogButton.className = "btn --primary";
    openDialogButton.onclick = () => {
      dialog.showModal();
    };
    container.appendChild(openDialogButton);
    container.appendChild(dialog);
    return container;
  },
  args: {
    backDropBlur: false,
    transition: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const dialog = canvas.querySelector("dialog") as HTMLDialogElement;
    expect(dialog).not.toBeNull();
    expect(dialog.open).toBe(false);
    await userEvent.click(await within(canvas).findByText("Open Dialog"));
    expect(dialog.open).toBe(true);
    expect(dialog).toHaveTextContent("Are you sure?");
    await userEvent.click(await within(dialog).findByText("Cancel"));
    expect(dialog.open).toBe(false);
  },
};
