import React from 'react'

const LoadingUserSkeleton = () => {
  return (
 <div className='flex flex-col gap-2'>
      {[1,2,3,4].map((user,idx) => (
        <div key={idx} className='bg-cyan-500/10   rounded-lg animate-pulse '>
        <div className='flex items-center gap-4 p-3 '>
          <div className='avatar '>
            <div className='rounded-full overflow-hidden size-10'>
              <img src="/avatar.png" alt="profilePic" className='opacity-30' />
            </div>
          </div>
          <div className='w-full rounded-md h-4 bg-slate-500'></div>
         
        </div>
        </div>
      ))}

    </div>  )
}

export default LoadingUserSkeleton