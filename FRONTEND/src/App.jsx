import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const {checkLogin,loggedinUser,isloggin}=useAuthStore()

  useEffect(()=>{
    
    checkLogin()
  }, [checkLogin])

  
  if(isloggin) return <Loader size={50} className='animate-spin'/>;

  return (
     <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-[#00D7BF] opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-[#E8488A] opacity-20 blur-[100px]" />

    
    <Routes>
      <Route path='/' element={loggedinUser? <ChatPage/>:<Navigate to={"/signup"}/>}/>
      <Route path='/signup' element={!loggedinUser?<SignUpPage/>:<Navigate to={"/"}/>}/>
      <Route path='/login' element={!loggedinUser?<LoginPage/>: <Navigate to={"/"}/>}/>

      <Route path='*' element={<Navigate to={'/'}/>}/>
      
    </Routes>

    <Toaster/>
    
    </div>
  )
}

export default App