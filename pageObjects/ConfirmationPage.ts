import { expect, Locator, Page } from "@playwright/test";

export class ConfirmationPage {
  readonly successfullUploadMessage: Locator;
  readonly uploadedFileName: Locator;
  readonly failUploadMessage: Locator;

  constructor(page: Page) {
    this.successfullUploadMessage = page.getByRole("heading", {
      name: "File Uploaded!",
    });
    this.uploadedFileName = page.locator("#uploaded-files");
    this.failUploadMessage = page.getByRole("heading", {
      name: "Internal Server Error",
    });
  }

  async checkConfirmationMessages(expectedFileName: string) {
    await expect(this.successfullUploadMessage).toBeVisible();
    await this.uploadedFileName.waitFor({ state: "visible" });
    await expect(this.uploadedFileName).toHaveText(expectedFileName);
  }
}
