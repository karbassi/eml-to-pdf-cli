import * as fs from 'fs'
import * as path from 'path'
import * as yargs from 'yargs'
import { EmlParser } from 'eml-parser'

interface Arguments {
  file: string
}

const argv = yargs
  .usage('Usage: $0 --file [file]')
  .option('file', {
    alias: 'f',
    demandOption: true,
    describe: 'EML file path',
    type: 'string',
  })
  .help('h')
  .alias('h', 'help').argv as unknown as Arguments

const emlFilePath = path.resolve(argv.file)
const emlFile = fs.createReadStream(emlFilePath)
const pdfFilePath = `${emlFilePath}.pdf`

new EmlParser(emlFile)
  .convertEmailToStream('pdf')
  .then((stream) => {
    stream.pipe(fs.createWriteStream(pdfFilePath))
  })
  .catch((err) => {
    console.error(err)
  })
