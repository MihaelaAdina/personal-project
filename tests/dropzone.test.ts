import { test } from "@playwright/test";
import { expect } from "@playwright/test";
import { FileDropzone } from "../pageObjects/FileDropzone";

const fileName = "50mb.pdf";
const fileLocation = "./tests/Files/" + fileName;

test.beforeEach(async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");
});

test("verify successful file upload", async ({ page }) => {
  const dropzone = new FileDropzone(page);

  await expect(dropzone.pageTitle).toBeVisible();
  await dropzone.dropzoneUpload.setInputFiles(fileLocation);

  await expect(dropzone.dzFileVerification).toContainText("50mb.pdf");
  await expect(dropzone.dzFileVerification).toContainText("✔");
});

test("upload multiple file types and sizes", async ({ page }) => {
  const filesToTest = ["10MB.txt", "30mb.xlsx", "20mb.docx", "50mb.pdf", "10MB.txt"];
  const dropzone = new FileDropzone(page);

  await expect(dropzone.pageTitle).toBeVisible();
  const filePaths = [
    './tests/Files/10MB.txt',
    './tests/Files/30mb.xlsx',
    './tests/Files/20mb.docx',
    './tests/Files/50mb.pdf',
    './tests/Files/10MB.txt'
  ];

  await page.setInputFiles('.dz-hidden-input', filePaths);

  for (const fileName of filesToTest) {
    await expect(dropzone.dzFileVerification).toContainText(fileName);  
    await expect(dropzone.dzFileVerification).toContainText('✔');
  }
});
