export interface CheckboxProps {
  name?: string;
  value?: string;
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface LabelProps {
  text: string;
  htmlFor: string;
  cursor?: string;
  userSelect?: string;
}

export function createCheckbox(props: CheckboxProps = {}): HTMLInputElement {
  const {
    name = "checkbox",
    value = "checkbox",
    id,
    checked = false,
    disabled = false,
    className = "checkbox",
  } = props;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = className;
  checkbox.name = name;
  checkbox.value = value;
  checkbox.checked = checked;
  checkbox.disabled = disabled;

  if (id) {
    checkbox.id = id;
  }

  return checkbox;
}

export function createLabel(props: LabelProps): HTMLLabelElement {
  const {
    text,
    htmlFor,
    cursor = "pointer",
    userSelect = "none",
  } = props;

  const label = document.createElement("label");
  label.htmlFor = htmlFor;
  label.textContent = text;
  label.style.cursor = cursor;
  label.style.userSelect = userSelect;

  return label;
}

export function createCheckboxWithLabel(
  checkboxProps: CheckboxProps & { id: string },
  labelText: string
): HTMLDivElement {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.gap = "0.5rem";

  const checkbox = createCheckbox(checkboxProps);
  const label = createLabel({
    text: labelText,
    htmlFor: checkboxProps.id,
  });

  container.appendChild(checkbox);
  container.appendChild(label);

  return container;
}
