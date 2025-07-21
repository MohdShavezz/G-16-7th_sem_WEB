import EventEmitter from "events";

const myEmitter = new EventEmitter()

// let data={username:'adsfs',age:21}
// myEmitter.on('greet',(data)=>{
//     console.log('greet event triggered!',data)
// })
// myEmitter.emit('greet',data) // invoking event


myEmitter.on('first',()=>{   //once for one time emit
    console.log('first event invoke!')
    myEmitter.emit('second')
})
myEmitter.on('second',()=>{
    console.log('second event invoke!')
    myEmitter.emit('third')
})
myEmitter.on('third',()=>{
    console.log('third event invoke!')
})
myEmitter.emit('first')
// myEmitter.emit('first')


myEmitter.on('error',(err)=>{
    console.log('Error: ',err)
})
myEmitter.emit('error',new Error('Something wrong.'))
