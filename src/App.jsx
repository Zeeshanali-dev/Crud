
import './App.css'
import Create from './components/Create'
import NAvbar from './components/NAvbar'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <>
      <h2>
        <NAvbar />
        <Outlet />
        
      </h2>
    </>
  )
}

export default App
