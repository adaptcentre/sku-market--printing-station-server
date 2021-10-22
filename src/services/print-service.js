import printer from '@thiagoelg/node-printer'
import svgToImg from 'svg-to-img'
import fs from 'fs'

class PrintService {

  scaleSvg() {
    //@todo!
  }
  
  async print(svg) {
    let p = new Promise(async (resolve) => {

      let buffer = await svgToImg.from(svg).toJpeg()

      if(buffer) {
        printer.printDirect({
          data: buffer,
          type: 'JPEG',
          success: (id) => {
            resolve({ success: true, jobId: id })
          },
          error: (err) => {
            console.log(err)
            resolve({ success: false, jobId: null })
          }
        })
      } else {
        resolve({ success: false, jobId: null })
      }
    })

    return p
  }
}

const printService = new PrintService()

export { printService }