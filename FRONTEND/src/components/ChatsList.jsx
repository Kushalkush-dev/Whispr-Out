import React, { useEffect } from 'react'
import useChatStore from '../store/useChatStore'
import LoadingUserSkeleton from './LoadingUserSkeleton'
import NoChatsFound from './NoChatsFound'


const ChatsList = () => {
const {  getChatPartners, chatPartners,setSelectedUser,ischatPartnersLoading}= useChatStore()
  useEffect(()=>{
    getChatPartners()
  },[getChatPartners])
 
  if(ischatPartnersLoading) return <LoadingUserSkeleton/>

  if(chatPartners.length==0) return <NoChatsFound/>

  return (
 <div className='flex flex-col gap-2'>
      {chatPartners.map((user) => (
        <div key={user._id} onClick={()=>setSelectedUser(user)} className='bg-cyan-500/10 cursor-pointer transition-colors duration-300 active:scale-95 hover:bg-cyan-500/50  rounded-lg '>
        <div className='flex items-center gap-4 p-3 '>
          <div className='avatar '>
            <div className='rounded-full overflow-hidden size-10'>
              <img src={`${user.profilepic ? user.profilepic : "/avatar.png"}`} alt="profilePic" />
            </div>
          </div>
       <h2 className='font-medium text-md text-cyan-300  '>{user.fullname}</h2>
        </div>
        </div>
      ))}

    </div>
  )
}

export default ChatsList