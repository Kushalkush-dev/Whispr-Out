import React from 'react'
import useChatStore from '../store/useChatStore'
import { MessageCircleIcon, SearchCodeIcon } from 'lucide-react'

const NoChatsFound = () => {

  const {toggleActiveTab}=useChatStore()
  return (
      <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center">
        <MessageCircleIcon className="w-8 h-8 text-teal-500 " />
      </div>
      <div>
        <h4 className="text-slate-200 font-medium mb-1">No conversations yet</h4>
        <p className="text-slate-400 text-sm px-6">
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>
      <button
        onClick={() => toggleActiveTab("contacts")}
        className="px-4 flex items-center gap-3 py-2 text-sm text-teal-400 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors"
      >
        Find contacts<SearchCodeIcon size={17}/> 
      </button>
    </div>
  )
}

export default NoChatsFound