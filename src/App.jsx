import './App.css'
import { SideBar,Centerpiece, SideMenu } from './components'

function App() {

  return (
    <>
    <div className='h-screen w-screen' onDragEnter={e=>{
console.log("dragged into")
    }}>
      <SideMenu/>
      <div className={`w-full flex flex-col justify-center h-full`}>
        <Centerpiece/>
      </div>
    </div>
    </>
  )
}

export default App
