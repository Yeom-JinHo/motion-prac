import { TodoComponent } from "./components/page/item/todo.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attatchTo(appRoot);

    const image = new ImageComponent(
      "Image title",
      "https://picsum.photos/600/300"
    );
    this.page.addChild(image);
    // image.attatchTo(appRoot, "beforeend");

    const video = new VideoComponent(
      "Youtube Video",
      "https://youtu.be/K3-jG52XwuQ"
    );
    this.page.addChild(video);
    // video.attatchTo(appRoot, "beforeend");

    const note = new NoteComponent("Note Title", "Note body");
    this.page.addChild(note);
    // note.attatchTo(appRoot, "beforeend");

    const todo = new TodoComponent("Todo Title", "Todo Item");
    this.page.addChild(todo);
    // todo.attatchTo(appRoot, "beforeend");

    const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    imageBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      dialog.setCloseListener(() => {
        dialog.removeFrom(document.body);
      });

      dialog.setSubmitListener(() => {
        dialog.removeFrom(document.body);
      });

      dialog.attatchTo(document.body);
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement);
