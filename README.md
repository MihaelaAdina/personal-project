Automated testing framework for UI and API validation using **Playwright** with the **Page Object Model (POM)** design pattern.

This project covers:

- **Automated UI testing** of file upload functionality
- **REST API testing** using Playwright’s built-in API testing features

## Installation & Setup:

`git clone https://github.com/MihaelaAdina/personal-project.git`

`cd personal-project`

`npm install` (installs project dependencies)

`npx playwright install` (install the browsers binaries) 

**Running Tests**

- run all tests: `npx playwright test`
- run a specific test `npx playwright test uploadInput.test.ts`

**Test Architecture:**

This project implements the Page Object Model (POM) design pattern to improve code readability, reusability, and scalability.


The three main classes are:

1. `UploadPage.ts` - base class containing locators for page title, file upload button, and upload button. 

2. `FileDropzone.ts` (extends UploadPage) - containing locators for the Dropzone input and success icon.

3. `ConfirmationPage.ts` - Manages post-upload validation messages such as success message, uploaded file verification, and server error message.

**Test Data:**

Sample test files are located in the `tests/Files` directory.

## API testing:

The project also includes API tests using Playwright's request context and are located in `tests/api/posts.spec.ts`

## Manual testing

During testing, I identified several issues affecting the application's overall reliability, primarily related to performance feedback, page reload behavior, and handling of network connectivity.

### Identified Bugs

**1. UI layout issues with long text input**

Issue: There is no validation or text wrapping for overly long names.

Impact: Long strings overflow and break the layout, damaging UI presentation.

**2. Missing load indicator**

Issue: No loading spinner or progress bar is shown during long operations.

Impact: Users are left without feedback, leading to potential confusion or repeated actions.

**3. Unexpected reload behavior**

Issue: After reconnecting to the internet, refreshing the page does not properly reset or reload the application state, particularly after uploading a file through the "choose file" button.

Impact: The user must manually navigate back to the correct route via the browser URL.

**4. Missing scroll in dropzone area**

Issue: When uploading more than 12 files, the file list within the dropzone is not displaying a scrollbar.

Impact: Files become difficult to view or manage beyond the visible list.

**5. No duplicate validation**

Issue: There is no validation to prevent uploading duplicated files.

Impact: Could lead to redundancy, unexpected behavior, or incorrect file processing.



















