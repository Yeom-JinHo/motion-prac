import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type CloseListener = () => void;
type SubmitListener = () => void;

export class InputDialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  closeListener?: CloseListener;
  submitListener?: SubmitListener;
  constructor() {
    super(`<section class="dialog">
      <div class="dialog__container">
        <button class="close">&times;</button>
        <div id="dialog__body"></div>
        <button class="dialog__submit">ADD</button>
      </div>
    </section>
    `);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const submitBtn = this.element.querySelector(
      ".dialog__submit"
    )! as HTMLButtonElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setCloseListener(listener: CloseListener) {
    this.closeListener = listener;
  }

  setSubmitListener(listener: SubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: Component): void {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attatchTo(body);
  }
}
