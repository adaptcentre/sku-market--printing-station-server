import receiptline from 'receiptline'
import net from 'net'
import convert from 'convert-svg-to-png'


class PrintService {
  constructor() {
    this.host = '127.0.0.1'
    this.port = 19100
    this.options = {
      cpl: 48, 
      encoding: 'cp858', 
      gradient: false,
      gamma: 1.0,
      threshold: 192,
      upsideDown: false,
      spacing: true,
      cutting: true, 
      command: 'stargraphic'
    }
  }

  print(svg) {

    const p = new Promise( (resolve, reject) => {
      let drain = false

      const sock = net.connect(this.port, this.host)

      sock.on('connect', () => {
        convert(svg).then(png => {
          const image = `|{i:${png.toString('base64')}}`

          drain = sock.write(receiptline.transform(image, this.options), 'binary')
        })
      })

      sock.on('data', data => {
        if (drain) { 
          sock.end()
          resolve({status: 'success'})
        }
      })

      sock.on('drain', () => {
        drain = true
      })

      sock.on('timeout', () => {
        sock.end()
        console.log('Timeout')
        resolve({ status: 'timeout' })
      })

      sock.on('error', () => {
        console.log('Error')
        resolve({ status: 'error' })
      })
    })
    
    return p
  }
}

const printService = new PrintService()

export { printService }