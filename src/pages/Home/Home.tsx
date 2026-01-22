import './Home.css'
import { Hero } from './components/Hero'
import { Features } from "./components/Features"
import { useEffect, useState } from 'react'
import {X} from "lucide-react"
import { WhySlotify } from './components/WhySlotify'
import { Pricing } from './components/Pricing'

function Home() {

  // const [showInfo, setShowInfo] = useState<boolean>(false)
  
  
  // useEffect(() => {
  //         if (showInfo) {
  //             document.body.style.overflow = "hidden"
  //         } else {
  //             document.body.style.overflow = ""
  //         }
  
  //         return () => {
  //             document.body.style.overflow = ""
  //         }
  //     }, [showInfo])

  // useEffect(()=>{
  //   const url = window.location.href.split("/")[2].slice(0,9)
  //   if(url ==="localhost")
  //     setShowInfo(false)
  // },[])

  return (
    <>
      <main>
        {/* {showInfo ?
          <div className='fixed inset-0 top-0 left-0 bg-gray-300/70 flex justify-center items-center'>
            <div className='w-[calc(100%-3rem)] max-w-150 bg-white border-2 border-gray-300 rounded-2xl p-4 flex flex-col items-center text-center'>
              <X className='ml-auto cursor-pointer  hover:bg-gray-300' onClick={()=>setShowInfo(false)}></X>
              <h1 className='text-2xl  font-bold'>⚠️ Important notice</h1>
              <p className='mt-8'>This platform is running on a free hosting plan.
                Because of this, the <span className='font-medium'>first registration or login after a longer period of inactivity may take up to 5 minutes.</span></p>
              <p className='mt-2'>Yes — this is a real 5 minutes, not a typo 🙂</p>
              <p className='mt-8'>The delay is caused by the server waking up from sleep on the free Render plan.
                Once the server is active, everything works normally</p>
              <p className='mt-8 font-medium'>Thank you for your patience.</p>
            </div>
          </div>
          : null
        } */}
         <Hero />
        <Features />
        <WhySlotify/>
        <Pricing/>
      </main>

    </>
  )
}

export default Home
