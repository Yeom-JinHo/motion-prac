import { TodoComponent } from "./components/page/item/todo.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { PageComponent } from "./components/page/page.js";
import { VideoComponent } from "./components/page/item/video.js";

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

    const note = new NoteComponent("Note Title", "Note body");
    note.attatchTo(appRoot, "beforeend");

    const todo = new TodoComponent("Todo Title", "Todo Item");
    todo.attatchTo(appRoot, "beforeend");

    const video = new VideoComponent(
      "Youtube Video",
      "https://youtu.be/K3-jG52XwuQ"
    );
    video.attatchTo(appRoot, "beforeend");
  }
}

new App(document.querySelector(".document")! as HTMLElement);
