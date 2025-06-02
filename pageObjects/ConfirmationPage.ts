import { expect, Locator, Page } from "@playwright/test";

export class ConfirmationPage {
  readonly page: Page;
  readonly successfullUploadMessage: Locator;
  readonly failUploadMessage: Locator;
  readonly uploadedFileName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successfullUploadMessage = page.getByRole("heading", {name: "File Uploaded!",});
    this.uploadedFileName = page.locator("#uploaded-files");
    this.failUploadMessage = page.getByRole('heading', {name: 'Internal Server Error'});
  }

  async checkFileName(expectedFileName: string) {
    await this.uploadedFileName.waitFor({state: "visible"});
    await expect(this.uploadedFileName).toHaveText(expectedFileName);
  }
}
