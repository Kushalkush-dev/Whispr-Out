
import { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import useChatStore from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import MessageLoadingSkeleton from './MessageLoadingSkeleton'
import NoChatHistory from './NoChatHistory'
import ChatInput from './ChatInput'

const ChatContainer = () => {

  const { loggedinUser } = useAuthStore()
  const { selectedUser, getMessageByUser, Messages, MessagesLoading,getSocketMessages, disconnectSocketMessage} = useChatStore()
  const MessageEnd=useRef(null)

  useEffect(() => {

    getMessageByUser(selectedUser._id)

    getSocketMessages()

    return () => disconnectSocketMessage();

  }, [selectedUser,getMessageByUser,getSocketMessages,disconnectSocketMessage])


  

  useEffect(()=>{

    if(MessageEnd.current){
      MessageEnd.current.scrollIntoView({
        behaviour:"smooth"
      });
    }


  },[Messages])


  return (

    <>
    
      <ChatHeader />


      <div className='overflow-y-auto h-full p-4 py-8 px-6'>
        {Messages.length > 0 && !MessagesLoading ? (

          <div className='max-w-3xl mx-auto space-y-6'>




            {Messages.map((msg,idx) => (
              <div key={idx} className={` chat ${msg.senderId === loggedinUser._id ? "chat-end" : "chat-start"}`}>

                <div className='chat-image avatar'>
                  <div className='w-10 rounded-full'>
                    <img src={msg.senderId === loggedinUser._id ? loggedinUser.profilepic : selectedUser.profilepic || "/avatar.png"} alt="/avatar.png" />
                  </div>
                </div>

                <div className={`chat-bubble ${msg.senderId === loggedinUser._id ? msg.image ?"bg-slate-700  text-white font-medium": "bg-emerald-400 text-slate-900 font-medium" : "bg-slate-500 text-white"} `}>

                  {msg.image && (
                    <img src={msg.image} alt="image" className='rounded-lg object-cover' />
                  )}

                  {msg.text && (<p>{msg.text}</p>)}

                  <p className={`text-xs  font-medium mt-1 ${msg.image ? "text-slate-300" :" text-slate-800/70"} `}>{new Date(msg.createdAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</p>

                </div>
              </div>

            ))}


          </div>


        ) : MessagesLoading ? <MessageLoadingSkeleton /> : <NoChatHistory name={selectedUser.fullname} />
        }
      <div ref={MessageEnd}></div>



      </div>

      <ChatInput/>




    </>

  )





}

export default ChatContainer