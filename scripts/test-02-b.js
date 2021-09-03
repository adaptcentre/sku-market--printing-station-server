import receiptline from 'receiptline'
import net from 'net'
import fs from 'fs'
import serialport from 'serialport'

const host = '127.0.0.1'
const port = 19100
const device = 'COM9'

/* 
to get name of device open terminal an type:
ls /dev/tty.usb* o rls /dec/tty.*
*/

const options = {
  cpl: 48,
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

  await createPrintServer()

  const text = await getText()

  const response = await print(text)

  console.log(`Status ${response.status}`)
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

  let p = new Promise((resolve) => {
    serial.listen(port, () => {
      console.log(`Serial-LAN converter running at ${host}:${port}`)
      resolve()
    });
  })

  return p
}

function print(text) {

  const p = new Promise((resolve, reject) => {
    let drain = false

    const sock = net.connect(port, host)

    sock.on('connect', () => {
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
  return fs.readFileSync('./scripts/test.txt', 'utf8')
}
