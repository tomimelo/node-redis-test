import Server from './api/server'

(async () => {
  try {
    const port = process.env.PORT || 3000

    console.log('Starting server...')

    const server = new Server(port)
    server.start()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
