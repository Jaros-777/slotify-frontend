import './Home.css'
import { Navbar } from '../../components/Navbar/Navbar'
import { Hero } from './components/Hero'
import {Features} from "./components/Features"
import { Footer } from '../../components/Footer/Footer'

function Home() {

  return (
    <>
    <Navbar/>
    <Hero/>
    <Features/>
    <Footer/>
    </>
  )
}

export default Home
