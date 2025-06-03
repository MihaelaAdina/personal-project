import { Locator, Page } from "@playwright/test";
import { UploadPage } from "./UploadPage";

export class FileDropzone extends UploadPage {
  readonly dropzoneUpload: Locator;
  readonly dzFileVerification: Locator;

  constructor(page: Page) {
    super(page);
    this.dropzoneUpload = page.locator(".dz-hidden-input");
    this.dzFileVerification = page.locator(".dz-success-mark.dz-clickable")
  }
}
