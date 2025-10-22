import React from 'react';

const MessageLoadingSkeleton = () => {
  return (
<div className="max-w-3xl mx-auto space-y-6">

    {[1,2,3,4,5,6].map((ele,idx)=>(

      <div key={idx} className={`chat ${ele%2!==0 ? "chat-start":"chat-end"} animate-pulse `}>
        <div className="chat-bubble bg-slate-500/20 text-white w-20 md:w-40 "></div>
      </div>

    ))}

</div>

  );
};

export default MessageLoadingSkeleton;
