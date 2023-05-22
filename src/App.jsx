import { useState } from 'react'
import './App.css'
import { SideBar, Centerpiece, SideMenu } from './components'
import { nanoid } from "nanoid"
import { myIcons } from './assets';

function App() {
  let [questionComps, changeQuestionComps] = useState([]);
  let handleDeleteQuestionComp = (compID) => {
    questionComps.splice(compID, 1)
    changeQuestionComps([...questionComps])
  }
  let handleAddQuestionComp = () => {
    let compID = nanoid()
    questionComps.push(<Centerpiece compID={compID} handleDeleteComp={handleDeleteQuestionComp} />)
    changeQuestionComps([...questionComps])
  }
  return (
    <>
      <div className='h-screen w-screen' onDragEnter={e => {
        console.log("dragged into")
      }}>
        <SideMenu />
        <div className={`w-full flex flex-col justify-center h-full`}>
          {questionComps.map(comp => comp)}
        <button onClick={e=>{
          handleAddQuestionComp()
        }}><img src={myIcons.add_question}/></button>
        </div>
      </div>
    </>
  )
}

export default App
