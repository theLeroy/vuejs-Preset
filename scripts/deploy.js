const shell = require('shelljs')

var startTime = Date.now()

const api = 'https://api.scapp-console.swisscom.com'
const org = 'GHR-SRT-NEX-C-1_Traffy'

var space, app
const env = process.argv[2]
switch (env) {
  case 'dev':
    space = 'Development'
    app = 'tfdash-Development'
    break
  case 'prod':
    space = 'Production'
    app = 'tfdash-Production'
    break
  default:
    console.error('ERROR: Undefined deployment environment (only dev and prod at the moment)')
    process.exit(1)
}

// Exit script if any command fails
shell.config.fatal = true

// Login to api
if (process.env.CF_USER && process.env.CF_PASS) {
  console.log(`Logging into cf api using user: ${process.env.CF_USER}`)
  shell.exec(`cf login -a https://api.scapp-console.swisscom.com -u ${process.env.CF_USER} -p ${process.env.CF_PASS} -o ${org} -s ${space}`)
}

// Set correct api endpoint
shell.exec(`cf api ${api}`)

// Change to correct space
shell.exec(`cf target -o ${org} -s ${space}`)

// Deploy (needs to be build first)
shell.exec(`cf push ${app} -f ./manifest-${space}.yml`)

// Evaluate time passed
let secondsPassed = Math.floor((Date.now() - startTime) / 1000)
shell.echo(`Deployment took ${secondsPassed} seconds.`)

shell.echo('Everything seems to be fine!')
