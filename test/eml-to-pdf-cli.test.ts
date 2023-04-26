import test from 'ava'
import { execSync } from 'child_process'
import fs from 'fs'

const CLI_PATH = './bin/eml-to-pdf.js'
const TEST_EML_FILE = './test.eml'

test('should convert EML file to PDF', (t) => {
  const outputFilePath = TEST_EML_FILE + '.pdf'

  // Remove existing output file if it exists
  if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath)
  }

  // Run the CLI command
  execSync(`${CLI_PATH} ${TEST_EML_FILE}`)

  // Check that the output file was created
  t.true(fs.existsSync(outputFilePath))
})

test('should show help message', (t) => {
  const output = execSync(`${CLI_PATH} --help`)
  const outputString = output.toString()

  t.true(outputString.includes('Usage: eml-to-pdf [options] <file>'))
  t.true(outputString.includes('--help'))
  t.true(outputString.includes('--version'))
})

test('should show version number', (t) => {
  const output = execSync(`${CLI_PATH} --version`)
  const outputString = output.toString().trim()

  t.regex(outputString, /^\d+\.\d+\.\d+$/)
})
