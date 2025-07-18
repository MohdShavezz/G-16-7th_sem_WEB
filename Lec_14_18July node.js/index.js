//1.MODULES
// import { sum ,multi} from "./utils/calculation"

// console.log(sum(1,2))
// console.log(multi(1,2))

//2.fs
// import fs from 'fs'; // var fs =require('fs')
// let data=fs.readFileSync('input.txt') //blocking
// console.log(data.toString())
// console.log('after read!')

// import fs from 'fs/promises';
// // fs.readFile('input.txt').then(data=>console.log(data.toString())).catch(err=>console.log(err))
// let readData=async()=>{
//     try {        
//         let data = await fs.readFile('input.txt','utf-8')
//         console.log(data.toString())
//     } catch (error) {
//         console.log(error)
//     }

// }
// let writeData=async()=>{
//     try {        
//         let data = await fs.writeFile('input.txt','write: This is new File!')
//     } catch (error) {
//         console.log(error)
//     }

// }
// let appendData=async()=>{
//     try {        
//         let data = await fs.appendFile('input.txt','\n appended data!')
//     } catch (error) {
//         console.log(error)
//     }

// }
// console.log('after read!')
// writeData()
// appendData()
// readData()


// import os from 'os'
// console.log(os.userInfo())
// console.log(os.totalmem())
// console.log(os.freemem())
// console.log(os.cpus())


// import path from 'path'
// import url from 'url'
// const filePath = '.dir/dir1/dir2/path.txt';
// console.log(path.basename(filePath))
// console.log(path.dirname(filePath))
// console.log(path.extname(filePath))
// console.log(path.parse(filePath))
// const __filename = url.fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// console.log(__filename)
// console.log(__dirname)
// console.log(path.resolve(__dirname,'abcd','abcd.html')) //join or resolve


import url from 'url'
console.log(import.meta.url)
console.log(url.fileURLToPath(import.meta.url))
const urlString = 'https://www.google.com/search?q=hello+world'
const ulrObj = new URL(urlString)
console.log(ulrObj)
console.log(url.format(ulrObj))
const params = new URLSearchParams(ulrObj.search)
params.append('name','user')
params.delete('name')
console.log(params)
