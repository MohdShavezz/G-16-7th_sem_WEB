import process from 'process'


console.log(process.env.PORT)
console.log(process.argv)
process.argv.push('newpath')
console.log(process.argv[2])
console.log(process.env)
console.log(process.pid)
console.log(process.title)
console.log(process.memoryUsage())
console.log(process.uptime())
process.on('exit',()=>{
    console.log('exiting..')
})
process.exit(0)
console.log('after exit')