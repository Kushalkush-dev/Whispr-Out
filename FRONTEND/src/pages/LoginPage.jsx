import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useState } from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer.jsx';
import { Loader2Icon, LockIcon, MailIcon, MessageCircleIcon } from 'lucide-react';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from 'react-router';

const LoginPage = () => {

  const {login,isloggingin}=useAuthStore()

  const [formData, setformData] = useState({
    email:"",
    password:""
  })

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await login(formData)

  }

  
return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
          <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back</h2>
                  <p className="text-slate-400">Login with your credentilas</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                 

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setformData({ ...formData, email: e.target.value })}
                        className="input"
                        placeholder="johndoe@gmail.com"
                        required
                        />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setformData({ ...formData, password: e.target.value })}
                        className="input"
                        required
                        placeholder="Enter your password"
                        />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn" type="submit" disabled={isloggingin}>
                    {isloggingin ? (
                      <Loader2Icon className="w-full h-5  animate-spin text-center" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Create a new account? SignUp
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                  />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Welcome Back Continue From Where You Left</h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
                  </BorderAnimatedContainer>  
      </div>
    </div>
  );
}

export default LoginPage