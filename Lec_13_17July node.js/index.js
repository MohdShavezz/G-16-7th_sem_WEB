// (()=>{

// function fn1(){
//     process.nextTick(()=>console.log('Tick'))
    
//     setTimeout(() => {
//         console.log('Time')
//     }, 0);
//     console.log('fn1')
//     fn2()
// }
// function fn2(){
//     console.log('fn2')
//     fn3()
// }
// function fn3(){
//     console.log('fn3')
//     setImmediate(()=>console.log('Immediate'))
//     // console.trace()
// }

// fn1()

// })()


console.log('1. Start');
// Next tick queu
process.nextTick(() => console.log('2. Next tick'));
// Microtask queue (Promise
Promise.resolve().then(() => console.log('3. Promise'));
// Timer phase
setTimeout(() => console.log('4. Timeout'), 0);
// Check phase
setImmediate(() => console.log('5. Immediate'));

console.log('6. End');
