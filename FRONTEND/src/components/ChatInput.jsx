import { FileImage, Send, XIcon } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useChatStore from '../store/useChatStore'
import KeySounds from '../libs/KeySounds.js'

const ChatInput = () => {

  const { sendMessage,isSoundEnabled } = useChatStore();
  const [text, settext] = useState("")
  const [previewImage, setpreviewImage] = useState('')

  const fileInput = useRef()
  const {keystrokesound}=KeySounds()




  const OnSend = (e) => {
    e.preventDefault()


    try {
      sendMessage({
        text: text.trim(),
        image: previewImage,
      })
      setpreviewImage(null)
      fileInput.current.value = ""
    } catch (error) {
      console.log("Error in Sending", error)
    } finally {
      settext('')
      setpreviewImage(null)
      fileInput.current.value = ""
    }






  }





  const handleFile = (e) => {

    const file = e.target.files[0];
    if (!file) {
      fileInput.current.value = ""
      return
    }

    const acceptedFiles = ["image/jpeg", "image/png", "image/webp"]

    if (!acceptedFiles.includes(file.type)) {
      toast.error("Only image  files (JPG, PNG, WEBP) are allowed!")
      fileInput.current.value = ""
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async () => {
      const UrlImage = reader.result;
      setpreviewImage(UrlImage)
    }
  }



  useEffect(()=>{
      isSoundEnabled && keystrokesound()
      
  },[text])

  return (
    <>


      <div className='border-t bottom-0 border-t-slate-500  p-3 w-full '>

        {previewImage && (
          <div className='max-w-3xl mx-auto mb-3 flex items-center'>
            <div className='relative' >
              <img src={previewImage} className='w-30 h-28 object-cover rounded-lg border border-slate-700' alt="previewimage" />

              <button onClick={() => {
                setpreviewImage(null)
                fileInput.current.value = ""
              }
              } className='absolute -top-3 -right-3 text-white  hover:text-red-700' ><XIcon size={28} /></button>
            </div>


          </div>



        )}

        <div className='w-full rounded-lg '>
          <form onSubmit={OnSend} className='p-2 flex items-center gap-4 ' >

            <input onChange={(e) => settext(e.target.value)}
              value={text}
              type="text"
              placeholder='Start the Chat . . .'
              className='w-10/12 h-9 flex bg-slate-500/30 rounded-lg px-2
         border-none outline-none focus:ring-2 focus:ring-teal-500/80 text-cyan-50' />

            <div className='flex items-center gap-7'>

              <div onClick={() => fileInput.current.click()} className='w-9 h-9 flex text-white/70 items-center rounded-lg justify-center bg-slate-500/30'>
                <FileImage />
              </div>
              <button className='w-9 disabled:bg-slate-500/30 h-9 flex items-center rounded-lg justify-center text-white bg-emerald-500/90 disabled:text-white/70' ><Send size={20} /></button>
            </div>

          </form>
        </div>

        <div>
          <input type="file"
            ref={fileInput}
            className='hidden'
            accept='image/*'
            onChange={handleFile} />
        </div>
      </div>

    </>

  )
}

export default ChatInput