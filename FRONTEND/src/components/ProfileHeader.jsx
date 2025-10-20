import React, { useRef, useState } from 'react'

import { LogOut, Volume2, VolumeOff } from 'lucide-react'

import useChatStore from "../store/useChatStore"
import {useAuthStore} from "../store/useAuthStore"
import toast from 'react-hot-toast'
const ProfileHeader = () => {

const {isSoundEnabled,toggleSound}=useChatStore()
const {loggedinUser,updateProfile,logout}=useAuthStore()

const [selectedImage, setselectedImage] = useState(null)

const inputFileRef=useRef(null)



const mouseOnClickSound=new Audio("/sounds/MouseClickToggle.mp3")

const handleImageSubmit=(e)=>{

  const image=e.target.files[0];
  if(!image) return ;

 const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if(!allowedTypes.includes(image.type)){
    toast.error("Only image  files (JPG, PNG, WEBP) are allowed!")

    inputFileRef.current.value=''
    return;
  }

  

  if(image.size>5*1024*1024){
    alert("File Size Must Be Under 5MB");
    inputFileRef.current.value='';
    return;
  }

  const reader=new FileReader()

  reader.readAsDataURL(image);
  reader.onloadend=async()=>{
    const imageBase64= reader.result;

    setselectedImage(imageBase64);

    await updateProfile({profilepic:imageBase64});

    

  }


}




  return (
   
 <div className="p-6 border-b border-slate-800">

    <div className='flex justify-between gap-4'>

{/* Profile Image */}
<div className='flex gap-4'>

      <div className='avatar online'>
      <button className='rounded-full size-14 overflow-hidden relative group' onClick={()=>inputFileRef.current.click()}>

        <img src={selectedImage||loggedinUser.profilepic || "/avatar.png"} alt="avatar" className='size-full object-cover' />

        <div className='absolute bg-black/40 opacity-0 hover:opacity-100 inset-0 flex items-center justify-center'><span className='text-xs text-slate-400'>Change</span></div>

      </button>

      </div>

{/* Profile name */}
      <div className='flex flex-col justify-center'>
        <h2 className='text-slate-50 font-medium text-base truncate'>{loggedinUser.fullname}</h2>
        <p className='text-xs text-slate-400'>online</p>
      </div>
</div>

{/* logout and sound */}


    <div className='flex gap-4'>
      <button onClick={logout} className='hover:text-slate-100 transition-colors' > <LogOut size={20}/>  </button>

      <button onClick={()=>{

        mouseOnClickSound.currentTime=0;
        mouseOnClickSound.play().catch((error)=>console.log("Failed To Play Audio",error));
        mouseOnClickSound.volume=.3
        toggleSound()
        }} className='hover:text-slate-200  transition-colors'>  {isSoundEnabled ?<Volume2 size={20}/>:<VolumeOff size={20}/> }  </button>
    </div>




      <input type="file"
              accept='image/png,image/jpeg,image/webp,image/gif,image/svg+xml'
              className='hidden'
              ref={inputFileRef}
              onChange={handleImageSubmit} />

    </div>


  </div>

  )
}

export default ProfileHeader