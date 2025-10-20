import React, { useEffect } from 'react'
import useChatStore from '../store/useChatStore'

const ChatContainer = () => {

 const {selectedUser}= useChatStore()

 


 return (
  <div>{selectedUser.fullname}</div>
  )
}

export default ChatContainer