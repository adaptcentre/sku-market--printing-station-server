import receiptline from 'receiptline'
import net from 'net'
import fs from 'fs'

const host = '127.0.0.1'
const port = 19100
const options = {
  cpl: 48,
  asImage: false,
  encoding: 'cp858',
  gradient: false,
  gamma: 1.8,
  threshold: 128,
  upsideDown: false,
  spacing: true,
  cutting: true,
  command: 'starlinesbcs'
}


console.log('Starting 🚀🚀🚀')

start().then(() => {
  process.exit(0)
})

async function start() {
  const text = await getText()
  
  const response = await print(text)

  console.log(`Status ${response.status}`)
}

function print(text) {

  const p = new Promise((resolve, reject) => {
    let drain = false

    const sock = net.connect(port, host)

    sock.on('connect', () => {
      // convert(svg).then(png => {
      //   const image = `|{i:${png.toString('base64')}}`

      //   drain = sock.write(receiptline.transform(image, options), 'binary')
      // })

      const command = receiptline.transform(text, options);

      drain = sock.write(command, /^<svg/.test(command) ? 'utf8' : 'binary');
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

function getText() {
  return fs.readFileSync('./scripts/test-02.txt', 'utf8')
}
