import './App.css'
import { SideBar,Centerpiece } from './components'

function App() {

  return (
    <>
    <div>
      <SideBar/>
      <div className='w-full flex flex-col justify-center h-full'>
        <Centerpiece/>
      </div>
    </div>
    </>
  )
}

export default App
