import { test } from "@playwright/test";
import { expect } from "@playwright/test";
import { ConfirmationPage } from "../pageObjects/ConfirmationPage";
import { UploadPage } from "../pageObjects/UploadPage";

const fileName = "20mb.docx";
const fileLocation = "./tests/Files/" + fileName;

test.beforeEach(async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");
});

test("verify successful file upload", async ({ page }) => {
  const confirmation = new ConfirmationPage(page);
  const uploadPage = new UploadPage(page);

  await expect(uploadPage.pageTitle).toBeVisible();
  await uploadPage.chooseFileButton.setInputFiles(fileLocation);
  await uploadPage.uploadButton.click();
  await expect(confirmation.successfullUploadMessage).toBeVisible();
  await confirmation.checkFileName(fileName);
});

test("show an error when uploading without a file'", async ({ page }) => {
  const confirmation = new ConfirmationPage(page);
  const uploadPage = new UploadPage(page);
  
  await uploadPage.uploadButton.click();
  await expect(confirmation.failUploadMessage).toHaveText("Internal Server Error");
});

test("upload different file types and sizes", async ({ page }) => {
  const filesToTest = ["10MB.txt", "30mb.xlsx", "20mb.docx"];
  const confirmation = new ConfirmationPage(page);
  const uploadPage = new UploadPage(page);

  for (const fileName of filesToTest) {
    const filePath = `./tests/Files/${fileName}`;

    await page.setInputFiles("#file-upload", filePath);
    await uploadPage.uploadButton.click();
    await page.waitForLoadState("domcontentloaded");
    await confirmation.checkFileName(fileName);
    await page.goto("https://the-internet.herokuapp.com/upload");
  }
});
