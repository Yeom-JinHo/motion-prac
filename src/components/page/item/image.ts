import { BaseComponent } from "../../component.js";

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
    <section class="image">
      <div class="image__holder">
        <img class="image__thumbnail" />
      </div>
      <h2 class="image__title"></h2>
    </section>`);
    const imageEle = this.element.querySelector(
      ".image__thumbnail"
    ) as HTMLImageElement;
    imageEle.src = url;
    imageEle.alt = title;

    const titleEle = this.element.querySelector(
      ".image__title"
    )! as HTMLParagraphElement;
    titleEle.textContent = title;
  }

  attatchTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}
