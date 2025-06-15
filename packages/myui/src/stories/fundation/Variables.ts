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

export type Property = {
  name: string;
  value: string;
  styleType: keyof typeof PREFIX_STYLE_MAPPING | undefined;
};

export const customProperties = (element: HTMLElement): Property[] => {
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

export const createColorElement = (property: Property): HTMLElement => {
  const colorElement = document.createElement("div");
  const text = document.createElement("span");
  text.textContent = property.name;
  // text.style.mixBlendMode = "difference";
  text.style.color = property.value;
  text.style.filter = "invert(100%) grayscale(100%) contrast(100)";
  colorElement.classList.add("color-variable");
  colorElement.style.backgroundColor = property.value;
  colorElement.style.padding = "1rem";
  colorElement.style.borderRadius = "0.25rem";
  colorElement.style.margin = "0.5rem";
  colorElement.appendChild(text);
  return colorElement;
};

export const createSpacingElement = (property: Property): HTMLElement => {
  const spacingElement = document.createElement("div");
  spacingElement.style.display = "flex";
  spacingElement.style.alignItems = "center";
  spacingElement.style.gap = "1rem";
  const spacing = document.createElement("div");
  spacing.classList.add("spacing-variable");
  spacing.style.width = property.value;
  spacing.style.height = "2rem";
  spacing.style.border = "1px solid lightgray";
  spacing.style.margin = "0.5rem";
  const text = document.createElement("div");
  text.textContent = `${property.name}: ${property.value}`;
  spacingElement.appendChild(text);
  spacingElement.appendChild(spacing);
  return spacingElement;
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
