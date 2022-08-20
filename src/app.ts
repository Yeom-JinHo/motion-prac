import { ImageComponent } from "./page/item/image.js";
import { PageComponent } from "./page/page.js";

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attatchTo(appRoot);

    const image = new ImageComponent(
      "Image title",
      "https://picsum.photos/600/300"
    );
    image.attatchTo(appRoot, "beforeend");
  }
}

new App(document.querySelector(".document")! as HTMLElement);
