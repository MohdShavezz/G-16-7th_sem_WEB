import { useContext } from "react";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext()

export const UserProvider = ({children})=>{
    const [userData,setUserData]=useState([])
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setUserData(data)
        })
    },[])

    const addUser=(newUser)=>{
        const newUserWithId = {...newUser,id:Date.now()}
        setUserData(pre=>[...pre,newUserWithId])
    }
    const updateUser=(id,updatedFields)=>{
       setUserData(pre=>pre.map(user=>user.id===id?{...user,...updatedFields}:user))
    }
    const deleteUser=(id)=>{
       setUserData(pre=>pre.filter(usr=>usr.id!==id))
    }

    return(
        <UserContext.Provider value={{userData,addUser,updateUser,deleteUser}}>
                {children}
        </UserContext.Provider>
    )

}

export const useUser = ()=>useContext(UserContext);