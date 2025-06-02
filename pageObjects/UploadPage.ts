import { Locator, Page } from "@playwright/test";

export class UploadPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly chooseFileButton: Locator;
    readonly uploadButton: Locator;

    constructor(page: Page) {
        this.pageTitle = page.getByRole("heading", { name: "File Uploader" });
        this.chooseFileButton = page.locator("#file-upload");
        this.uploadButton = page.locator("#file-submit");
    }
}