import React, { useState } from 'react'
import { useUser } from '../context/UserContext'

const User = () => {

    const { userData,addUser,updateUser,deleteUser } = useUser()

    const [newUserName, setNewUserName] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')

    function handleUserAdd() {
        if (!newUserName.trim() || !newUserEmail.trim()) {
            alert('please enter both name and email.')
            return
        }
        console.log(newUserEmail, newUserName)
        addUser({name:newUserName,email:newUserEmail})
        setNewUserName('')
        setNewUserEmail('')
    }
    function handleUpdate(id,currentName,currentEmail){
        const newName=prompt('enter new name',currentName)
        const newEmail=prompt('enter new email',currentEmail)
        if(newName?.trim() && newEmail?.trim()){
            updateUser(id,{name:newName,email:newEmail})
        }else{
            alert('invalid data')
        }
    }
    return (
        <div>
            <section>
                <input type="text" placeholder='Name' value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                <input type="email" placeholder='Name' value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} />
                <button onClick={handleUserAdd}>Add User</button>
            </section>
            <div>
                {userData.length===0?"Loading...":(
                    userData.map((user,ind)=>(
                      <div key={ind} style={{marginBottom:'10px'}}>
                        <strong>{user.name}</strong>
                        <strong>{user.email}</strong>
                        <button onClick={()=>handleUpdate(user.id,user.name,user.email)}>Update</button>
                        <button onClick={()=>deleteUser(user.id)}>Delete</button>
                      </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default User
