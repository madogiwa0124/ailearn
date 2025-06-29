export interface HeadingProps {
  text?: string;
  level?: number;
  className?: string;
}

export const createHeading = (props: HeadingProps = {}): HTMLElement => {
  const { text = "Heading", level = 1, className = "" } = props;

  const safeLevel = Math.max(1, Math.min(6, level));

  const heading = document.createElement(`h${safeLevel}`);
  heading.textContent = text;

  heading.classList.add(`h${safeLevel}`);

  if (className) {
    heading.classList.add(className);
  }

  return heading;
};

export const styleAsHeading = (
  element: HTMLElement,
  props: HeadingProps = {},
): HTMLElement => {
  const { level = 1, className = "" } = props;

  const safeLevel = Math.max(1, Math.min(6, level));

  element.className = "";

  element.classList.add(`h${safeLevel}`);

  if (className) {
    element.classList.add(className);
  }

  return element;
};
