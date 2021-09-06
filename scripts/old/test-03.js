import PRINTER from  'printer'
import ThermalPrinter from 'node-thermal-printer'
import ConvertSvgToPng from 'convert-svg-to-png'
import fs from 'fs'


const Printer = ThermalPrinter.printer
const Types = ThermalPrinter.types
const Convert = ConvertSvgToPng.convert


const printer = new Printer({
	type: Types.STAR,
	interface: 'printer:Star_TSP143__STR_T_001_',
	driver: PRINTER
})

//printer:Star TSP143 (STR_T-001)


console.log('Starting 🚀🚀🚀')

start().then(() => {
  process.exit(0)
})

async function start() {

	//let svg = await getSvg()
	//let png = await Convert(svg)


	let isConnected = await printer.isPrinterConnected()

	console.log(`Printer is connected: isConnected`)

	if(!isConnected) {
		return false
	}


	let status = await printer.printImage('./scripts/test.png')

	console.log(status)
}



function getSvg() {
  return fs.readFileSync('./scripts/test.svg', 'utf8')
}