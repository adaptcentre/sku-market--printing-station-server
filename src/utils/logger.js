class Logger {
  info(msg) {
    console.log(msg)
  }

  error(msg) {
    console.log(msg)
  }
}

const logger = new Logger()

export { logger }