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
  let handleAddQuestionComp = ({ optionType = "radio", ...rest }) => {
    let compID = nanoid();
    console.log({ rest });
    questionComps.push({
      compID,
      comp: (
        <QuestionComp
          optionTypeProp={optionType}
          {...rest}
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
        className=" h-full w-full p-2"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          let data = e.dataTransfer.getData("text/plain");
          console.log({ data });
          if (!data) {
            return;
          }
          let top = e.clientY;
          let left = e.clientX;
          console.log({ top, left });
          handleAddQuestionComp({ optionType: data, top, left });
          e.dataTransfer.clearData();
        }}
      >
        {/**/} <SideMenu addQuestionCompByType={handleAddQuestionComp} />
        <div
          className={`w-full flex flex-col justify-center items-center h-[90%]  overflow-y-auto`}
        >
          {questionComps.map((comp) => comp.comp)}
          <button
            onClick={(e) => {
              handleAddQuestionComp({ optionType: "radio" });
            }}
            className=" md:w-[300px] rounded-md w-full border py-2 flex flex-row justify-center"
          >
            <img src={myIcons.add_question} />{" "}
            <span className="">Add Question</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
