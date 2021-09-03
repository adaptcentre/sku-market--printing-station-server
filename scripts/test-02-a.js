import receiptline from 'receiptline'
import net from 'net'
import fs from 'fs'
import serialport from 'serialport'
import ConvertSvgToPng from 'convert-svg-to-png'

const convert = ConvertSvgToPng.convert

const host = '127.0.0.1'
const port = 19100
const device = 'COM10'

/* 
to get name of device open terminal an type:
ls /dev/tty.usb* o rls /dec/tty.*
*/

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

  const success = await createPrintServer()

  console.log(`Print server -> ${success}`)

  if(!success) {
    return
  }

  const svg = await getSvg()
  const png = await convert(svg)

  const response1 = await print(png)
  console.log(`Status ${response1.status}`)
}

function createPrintServer() {
  
  
  const serial = net.createServer(conn => {

    const port = new serialport(device, { autoOpen: false })

    port.on('error', err => {
      console.log('--- --- ---')
      console.log(err)
      conn.destroy()
    })

    port.on('open', () => {
      conn.pipe(port).pipe(conn)
      conn.on('end', () => port.unpipe(conn))
      conn.on('close', had_error => port.drain(err => port.close()))
    })

    port.open()
  })

  serial.maxConnections = 1;

  serial.on('listening', () => {
    console.log('-- listening')
  })

  serial.on('connection', () => {
    console.log('-- connection')
  })

  serial.on('close', () => {
    console.log('-- close')
  })

  serial.on('error', () => {
    console.log('-- error')
  })

  let p = new Promise((resolve) => {
    serial.listen(port, () => {
      console.log(`Serial-LAN converter running at ${host}:${port}`)
      resolve(true)
    });
  })

  return p
}

function print(png) {

  const p = new Promise((resolve, reject) => {
    let drain = false

    const sock = net.connect(port, host)

    sock.on('connect', () => {
      const image = `|{i:${png.toString('base64')}}`
      drain = sock.write(receiptline.transform(image, options), 'binary')
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
  return fs.readFileSync('./scripts/test.svg', 'utf8')
}

function timeout() {
  let p = new Promise( resolve => {
    setTimeout(() => {
      resolve()
    }, 2000 )
  })

  return p
}