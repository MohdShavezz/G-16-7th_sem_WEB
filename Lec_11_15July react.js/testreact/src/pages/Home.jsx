import React, { useState } from 'react'
import HomeChild from '../components/HomeChild'

const Home = () => {

  const [count,setCount]=useState(0)
  function incCount(){
    setCount(p=>p+1)
  }

  return (
    <>    
    <div>
      Home 
    </div>
    <p>Hi there this is Home componet</p>
    <p>Count: {count}</p>
    <button onClick={incCount}>click</button>
    {/* child  */}
    <HomeChild count={count} incCount={incCount}/>
    </>
  )
}

export default Home
