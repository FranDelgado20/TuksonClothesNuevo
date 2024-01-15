import React from 'react'
import RoutesViews from './routes/RoutesViews'
import { BrowserRouter as Router } from 'react-router-dom'
import NavbarComp from './Components/NavbarComp'
import '/src/css/style.css'
import FooterComp from './Components/FooterComp'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <NavbarComp/>
      <main className='main-content'>
      <RoutesViews/>
      </main>
      
        <FooterComp/>
      </div>
    
    </Router>
  )
}

export default App