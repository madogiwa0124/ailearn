const PREFIX_STYLE_MAPPING = {
  color: /--color-(.*)/,
  shadow: /--shadow-(.*)/,
  fontFamily: /--font-family(.*)/,
  border: /--border-(.*)/,
  spacing: /--spacing-(.*)/,
  typography:
    /--(line-height|font-size|font-weight|font-family|letter-spacing)(.*)/,
  borderRadius: /--border-radius(.*)/,
};

type DesignToken = {
  [key in keyof typeof PREFIX_STYLE_MAPPING]?: Property[];
};

type Property = {
  name: string;
  value: string;
  styleType: keyof typeof PREFIX_STYLE_MAPPING | undefined;
};

export const createVariableElements = (element: HTMLElement): HTMLElement => {
  const container = document.createElement("div");
  container.classList.add("variables-container");
  const properties = customProperties(element);
  const tokens = designTokens(properties);
  console.log("Design Tokens:", tokens);
  console.log("Custom Color:", tokens.color);
  for (const property of tokens.color ?? []) {
    createAndAppendElements(property, createColorElement, container);
  }
  return container;
};

const customProperties = (element: HTMLElement): Property[] => {
  const htmlStyle = element?.computedStyleMap() ?? [];
  const entries = Array.from(htmlStyle.entries());
  const properties = entries.filter(([propertyName, _]) =>
    propertyName.startsWith("--"),
  );
  return properties.map(([name, value]) => ({
    name,
    value: value.toString(),
    styleType: calcStyleType(name),
  }));
};

export const designTokens = (properties: Property[]): DesignToken => {
  const tokens = properties.filter((property) => property.styleType);
  // @ts-expect-error
  const result = Object.groupBy(tokens, (property) => property.styleType);
  return result as DesignToken;
};

const createColorElement = (property: Property): HTMLElement => {
  const colorElement = document.createElement("div");
  colorElement.classList.add("color-variable");
  colorElement.style.backgroundColor = property.value;
  colorElement.textContent = `${property.name}: ${property.value}`;
  return colorElement;
};

const calcStyleType = (
  name: string,
): keyof typeof PREFIX_STYLE_MAPPING | undefined => {
  for (const [styleType, regex] of Object.entries(PREFIX_STYLE_MAPPING)) {
    if (regex.test(name)) {
      return styleType as keyof typeof PREFIX_STYLE_MAPPING;
    }
  }
  return undefined;
};

const createAndAppendElements = (
  property: Property,
  builder: (property: Property) => HTMLElement,
  appendTo: HTMLElement,
) => {
  const el = builder(property);
  appendTo.appendChild(el);
};
