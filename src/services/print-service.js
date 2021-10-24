//import ConvertSvgToJpeg from 'convert-svg-to-jpeg'
import printer from '@thiagoelg/node-printer'
// import sharp from 'sharp'
// import xmldom from '@xmldom/xmldom'
import fs from 'fs'
import svgToImg from 'svg-to-img'


//const convertToJpeg = ConvertSvgToJpeg.convert

class PrintService {

  scaleSvg() {
    //@todo!
  //https://github.com/etienne-martin/svg-to-img
  //https://github.com/etienne-martin/svg-to-img/search?q=browserDestructionTimeout
  async print(svg) {
   // const name = printer.getDefaultPrinterName()
    let p = new Promise(async (resolve) => {
      let jpeg = await svgToImg.from(svg).toJpeg()

      if(jpeg) {
        //fs.writeFileSync('asdsa.jpg', jpeg)

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
      } else {
        resolve({ success: false, jobId: null })
      }
      
      
      
      // let sssvg = new xmldom.DOMParser().parseFromString(svg, 'text/xml')

      // sssvg.documentElement.setAttribute('alignment-baseline', 'text-after-edge')
      // let sdasd = sssvg.documentElement.getElementsByTagName('text')

      // for (let i = 0; i < sdasd.length; i++){

      //   if(i < 2) {
      //     continue
      //   }

      //   let text = sdasd[i]

      //   let attr = text.getAttribute('transform')
        
      //   if (!attr.includes('translate')) {
      //     continue
      //   }
      //   // console.log(attr)
      //   let split = attr.split(',')
        
      //   let x = parseInt(split[0].replace(/^\D+/g, ''))
      //   let y = parseInt(split[1].replace(/^\D+/g, ''))

        
      //   if(x === 0) {
      //     g.setAttribute('transform', `translate(20,${y})`)
      //   }
      // }

      // let tettt = sssvg.createElement('rect')
      // tettt.setAttribute('width', '2000px')
      // tettt.setAttribute('height', '2000px')
      // tettt.setAttribute('style', 'fill:white;')


      // sssvg.documentElement.getElementsByTagName('g')[1].appendChild(tettt)
      
      //console.log(new xmldom.XMLSerializer().serializeToString(sssvg))

      // let img = await sharp(Buffer.from(
      //   new xmldom.XMLSerializer().serializeToString(sssvg)
      // ))
      // let b = fs.readFileSync('scripts/test.svg', 'utf8')
      // let bb = Buffer.from(b)

      // //img.jpeg()
      // sharp(bb)
      // .jpeg()
      // .toBuffer()
      // .then(buffer => {
      //   fs.writeFileSync('asdsa.jpg', buffer)
      //   resolve({ success: true, jobId: null })
      // })
      // .catch(err => {
      //   console.log(err)
      //   resolve({ success: false, jobId: null })
      // })
    })

    return p

    // const jpeg = await convertToJpeg(svg, { puppeteer: { timeout: 60000 } })
    
    //fs.writeFileSync('test.jpeg', jpeg)
    //fs.writeFileSync('test.jpeg', jpeg)

    // let p = new Promise( (resolve) => {
    //   printer.printDirect({
    //     data: jpeg,
    //     type: 'JPEG',
    //     success: (id) => {
    //       resolve({success: true, jobId: id})
    //     },
    //     error: (err) => {
    //       console.log(err)
    //       resolve({ success: false, jobId: null })
    //     }
    //   })
    // })

    // return p
  }
}

const printService = new PrintService()

export { printService }