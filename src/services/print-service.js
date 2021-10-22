import printer from '@thiagoelg/node-printer'
import svg2img from 'svg2img'

class PrintService {

  scaleSvg() {
    //@todo!
  }
  
  async print(svg) {
    let p = new Promise((resolve) => {
      
      svg2img(svg, { format: 'jpg', 'quality': 75 }, (error, buffer) => {
        
        if (error) {
          console.log(error)
          resolve({ success: false, jobId: null })
        } else {
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
        }
      })
    })

    return p
  }
}

const printService = new PrintService()

export { printService }