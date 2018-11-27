const { spawn } = require('child_process')

const server = spawn('yarn', ['start:graphql'], { stdio: 'inherit', shell: true })
const build = spawn('yarn', ['export:app'], { stdio: 'inherit', shell: true })

build.on('close', () => server.kill())
