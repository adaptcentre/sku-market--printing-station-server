import ConvertSvgToPng from 'convert-svg-to-png'
import ConvertSvgToJpeg from 'convert-svg-to-jpeg'
import printer from '@thiagoelg/node-printer'

const convertToPng = ConvertSvgToPng.convert
const convertToJpeg = ConvertSvgToJpeg.convert

class PrintService {

  scaleSvg() {
    //@todo!
  }
  
  async print(svg) {
   // const name = printer.getDefaultPrinterName()

    const jpeg = await convertToJpeg(svg)

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