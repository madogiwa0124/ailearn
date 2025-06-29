export interface ParagraphProps {
  text?: string;
  className?: string;
}

export const createParagraph = (props: ParagraphProps = {}): HTMLElement => {
  const { text = "パラグラフのテキスト", className = "" } = props;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  paragraph.classList.add("paragraph");

  if (className) {
    paragraph.classList.add(className);
  }

  return paragraph;
};

export const styleAsParagraph = (
  element: HTMLElement,
  props: ParagraphProps = {},
): HTMLElement => {
  const { className = "" } = props;

  element.className = "";

  element.classList.add("paragraph");

  if (className) {
    element.classList.add(className);
  }

  return element;
};
