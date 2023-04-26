import { execSync } from "child_process";
import fs from "fs";

const CLI_PATH = "./bin/eml-to-pdf.js";
const TEST_EML_FILE = "./test.eml";

describe("eml-to-pdf-cli", () => {
  it("should convert EML file to PDF", () => {
    const outputFilePath = TEST_EML_FILE + ".pdf";

    // Remove existing output file if it exists
    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }

    // Run the CLI command
    execSync(`${CLI_PATH} ${TEST_EML_FILE}`);

    // Check that the output file was created
    expect(fs.existsSync(outputFilePath)).toBeTruthy();
  });

  it("should show help message", () => {
    const output = execSync(`${CLI_PATH} --help`);
    const outputString = output.toString();

    expect(outputString).toContain("Usage: eml-to-pdf [options] <file>");
    expect(outputString).toContain("--help");
    expect(outputString).toContain("--version");
  });

  it("should show version number", () => {
    const output = execSync(`${CLI_PATH} --version`);
    const outputString = output.toString().trim();

    expect(outputString).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
