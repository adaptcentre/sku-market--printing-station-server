import receiptline from 'receiptline'
import net from 'net'
import fs from 'fs'

const host = '127.0.0.1'
const port = 19100
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
  const printer = net.createServer(conn => {
    conn.on('data', data => {
      console.log('Virtual printer received:');

      const hex = (data.toString('hex').replace(/../g, ' $&').replace(/.{24}/g, '$& ') + ' '.repeat(49)).match(/.{50}/g)
      const bin = (data.toString('binary').replace(/[^ -~]/g, '.') + ' '.repeat(15)).match(/.{16}/g)

      bin.forEach((b, i) => console.log(`${('0'.repeat(7) + (i << 4).toString(16)).slice(-8)} ${hex[i]} ${b}`))

      conn.write('\x00')
    })
  })

  let p = new Promise((resolve) => {
    printer.listen(port, () => {
      console.log(`Virtual printer running at ${host}:${port}`)
      resolve()
    })
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
