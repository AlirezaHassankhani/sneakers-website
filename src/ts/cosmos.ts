const $ = document;

export interface IItem {
  thumbnail: string;
  src: string;
}

class Cosmos {
  private wrapper: HTMLDivElement;
  private items: IItem[];
  private mainView: HTMLImageElement;
  private thumbnailStrip: HTMLDivElement;

  constructor(wrapper: string, items: IItem[]) {
    const query = $.querySelector(wrapper);
    if (query instanceof HTMLDivElement) {
      this.wrapper = query;
    } else {
      throw new Error("wrapper is invalid");
    }

    const mainView = this.wrapper.querySelector(".main-view");
    const thumbnailStrip = this.wrapper.querySelector(".thumbnail-strip");

    if (!mainView || !thumbnailStrip) {
      throw Error("wrapper is invalid");
    }

    if (mainView instanceof HTMLImageElement) {
      this.mainView = mainView;
      this.changeMainViewImage(items[0].src);
    } else {
      throw new Error("wrapper is invalid");
    }

    if (thumbnailStrip instanceof HTMLDivElement) {
      this.thumbnailStrip = thumbnailStrip;
      this.thumbnailStrip.classList.add(...["max-lg:hidden", "grid", "grid-cols-4", "gap-4", "xl:gap-10", "mt-8"]);
    } else {
      throw new Error("wrapper is invalid");
    }

    this.items = items;

    this.items.forEach((item) => this.thumbnailStrip.append(this.getThumbnailItmeTemplate(item)));
  }

  getThumbnailItmeTemplate({ src, thumbnail }: IItem): HTMLDivElement {
    const image = $.createElement("img");
    image.src = thumbnail;
    image.classList.add(
      ...["thumbnail-image", "object-cover", "group-data-[is-selected=true]:opacity-60"]
    );

    const div = $.createElement("div");
    div.dataset.isSelected = "false";
    div.classList.add(
      ...[
        "thumbnail-item",
        "relative",
        "cursor-pointer",
        "group",
        "rounded-2xl",
        "overflow-hidden",
        "border-orange",
        "data-[is-selected=true]:border-2",
      ]
    );

    div.append(image);

    div.addEventListener("click", () => this.changeMainViewImage(src));

    return div;
  }

  changeMainViewImage(src: string) {
    this.mainView.src = src;
  }
}

export default Cosmos;
