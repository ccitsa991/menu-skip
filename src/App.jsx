
import './App.css'
import Home from './pages/home'
import { Routes, Route } from 'react-router';
function App() {

  return (
    <>
       <Routes>
         <Route path='/:merchantId' element={<Home />} />
       </Routes>
    </>
  )
}

export default App
