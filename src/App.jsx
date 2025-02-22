import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'

import RoutesIndex from './routes'
import Navbar from './views/components/Navbar'
import Footer from './views/components/Footer'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="artboard overflow-auto phone-5 h-auto mx-auto bg-slate-600">
        <Navbar/>
        <RoutesIndex/>
        <Footer/>
      </div>
    </>
  )
}

export default App
