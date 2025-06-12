export const createVariableElements = (element: HTMLElement): HTMLElement => {
  const container = document.createElement("div");
  container.classList.add("variables-container");

  const variables = customProperties(element);

  for (const [name, value] of Object.entries(variables)) {
    const variableElement = document.createElement("div");
    variableElement.classList.add("variable");
    variableElement.style.setProperty(name, value);
    variableElement.textContent = `${name}: ${value}`;
    container.appendChild(variableElement);
  }

  return container;
};

const customProperties = (element: HTMLElement) => {
  const htmlStyle = element?.computedStyleMap() ?? [];
  for (const [propertyName, value] of htmlStyle.entries()) {
    if (/^--/.test(propertyName.toString())) {
      console.log({ [propertyName]: value.toString() });
    }
  }
  const customProps: Record<string, string> = {};
  for (const [propertyName, value] of htmlStyle.entries()) {
    if (/^--/.test(propertyName.toString())) {
      customProps[propertyName.toString()] = value.toString();
    }
  }
  return customProps;
};
