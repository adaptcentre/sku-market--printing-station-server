import receiptline from 'receiptline'
import net from 'net'
import convert from 'convert-svg-to-png'
import fs from 'fs'

const host = '127.0.0.1'
const port = 19100
const options = {
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

console.log('Starting 🚀🚀🚀')

start().then(() => {
  process.exit(0)
})

async function start() {
  const svg = await getSvg()
  
  const response = await print(svg)

  console.log(`Status ${response.status}`)
}

function print(svg) {

  const p = new Promise((resolve, reject) => {
    let drain = false

    const sock = net.connect(port, host)

    sock.on('connect', () => {
      convert(svg).then(png => {
        const image = `|{i:${png.toString('base64')}}`

        drain = sock.write(receiptline.transform(image, options), 'binary')
      })
    })

    sock.on('data', data => {
      if (drain) {
        sock.end()
        resolve({ status: 'success' })
      }
    })

    sock.on('drain', () => {
      drain = true
    })

    sock.on('timeout', () => {
      sock.end()
      resolve({ status: 'timeout' })
    })

    sock.on('error', (err) => {
      console.log(err)
      resolve({ status: 'error' })
    })
  })

  return p
}

function getSvg() {
  return fs.readFileSync('./scripts/test-01.svg', 'utf8')
}
