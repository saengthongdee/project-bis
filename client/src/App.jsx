import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Array from './components/array'
import Nav from './components/navbar'
import Footer from './components/footer'
import './index.css'
import Main from './components/main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <body>
     
        <Nav />
        <Main />
        <Footer />
        
      </body>
    </>
  )
}
export default App
