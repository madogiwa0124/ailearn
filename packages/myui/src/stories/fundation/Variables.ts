const PREFIX_STYLE_MAPPING = {
  color: /--color-(.*)/,
  shadow: /--shadow-(.*)/,
  spacing: /--spacing-(.*)/,
  typography:
    /--(line-height|font-size|font-weight|font-family|letter-spacing)(.*)/,
  corner: /--border-radius(.*)/,
};

type DesignToken = {
  [key in keyof typeof PREFIX_STYLE_MAPPING]?: Property[];
};

export type Property = {
  name: string;
  value: string;
  styleType: keyof typeof PREFIX_STYLE_MAPPING | undefined;
};

type CreatePropertyElement = (property: Property) => HTMLElement;

export const customProperties = (
  element: HTMLElement,
  prefixStyleMapping: typeof PREFIX_STYLE_MAPPING = PREFIX_STYLE_MAPPING,
): Property[] => {
  const htmlStyle = element?.computedStyleMap() ?? [];
  const entries = Array.from(htmlStyle.entries());
  const properties = entries.filter(([propertyName, _]) =>
    propertyName.startsWith("--"),
  );
  return properties.map(([name, value]) => ({
    name,
    value: value.toString(),
    styleType: calcStyleType(name, prefixStyleMapping),
  }));
};

export const designTokens = (properties: Property[]): DesignToken => {
  const tokens = properties.filter((property) => property.styleType);
  // @ts-expect-error
  const result = Object.groupBy(tokens, (property) => property.styleType);
  return result as DesignToken;
};

export const createColorElement: CreatePropertyElement = (property) => {
  const colorElement = document.createElement("div");
  const text = document.createElement("span");
  text.textContent = `${property.name}: ${property.value}`;
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

export const createSpacingElement: CreatePropertyElement = (property) => {
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

export const createTypographyElement: CreatePropertyElement = (property) => {
  const typographyElement = document.createElement("div");
  typographyElement.style.display = "flex";
  typographyElement.style.flexDirection = "column";
  typographyElement.style.gap = "0.5rem";
  typographyElement.style.padding = "1rem";
  typographyElement.style.border = "1px solid #e0e0e0";
  typographyElement.style.borderRadius = "0.25rem";
  typographyElement.style.margin = "0.5rem";
  typographyElement.style.backgroundColor = "#fafafa";

  // プロパティ名と値を表示（px値とrem換算値を併記）
  const propertyInfo = document.createElement("div");
  const remValue = convertPxToRem(property.value, 16); // 16pxを基準とする
  let valueDisplay = `${property.name}: ${property.value}`;
  if (remValue && remValue !== property.value) {
    valueDisplay += ` (${remValue})`;
  }
  propertyInfo.textContent = valueDisplay;
  propertyInfo.style.fontSize = "0.875rem";
  propertyInfo.style.color = "#666";
  propertyInfo.style.fontFamily = "monospace";

  // サンプルテキスト
  const sampleText = document.createElement("div");
  sampleText.textContent = "サンプルテキスト Sample Text 123";

  // プロパティタイプに応じてスタイルを適用
  if (property.name.includes("font-size")) {
    sampleText.style.fontSize = property.value;
  } else if (property.name.includes("font-weight")) {
    sampleText.style.fontWeight = property.value;
  } else if (property.name.includes("line-height")) {
    sampleText.style.lineHeight = property.value;
  } else if (property.name.includes("letter-spacing")) {
    sampleText.style.letterSpacing = property.value;
  } else if (property.name.includes("font-family")) {
    sampleText.style.fontFamily = property.value;
  }

  typographyElement.appendChild(propertyInfo);
  typographyElement.appendChild(sampleText);
  return typographyElement;
};

export const createShadowElement: CreatePropertyElement = (property) => {
  const shadowElement = document.createElement("div");
  shadowElement.style.display = "flex";
  shadowElement.style.flexDirection = "column";
  shadowElement.style.gap = "0.5rem";
  shadowElement.style.padding = "2rem";
  shadowElement.style.margin = "1rem";
  shadowElement.style.backgroundColor = "#ffffff";
  shadowElement.style.borderRadius = "0.5rem";
  shadowElement.style.border = "1px solid #e0e0e0";

  // プロパティ名と値を表示
  const propertyInfo = document.createElement("div");
  propertyInfo.textContent = `${property.name}: ${property.value}`;
  propertyInfo.style.fontSize = "0.875rem";
  propertyInfo.style.color = "#666";
  propertyInfo.style.fontFamily = "monospace";
  propertyInfo.style.marginBottom = "1rem";

  // シャドウのサンプル要素
  const sampleBox = document.createElement("div");
  sampleBox.textContent = "Shadow Sample";
  sampleBox.style.padding = "1.5rem";
  sampleBox.style.backgroundColor = "#f8f9fa";
  sampleBox.style.borderRadius = "0.25rem";
  sampleBox.style.textAlign = "center";
  sampleBox.style.color = "#333";
  sampleBox.style.fontWeight = "500";
  sampleBox.style.boxShadow = property.value;

  shadowElement.appendChild(propertyInfo);
  shadowElement.appendChild(sampleBox);
  return shadowElement;
};

export const createCornerElement: CreatePropertyElement = (property) => {
  const cornerElement = document.createElement("div");
  cornerElement.style.display = "flex";
  cornerElement.style.flexDirection = "column";
  cornerElement.style.gap = "0.5rem";
  cornerElement.style.padding = "2rem";
  cornerElement.style.margin = "1rem";
  cornerElement.style.backgroundColor = "#ffffff";
  cornerElement.style.border = "1px solid #e0e0e0";

  // プロパティ名と値を表示
  const propertyInfo = document.createElement("div");
  propertyInfo.textContent = `${property.name}: ${property.value}`;
  propertyInfo.style.fontSize = "0.875rem";
  propertyInfo.style.color = "#666";
  propertyInfo.style.fontFamily = "monospace";
  propertyInfo.style.marginBottom = "1rem";

  // コーナー（border-radius）のサンプル要素
  const sampleBox = document.createElement("div");
  sampleBox.textContent = "Corner Sample";
  sampleBox.style.padding = "1.5rem";
  sampleBox.style.backgroundColor = "#3b82f6";
  sampleBox.style.color = "white";
  sampleBox.style.textAlign = "center";
  sampleBox.style.fontWeight = "500";
  sampleBox.style.borderRadius = property.value;
  sampleBox.style.border = "2px solid #1e40af";

  cornerElement.appendChild(propertyInfo);
  cornerElement.appendChild(sampleBox);
  return cornerElement;
};

// pxをremに変換するヘルパー関数
const convertPxToRem = (
  value: string,
  rootFontSize: number,
): string | undefined => {
  const match = value.match(/^([\d.]+)px$/);
  if (match) {
    const pxValue = Number.parseFloat(match[1]);
    const remValue = pxValue / rootFontSize;
    return `${remValue.toFixed(3)}rem`;
  }
  return undefined;
};

const calcStyleType = (
  name: string,
  prefixStyleMapping: typeof PREFIX_STYLE_MAPPING,
): keyof typeof prefixStyleMapping | undefined => {
  for (const [styleType, regex] of Object.entries(prefixStyleMapping)) {
    if (regex.test(name)) {
      return styleType as keyof typeof prefixStyleMapping;
    }
  }
  return undefined;
};
