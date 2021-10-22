import ConvertSvgToJpeg from 'convert-svg-to-jpeg'
import printer from '@thiagoelg/node-printer'

import fs from 'fs'

const convertToJpeg = ConvertSvgToJpeg.convert

class PrintService {

  scaleSvg() {
    //@todo!
  }
  
  async print(svg) {
   // const name = printer.getDefaultPrinterName()

    const jpeg = await convertToJpeg(svg)
    
    //fs.writeFileSync('test.jpeg', jpeg)
    //fs.writeFileSync('test.jpeg', jpeg)

    let p = new Promise( (resolve) => {
      printer.printDirect({
        data: jpeg,
        type: 'JPEG',
        success: (id) => {
          resolve({success: true, jobId: id})
        },
        error: (err) => {
          console.log(err)
          resolve({ success: false, jobId: null })
        }
      })
    })

    return p
  }
}

const printService = new PrintService()

export { printService }