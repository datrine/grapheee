import { useState } from "react";
import "./App.css";
import { SideBar, QuestionComp, SideMenu } from "./components";
import { nanoid } from "nanoid";
import { myIcons } from "./assets";

function App() {
  let [questionComps, changeQuestionComps] = useState([]);
  let handleDeleteQuestionComp = (compID) => {
    changeQuestionComps((prev) => {
      let questionComps = [...prev];
      let compIndex = questionComps.findIndex((comp) => comp.compID === compID);
      questionComps.splice(compIndex, 1);
      return questionComps;
    });
    //changeQuestionComps([...questionComps])
  };
  let handleAddQuestionComp = ({ optionType = "radio",...rest }) => {
    let compID = nanoid();
    questionComps.push({
      compID,
      comp: (
        <QuestionComp
          optionTypeProp={optionType} {...rest}
          key={compID}
          compID={compID}
          handleDeleteComp={handleDeleteQuestionComp}
        />
      ),
    });
    changeQuestionComps([...questionComps]);
  };
  return (
    <>
      <div
        className="h-screen w-screen" onDragOver={e=>{
          e.preventDefault()
        }}
        onDrop={(e) => {
          let data = e.dataTransfer.getData("text/plain");
          console.log({ data });
          if (!data) {
            return
          }
          let top=e.clientY
          let left=e.clientX
          handleAddQuestionComp({ optionType: data, top,left});
        }}
      >
        <SideMenu addQuestionCompByType={handleAddQuestionComp} />
        <div
          className={`w-full flex flex-col justify-center items-center h-full`}
        >
          {questionComps.map((comp) => comp.comp)}
          <button
            onClick={(e) => {
              handleAddQuestionComp({ optionType: "radio" });
            }}
          >
            <img src={myIcons.add_question} />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
