import { useState } from 'react'
import './App.css'
import { SideBar, Centerpiece, SideMenu } from './components'
import { nanoid } from "nanoid"
import { myIcons } from './assets';

function App() {
  let [questionComps, changeQuestionComps] = useState([]);
  let handleDeleteQuestionComp = (compID) => {
    let compIndex = questionComps.findIndex(comp => comp.compID === compID)
    console.log({compIndex})
    questionComps.splice(compIndex, 1)
    changeQuestionComps([...questionComps])
  }
  let handleAddQuestionComp = () => {
    let compID = nanoid()
    questionComps.push({ compID, comp: <Centerpiece optionTypeProp={"radio"} key={compID} compID={compID} handleDeleteComp={handleDeleteQuestionComp} /> })
    changeQuestionComps([...questionComps])
  }
  return (
    <>
      <div className='h-screen w-screen' onDragEnter={e => {
        console.log("dragged into")
      }}>
        <SideMenu />
        <div className={`w-full flex flex-col justify-center items-center h-full`}>
          {questionComps.map(comp => comp.comp)}
          <button onClick={e => {
            handleAddQuestionComp()
          }}><img src={myIcons.add_question} /></button>
        </div>
      </div>
    </>
  )
}

export default App
