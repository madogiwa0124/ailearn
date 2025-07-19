export interface CardProps {
  className?: string;
  floating?: boolean;
  content?: string;
  image?: string;
  style?: string;
}

export function createCard(props: CardProps = {}): HTMLDivElement {
  const { className = "card", floating = false, content, image, style } = props;

  const card = document.createElement("div");

  const classes = [className];
  if (floating) classes.push("--floating");

  card.className = classes.join(" ");
  if (style) {
    card.style.cssText = style;
  }

  if (image) {
    const imageElement = document.createElement("img");
    imageElement.className = "card__image";
    imageElement.src = image;
    imageElement.alt = "Card Image";
    card.appendChild(imageElement);
  }

  if (content) {
    const contentElement = document.createElement("div");
    contentElement.className = "card__content";
    contentElement.innerHTML = content;
    card.appendChild(contentElement);
  }

  return card;
}
