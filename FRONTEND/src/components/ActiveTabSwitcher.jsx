import React from 'react'
import useChatStore from '../store/useChatStore'

const ActiveTabSwitcher = () => {

  const {activeTab,toggleActiveTab}=useChatStore()

  return (
<div className=' tabs tabs-boxed bg-slate-800/50 p-2 m-2 transition-all'>
  <button onClick={()=>toggleActiveTab("chats")} className={`tab ${activeTab==="chats"&&"bg-emerald-400 text-slate-800  font-medium "} `}>Chats</button>
  <button onClick={()=>toggleActiveTab("contacts")} className={`tab ${activeTab==="contacts" && "bg-emerald-400 text-slate-800  font-medium"}`}>Contacts</button>
</div> 

    
 )

}

export default ActiveTabSwitcher  