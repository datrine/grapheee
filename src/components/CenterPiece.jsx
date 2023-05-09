import { useState } from "react";
import { myIcons } from "../assets";
export const Centerpiece = () => {
  return (
    <>
      <div className="border rounded-sm w-full flex flex-col sm:w-[600px] h-[300px] bg-[#F9FAFB]">
        <IconMenu />
        <QuestionDiv />
        <AnswersDiv />
      </div>
    </>
  );
};

const IconMenu = () => {
  const [activeBtn, changeActiveBtn] = useState("edit");
  return (
    <>
      <div className="flex justify-between w-full p-2">
        <div>
          <MenuIconBtn
            btnId={"edit"}
            title={"Edit"}
            changeActiveBtn={changeActiveBtn}
            activeBtn={activeBtn}
            icon={myIcons.edit}
          />
        </div>
        <span>
          <span>
            <img src={myIcons.trash} />
          </span>
        </span>
      </div>
    </>
  );
};

const MenuIconBtn = ({ activeBtn, btnId, changeActiveBtn, icon, title }) => {
  return (
    <>
      {activeBtn === btnId ? (
        <span className="bg-[#228BE6] text-[#FFFFFF] rounded-sm px-2 py-1 flex justify-between">
          <img src={icon} />
          <span>{title}</span>{" "}
        </span>
      ) : (
        <span></span>
      )}
    </>
  );
};

const QuestionDiv = () => {
  const [activeBtn, changeActiveBtn] = useState("edit");
  return (
    <>
      <div className="flex justify-between w-full p-2 mt-2">
        <span className=" focus:border-[#228BE6] bg-white rounded-md px-2 py-1 w-[3/5] flex justify-between">
          <span className="text-[#CED4DA]">?</span>
          <input className=" inline-block w-[5/6]" />
        </span>
        <span className="w-[1/3] inline-block">
          <DropdownBtn />
        </span>
      </div>
    </>
  );
};

const DropdownBtn = ({ activeBtn, btnId, changeActiveBtn, icon, title }) => {
  return (
    <>
      {activeBtn === btnId ? (
        <span className="bg-[#228BE6] text-[#FFFFFF] rounded-sm px-2 py-1 flex justify-between">
          <img src={icon} />
          <span>{title}</span>{" "}
        </span>
      ) : (
        <span></span>
      )}
    </>
  );
};

const AnswersDiv = () => {
  const [correctOptionID, changeCorrectOptionID] = useState(1);
  const [optionList, changeOptionList] = useState([
    { text: "", type: "checkbox", optionId: 0 },
  ]);
  let addOption = () => {
    let optionId = optionList.length;
    optionList.push({ text: "", type: "checkbox", optionId });
    changeOptionList([...JSON.parse(JSON.stringify(optionList))]);
  };
  let removeOption = (optionId) => {
    optionList.splice(optionId,1);
    console.log(optionList)
    changeOptionList([...JSON.parse(JSON.stringify(optionList))]);
  };
  return (
    <div className="flex flex-col w-full p-2 mt-2">
      {optionList.map((optionObj, index) => (
        <OptionDiv
          optionId={optionObj.optionId}
          correctOptionID={correctOptionID}
          changeCorrectOptionID={changeCorrectOptionID}
          addOption={addOption}
          key={optionObj.optionId}
          removeOption={removeOption}
        />
      ))}
    </div>
  );
};

const OptionDiv = ({
  optionId,
  correctOptionID,
  changeCorrectOptionID,
  addOption,
  removeOption,
}) => {
  return (
    <>
      <div className="flex justify-between p-2 w-full items-baseline">
        <span>
          <img src={myIcons.grid_vertical} />
        </span>
        {optionId === correctOptionID ? (
          <span
            onClick={(e) => {
              changeCorrectOptionID(0);
            }}
          >
            <img src={myIcons.checkedbox} />
          </span>
        ) : (
          <span
            onClick={(e) => {
              changeCorrectOptionID(optionId);
            }}
          >
            <img src={myIcons.uncheckedbox} />
          </span>
        )}
        <OptionText />
        <span
          onClick={(e) => {
            removeOption(optionId);
          }}
        >
          <img src={myIcons.delete_option} />
        </span>
        <span
          onClick={(e) => {
            addOption();
          }}
        >
          <img src={myIcons.add_option} />
        </span>
      </div>
    </>
  );
};

const OptionText = ({ optionId, correctOptionID, changeCorrectOptionID }) => {
  return (
    <>
      <input className=" inline-block rounded-md w-[80%] py-1 pl-2" />
    </>
  );
};
