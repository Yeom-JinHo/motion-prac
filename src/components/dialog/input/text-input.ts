import { BaseComponent } from "../../component.js";
import { TextData } from "../dialog.js";

export class TextSectionInput
  extends BaseComponent<HTMLElement>
  implements TextData
{
  constructor() {
    super(`<div>
            <div class="form__container">
              <label for="title">Title</label>
              <input type="text" id="title" />
            </div>
            <div class="form__container">
              <label for="body">Body</label>
              <textarea type="text" id="body" row="3"/>
            </div>
          </div>
    `);
  }

  get title(): string {
    const ele = this.element.querySelector("#title")! as HTMLInputElement;
    return ele.value;
  }
  get body(): string {
    const ele = this.element.querySelector("#body")! as HTMLInputElement;
    return ele.value;
  }
}
