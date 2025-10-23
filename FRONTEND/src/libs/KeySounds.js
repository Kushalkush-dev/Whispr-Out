


const Sounds=[
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3")
]



const KeySounds =()=>{


 function keystrokesound(){

  const randomSound=Sounds[(Math.floor(Math.random()*Sounds.length))]
  randomSound.currentTime=0;
  randomSound.play().catch((error)=>console.log("Error playing Keystroke",error))
  }

  return {keystrokesound}

}

export default KeySounds