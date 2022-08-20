import { BaseComponent } from "../../component.js";

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
    <section class="video">
      <div class="video__player">
        <iframe class="video__iframe"></iframe>
        <h3 class="video__title"></h3>
      </div>
    </section>
    `);
    const iframe = this.element.querySelector(
      ".video__iframe"
    )! as HTMLIFrameElement;
    iframe.src = this.convertEmbeddedURL(url);

    const titleEle = this.element.querySelector(
      ".video__title"
    )! as HTMLHeadingElement;
    titleEle.textContent = title;
  }
  private convertEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);

    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return "https://www.youtube.com/embed/" + videoId;
    } else {
      return url;
    }
  }
}

// <iframe
//   width="1730"
//   height="982"
//   src="https://www.youtube.com/embed/2Y6Nne8RvaA"
//   title="Kungs vs Cookin’ on 3 Burners - This Girl (Official Music Video)"
//   frameborder="0"
//   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   allowfullscreen
// ></iframe>;
