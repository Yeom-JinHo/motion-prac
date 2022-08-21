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
import {
  InputDialog,
  MediaData,
  TextData,
} from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";

type InPutComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};
class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attatchTo(appRoot);
    this.bindElementToDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );

    this.page.addChild(
      new ImageComponent("Image Title", "https://picsum.photos/800/400")
    );
    this.page.addChild(
      new VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0")
    );
    this.page.addChild(
      new NoteComponent("Note Title", "Don't forget to code your dream")
    );
    this.page.addChild(new TodoComponent("Todo Title", "TypeScript Course!"));
    this.page.addChild(
      new ImageComponent("Image Title", "https://picsum.photos/800/400")
    );
    this.page.addChild(
      new VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0")
    );
    this.page.addChild(
      new NoteComponent("Note Title", "Don't forget to code your dream")
    );
    this.page.addChild(new TodoComponent("Todo Title", "TypeScript Course!"));
    // const image = new ImageComponent(
    //   "Image title",
    //   "https://picsum.photos/600/300"
    // );
    // this.page.addChild(image);
    // // image.attatchTo(appRoot, "beforeend");

    // const video = new VideoComponent(
    //   "Youtube Video",
    //   "https://youtu.be/K3-jG52XwuQ"
    // );
    // this.page.addChild(video);
    // // video.attatchTo(appRoot, "beforeend");

    // const note = new NoteComponent("Note Title", "Note body");
    // this.page.addChild(note);
    // // note.attatchTo(appRoot, "beforeend");

    // const todo = new TodoComponent("Todo Title", "Todo Item");
    // this.page.addChild(todo);
    // todo.attatchTo(appRoot, "beforeend");

    // const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    // imageBtn.addEventListener("click", () => {
    //   const dialog = new InputDialog();
    //   const mediaSection = new MediaSectionInput();
    //   dialog.addChild(mediaSection);
    //   dialog.attatchTo(dialogRoot);

    //   dialog.setCloseListener(() => {
    //     dialog.removeFrom(dialogRoot);
    //   });

    //   dialog.setSubmitListener(() => {
    //     const image = new ImageComponent(mediaSection.title, mediaSection.url);
    //     this.page.addChild(image);
    //     dialog.removeFrom(dialogRoot);
    //   });
    // });
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InPutComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attatchTo(this.dialogRoot);

      dialog.setCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setSubmitListener(() => {
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
