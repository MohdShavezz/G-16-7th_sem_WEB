import crypto from 'crypto'

//create hash
let secureData="password123"
let hash=crypto.createHash('sha256')
hash.update(secureData)
console.log(hash.digest('hex'))
//random bites
crypto.randomBytes(16, (err, buf) => {
    if (err) throw new Error()
    console.log(buf.toString('hex'))
})


const algorithm = 'aes-256-cbc'; // Example algorithm
const secretKey = crypto.randomBytes(32); // 32 bytes for AES-256
const iv = crypto.randomBytes(16); // 16 bytes for AES-256-CBC


//encryption of data
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm,secretKey,iv);
    let encrypted =cipher.update(text,'utf8','hex')
    encrypted=cipher.final('hex')
    return {
        iv:iv.toString('hex'),
        content:encrypted
    }
}
//decryption of encrypted data
function deccrypt(encrypted) {
  let decipher = crypto.createDecipheriv(algorithm,secretKey,iv);
  let deccrypted = decipher.update(encrypted.content,'hex','utf8')
  deccrypted=decipher.final('utf8')
  return deccrypted
}

let encryptedData=encrypt('password')
console.log(encryptedData)
console.log(deccrypt(encryptedData))