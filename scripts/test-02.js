//import printer from  'printer'
import printer from '@thiagoelg/node-printer'
import fs from 'fs'
import ConvertSvgToJpeg from 'convert-svg-to-jpeg'

const convert = ConvertSvgToJpeg.convert

console.log('Starting 🚀🚀🚀')

start().then(() => {
  process.exit(0)
})

async function start() {

  const name = printer.getDefaultPrinterName()

  if (!name) {
    throw 'No Default printer'
  } else {
    console.log('Default printer --> ', name)
  }

  const svg = await getSvg()
  const png = await convert(svg)

  await print(png)
}

function getSvg() {
  return fs.readFileSync('./scripts/test.svg', 'utf8')
}

function print(data) {
  let p = new Promise((resolve) => {
    printer.printDirect({
      data: data,
      type: 'JPEG',
      success: (id) => {
        console.log(`Sent to printer with job id: ${id}`)
        resolve()
      },
      error: (err) => {
        console.log(err)
        resolve()
      }

    })
  })

  return p
}