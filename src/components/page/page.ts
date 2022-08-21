import { Component, BaseComponent } from "./../component.js";

export interface Composable {
  addChild(child: Component): void;
}
type OnCloseListener = () => void;
type DragState = "start" | "stop" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: "mute" | "unmute"): void;
  getBoudingRect(): DOMRect;
  onDropped(): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};
export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListner?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;
  constructor() {
    super(`
    <li draggable="true" class="page-item">
      <section class="page-item__body"></section>
      <div class="page-item__controls"><button class="close">&times;</button></div>
    </li>
    `);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListner && this.closeListner();
    };
    this.element.addEventListener("dragstart", (e: DragEvent) => {
      this.onDragStart(e);
    });
    this.element.addEventListener("dragend", (e: DragEvent) => {
      this.onDragEnd(e);
    });

    this.element.addEventListener("dragenter", (e: DragEvent) => {
      this.onDragEnter(e);
    });

    this.element.addEventListener("dragleave", (e: DragEvent) => {
      this.onDragLeave(e);
    });
  }
  onDragStart(e: DragEvent) {
    this.notifyDragObserver("start");
    this.element.classList.add("lifted");
  }
  onDragEnd(e: DragEvent) {
    this.notifyDragObserver("stop");
    this.element.classList.remove("lifted");
  }
  onDragEnter(e: DragEvent) {
    this.notifyDragObserver("enter");
    this.element.classList.add("drop-area");
  }
  onDragLeave(e: DragEvent) {
    this.notifyDragObserver("leave");
    this.element.classList.remove("drop-area");
  }

  onDropped(): void {
    this.element.classList.remove("drop-area");
  }
  notifyDragObserver(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }
  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attatchTo(container);
  }
  setOnCloseListener(listner: OnCloseListener) {
    this.closeListner = listner;
  }
  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
  muteChildren(state: "mute" | "unmute") {
    if (state === "mute") {
      this.element.classList.add("mute-children");
    } else {
      this.element.classList.remove("mute-children");
    }
  }
  getBoudingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  private dropTarget?: SectionContainer;
  private dragTarget?: SectionContainer;
  private children = new Set<SectionContainer>();

  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
    this.element.addEventListener("dragover", (e: DragEvent) => {
      this.onDragOver(e);
    });
    this.element.addEventListener("drop", (e: DragEvent) => {
      this.onDrop(e);
    });
  }
  onDragOver(e: DragEvent) {
    e.preventDefault();
  }
  onDrop(e: DragEvent) {
    e.preventDefault();
    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = e.clientY;
      const srcEle = this.dragTarget.getBoudingRect();
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(
        this.dragTarget,
        dropY < srcEle.y ? "beforebegin" : "afterend"
      );
    }
    this.dropTarget.onDropped();
  }
  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attatchTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {
        switch (state) {
          case "start":
            this.dragTarget = target;
            this.updateSections("mute");
            break;
          case "stop":
            this.dragTarget = undefined;
            this.updateSections("unmute");
            break;
          case "enter":
            console.log("enter", target);
            this.dropTarget = target;
            break;
          case "leave":
            console.log("leave", target);
            this.dropTarget = undefined;
            break;
          default:
            console.log(this.dragTarget, this.dropTarget);
            throw new Error("unsupported ! " + state);
        }
        console.log(target, state);
      }
    );
  }
  private updateSections(state: "mute" | "unmute") {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}
