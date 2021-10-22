//import printer from  'printer'
import printer from '@thiagoelg/node-printer'
import fs from 'fs'
import svg2img from 'svg2img'

console.log('Starting 🚀🚀🚀')

start().then(() => {
  process.exit(0)
})

async function start() {

	const name = printer.getDefaultPrinterName()

	if(!name) {
		throw 'No Default printer'
	} else {
		console.log('Default printer --> ', name)
	}

	const svg = await getSvg()
	
	await print(svg)
}

function getSvg() {
  return fs.readFileSync('./scripts/test.svg', 'utf8')
}

function print(svg) {
	let p = new Promise( (resolve) => {

		svg2img(svg, { format: 'jpg', 'quality': 75 }, (error, buffer) => {

			if (error) {
				console.log(error)
				resolve()
			} else {
				printer.printDirect({
					data: buffer,
					type: 'JPEG',
					success: (id) => {
						console.log(`Sent to printer with job id: ${id}`)
						resolve()
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