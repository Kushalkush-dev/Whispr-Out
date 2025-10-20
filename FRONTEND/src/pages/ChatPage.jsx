import { LogOutIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import useChatStore from '../store/useChatStore'
import NoConversationContainer from '../components/NoConversationContainer'
import ChatContainer from '../components/ChatContainer'
import ContactsList from '../components/ContactsList'
import ChatsList from '../components/ChatsList'
import ProfileHeader from '../components/ProfileHeader'
import ActiveTabSwitcher from '../components/ActiveTabSwitcher'

const ChatPage = () => {

  const { activeTab, selectedUser } = useChatStore()




  return (
    <div className="relative w-full max-w-6xl h-[800px]">

      <BorderAnimatedContainer>



        {/*leftside*/}
        <div className='md:w-80 flex flex-col bg-slate-600/50 backdrop-blur-sm'>

          <ProfileHeader />
          <ActiveTabSwitcher />
          <div className='overflow-y-auto p-4 space-y-2 flex-1'>
            {activeTab === "chats" && <ChatsList />}

            {activeTab === "contacts" && <ContactsList />}
          </div>
 
        </div>

        {/*right side*/}

        <div className='flex-1 flex flex-col backdrop-blur-sm'>

          {selectedUser ? <ChatContainer /> : <NoConversationContainer />}
          
        </div>




      </BorderAnimatedContainer>


    </div>
  )
}

export default ChatPage