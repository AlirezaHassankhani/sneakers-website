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
      throw new Error("Wrapper is invalid");
    }

    const mainView = this.wrapper.querySelector(".main-view");
    const thumbnailStrip = this.wrapper.querySelector(".thumbnail-strip");

    if (!mainView || !thumbnailStrip) {
      throw Error("Wrapper is invalid");
    }

    if (mainView instanceof HTMLImageElement) {
      this.mainView = mainView;
      this.changeMainViewImage(items[0].src);
    } else {
      throw new Error("Main view (.main-view) must be an <img> inside the wrapper.");
    }

    if (thumbnailStrip instanceof HTMLDivElement) {
      this.thumbnailStrip = thumbnailStrip;
      this.thumbnailStrip.classList.add(
        ...["max-lg:hidden", "grid", "grid-cols-4", "gap-4", "xl:gap-10", "mt-8"]
      );
    } else {
      throw new Error("Thumbnail strip (.thumbnail-strip) must be a <div> inside the wrapper.");
    }

    this.items = items;

    this.items.forEach((item) => this.thumbnailStrip.append(this.getThumbnailItemTemplate(item)));
  }

  getThumbnailItemTemplate({ src, thumbnail }: IItem): HTMLDivElement {
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

    div.addEventListener("click", () => {
      this.disableAllThumbnails();
      this.changeMainViewImage(src);
      div.dataset.isSelected = "true";
    });

    return div;
  }

  changeMainViewImage(src: string) {
    this.mainView.src = src;
  }

  disableAllThumbnails() {
    const thumbnailItems = this.thumbnailStrip.querySelectorAll(".thumbnail-item");
    thumbnailItems.forEach((thumbnailItem) => {
      if (thumbnailItem instanceof HTMLDivElement) {
        thumbnailItem.dataset.isSelected = "false";
      }
    });
  }
}

export default Cosmos;
