import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useState } from 'react'

const LoginPage = () => {

  const { log , loggedin }=useAuthStore()

  
  return (
    <div className='z-30'>
      <button onClick={log} className='btn border-cyan-600'>Login</button>
      <h1 className='text-xl text-white'>{loggedin?"Hi":"Nope"}</h1>
    </div>
  )
}

export default LoginPage