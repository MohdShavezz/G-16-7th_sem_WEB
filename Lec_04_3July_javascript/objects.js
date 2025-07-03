let obj ={
  firstname:"John", 
  lastname: "Doe",
  hobbies:["Cricket","Hockey","Football"],
  contact:{
    phone:{
      phoneNumber:"9989898989",
      countryCode:"+91"
    }
  },
  address:{
    pincode:129900,
    street:"street 41 new Block B."
  },
  // fullname(greet){
  //   console.log(`${greet}, ${this.firstname} ${this.lastname}`)
  // }
  
}

let obj2={
  firstname:"Harry",lastname:"Porter",
  // fullname(greet){
  //   console.log(`${greet}, ${this.firstname} ${this.lastname}`)
  // }
}

function fullname(greet){
    console.log(`${greet}, ${this.firstname} ${this.lastname}`)
  }

console.log(obj.firstname)
console.log(obj.hobbies)
console.log(obj.contact.phone.phoneNumber)
console.log(obj.address.pincode)
console.log(obj.age)

obj.fullname("Goodmorning")
fullname.call(obj2,"Goodmorning")
fullname.apply(obj,["Goodmorning"])
let res=fullname.bind(obj2,"Goodmorning")
res()


let obj ={
  firstname:"John", 
  lastname: "Doe",
  contact:{
    phone:{
      phoneNumber:"9989898989",
      countryCode:"+91"
    }
  }
}
// let obj2=obj 
// let obj2={...obj}
// shallow copy
let obj2=JSON.parse(JSON.stringify(obj))// deepcopy
// obj2.contact.phoneNumber="11111"
obj2.contact.phone.phoneNumber="1111"
console.log(obj)
console.log(obj2)



let a={
  name:"asdf",
  firstname:"John"
}

console.log(JSON.parse(JSON.stringify(a)))

let arr = [1,1,2,3,4,4,5]
// find accurance of array element
// {'1':2,'2':1,'3':1,'4':2,'5':1}
//Method 1
let obj={}
for(let ele of arr){
  // console.log(ele)
  if(obj.hasOwnProperty(ele)){
    obj[ele]+=1;
  }else{
    obj[ele]=1;
  }
}
console.log(obj)
//Method 2
let res = arr.reduce((acc,ele)=>{
  acc[ele]=(acc[ele]||0)+1
  return acc
},{})
console.log(res)













