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
  let handleAddQuestionComp = ({ optionType = "radio" }) => {
    let compID = nanoid();
    questionComps.push({
      compID,
      comp: (
        <QuestionComp
          optionTypeProp={optionType}
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
        className="h-screen w-screen"
        onDragEnd={(e) => {
          let data = e.dataTransfer.getData("text");
          handleAddQuestionComp({ optionType: data });
        }}
      >
        <SideMenu addQuestionCompByType={handleAddQuestionComp} />
        <div
          className={`w-full flex flex-col justify-center items-center h-full`}
        >
          {questionComps.map((comp) => comp.comp)}
          <button
            onClick={(e) => {
              handleAddQuestionComp();
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
