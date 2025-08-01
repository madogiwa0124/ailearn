import type { Meta, StoryObj } from "@storybook/html";
import { expect } from "@storybook/test";

const meta: Meta = {
  title: "Components/Tabs",
  tags: ["autodocs"],
  argTypes: {
    transition: {
      control: { type: "boolean" },
      description: "Enable transition effects on tab hover.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "タブコンポーネント。複数のコンテンツを切り替えて表示するためのナビゲーション要素です。アクティブ状態、無効状態、ホバー効果に対応し、transitionオプションでアニメーション効果を制御できます。\n\n**注意**: このコンポーネントはスタイリングのみを提供します。aria-controls、aria-selected、アクティブ状態に応じたtabindex値の動的変更などのアクセシビリティ対応については、別途JavaScriptでの実装が必要です。",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const container = document.createElement("div");
    const nav = document.createElement("nav");
    nav.className = "tabs";
    if (args.transition) nav.classList.add("--transition");
    nav.innerHTML = `
      <div class="tabs__list" role="tablist">
        <button class="tabs__item --active" role="tab" aria-selected="true" aria-controls="panel-1" tabindex="0">Active Tab</button>
        <button class="tabs__item" role="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">Tab 2</button>
        <button class="tabs__item" role="tab" aria-selected="false" aria-controls="panel-3" tabindex="-1">Tab 3</button>
        <button class="tabs__item" role="tab" aria-selected="false" aria-controls="panel-4" tabindex="-1" disabled>Disabled</button>
      </div>
    `;
    container.appendChild(nav);
    const buildPanel = (id: string) => {
      const panel = document.createElement("div");
      panel.id = id;
      panel.role = "tabpanel";
      return panel;
    };
    container.appendChild(buildPanel("panel-1"));
    container.appendChild(buildPanel("panel-2"));
    container.appendChild(buildPanel("panel-3"));
    container.appendChild(buildPanel("panel-4"));
    return container;
  },
  args: {
    transition: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const tabs = canvas.querySelector(".tabs") as HTMLElement;
    const activeTab = tabs.querySelector(
      ".tabs__item.--active",
    ) as HTMLButtonElement;
    const tab = tabs.querySelector(
      ".tabs__item:not(.--active)",
    ) as HTMLButtonElement;
    const disabledTab = tabs.querySelector(
      ".tabs__item[disabled]",
    ) as HTMLButtonElement;
    expect(canvas).not.toBeNull();
    expect(tabs).not.toBeNull();
    expect(tabs.querySelectorAll(".tabs__item").length).toBe(4);
    expect(tabs).toHaveClass("tabs");
    expect(tab).toHaveTextContent("Tab 2");
    expect(tab).toHaveAttribute("aria-selected", "false");
    expect(tab).toHaveAttribute("tabindex", "-1");
    expect(activeTab).toHaveTextContent("Active Tab");
    expect(activeTab).toHaveAttribute("aria-selected", "true");
    expect(activeTab).toHaveAttribute("tabindex", "0");
    expect(disabledTab).toHaveTextContent("Disabled");
    expect(disabledTab).toBeDisabled();
    expect(disabledTab).toHaveAttribute("aria-selected", "false");
    expect(disabledTab).toHaveAttribute("tabindex", "-1");
  },
};
