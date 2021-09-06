import printer from  'printer'
import fs from 'fs'
import ConvertSvgToPng from 'convert-svg-to-png'

const convert = ConvertSvgToPng.convert

console.log('Starting 🚀🚀🚀')

start().then(() => {
  process.exit(0)
})

async function start() {
	const svg = await getSvg()
	const png = await convert(svg)

	await print(png)
}

function getSvg() {
  return fs.readFileSync('./scripts/test.svg', 'utf8')
}


function print(data) {
	let p = new Promise( (resolve) => {
		printer.printDirect({
			data: data,
			type: 'JPEG',
			success: (id) => {
				console.log(`sent to printer with jobid: ${id}`)
				resolve()
			},
			error: (err) => {
				console.log(err)
				resolve()
			}

		})
	})

	return p
}