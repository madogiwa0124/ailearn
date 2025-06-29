export interface ButtonProps {
  label?: string;
  variant?: "primary" | "secondary" | "tertiary";
  outline?: boolean;
  block?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  iconOnly?: boolean;
  onClick?: (event: MouseEvent) => void;
}

export const createButton = (props: ButtonProps = {}): HTMLButtonElement => {
  const {
    label = "Button",
    variant = "primary",
    outline = false,
    block = false,
    disabled = false,
    iconOnly = false,
    onClick = null,
  } = props;

  const button = document.createElement("button");
  button.textContent = label;
  button.type = "button";

  button.classList.add("btn");

  if (outline) button.classList.add("--outline");
  if (variant) button.classList.add(`--${variant}`);
  if (block) button.classList.add("--block");
  if (props.rounded) button.classList.add("--rounded");
  if (iconOnly) button.classList.add("--icon-only");
  if (iconOnly) button.classList.add("--icon-only");

  if (disabled) {
    button.disabled = true;
    button.classList.add("disabled");
  }

  if (onClick && typeof onClick === "function") {
    button.addEventListener("click", onClick);
  }

  return button;
};
