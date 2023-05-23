import { useEffect, useRef, useState } from "react";
import { myIcons } from "../assets";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  Checkbox,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  EditIconSVGAsReactComp,
  LogicIconSVGAsReactComp,
  OptionsIconSVGAsReactComp,
} from "./SVGsAsReactComp";

export const QuestionComp = ({
  optionTypeProp,
  compID,
  handleDeleteComp,
  top,
  left,
  position,
}) => {
  const [optionType, changeOptionType] = useState(optionTypeProp || "radio");
  const [topState, changeTopState] = useState(top);
  const [leftState, changeLeftState] = useState(left);
  let [positionState, changePositionState] = useState(position);
  console.log({topState,leftState})
  return (
    <>
      <div
        draggable={true}
        onDragStart={(e) => {
          console.log(e);
          changePositionState("absolute");
        }} onClick={e=>{

        }}
        onDragEnd={e=>{
         let left= e.clientX;
         let top= e.clientY;
         changeTopState(top)
         changeLeftState(left)
        }}
        className={`border mb-3 rounded-sm w-full ${positionState} flex flex-col sm:w-[600px] min-h-[300px] pb-2 bg-[#F9FAFB]`}
      style={{top:topState,left:leftState}}
      >
        <IconMenu compID={compID} handleDeleteComp={handleDeleteComp} />
        <QuestionDiv
          optionTypeProp={optionTypeProp}
          changeOptionTypeProp={changeOptionType}
        />
        <AnswersDiv optionType={optionType} />
      </div>
    </>
  );
};

const IconMenu = ({ compID, handleDeleteComp }) => {
  const [activeBtn, changeActiveBtn] = useState("edit");
  return (
    <>
      <div className="flex justify-between w-full p-2">
        <div className="flex flex-row">
          <MenuIconBtn
            btnId={"edit"}
            title={"Edit"}
            changeActiveBtn={changeActiveBtn}
            activeBtn={activeBtn}
            IconComp={EditIconSVGAsReactComp}
          />
          <MenuIconBtn
            btnId={"options"}
            title={"Options"}
            changeActiveBtn={changeActiveBtn}
            activeBtn={activeBtn}
            IconComp={OptionsIconSVGAsReactComp}
          />
          <MenuIconBtn
            btnId={"logic"}
            title={"Logic"}
            changeActiveBtn={changeActiveBtn}
            activeBtn={activeBtn}
            IconComp={LogicIconSVGAsReactComp}
          />
        </div>
        <span>
          <span
            onClick={(e) => {
              handleDeleteComp(compID);
            }}
          >
            <img src={myIcons.trash} />
          </span>
        </span>
      </div>
    </>
  );
};

const MenuIconBtn = ({
  activeBtn,
  btnId,
  changeActiveBtn,
  IconComp,
  title,
}) => {
  return (
    <>
      <span
        onClick={(e) => {
          changeActiveBtn((prev) => btnId);
        }}
        className={` ${
          activeBtn === btnId ? "bg-[#228BE6] text-[#FFFFFF]" : "text-[#000000]"
        }  rounded-sm px-2 py-1 flex justify-between ml-2 items-center`}
      >
        {<IconComp color={activeBtn === btnId ? "white" : "black"} />}
        <span>{title}</span>{" "}
      </span>
    </>
  );
};

const QuestionDiv = ({ optionTypeProp, changeOptionTypeProp }) => {
  let [optionType, changeOptionType] = useState(optionTypeProp || "");
  useEffect(() => {
    changeOptionTypeProp(optionType);
  }, [optionType]);
  return (
    <>
      <div className="flex justify-between w-full p-2 mt-2">
        <div className=" focus:border-[#228BE6] border bg-white rounded-md px-2 py-1 w-[60%] flex justify-between items-center">
          <span className="text-[#CED4DA] inline-block">?</span>
          <input
            placeholder="Enter your question"
            className=" inline-block w-[90%]"
          />
        </div>
        <div className="w-[35%]">
          <Select
            value={optionType}
            onChange={(e) => {
              changeOptionType(e.target.value);
            }}
            renderValue={(value) => (
              <span className=" capitalize">
                <span className="bg-[#CCFBF1]">
                  {optionType === "radio" ? (
                    <RadioButtonCheckedIcon sx={{ color: "#0F766E" }} />
                  ) : (
                    <CheckBoxIcon />
                  )}
                </span>{" "}
                {value}
              </span>
            )}
            size="small"
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              color: "#091E42",
            }}
          >
            <MenuItem value="radio">
              <ListItemIcon sx={{ display: "flex", alignItems: "baseline" }}>
                <RadioButtonCheckedIcon />
              </ListItemIcon>
              <ListItemText primary="Radio" />
            </MenuItem>
            <MenuItem value="checkbox">
              <ListItemIcon>
                <CheckBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Checkbox" />
            </MenuItem>
          </Select>
        </div>
      </div>
    </>
  );
};

const AnswersDiv = ({ optionType }) => {
  const [correctOptionID, changeCorrectOptionID] = useState(1);
  const [optionList, changeOptionList] = useState([0]);
  let addOption = () => {
    let optionId = optionList.length;
    optionList.push(optionId);
    changeOptionList([...JSON.parse(JSON.stringify(optionList))]);
  };
  let removeOption = (optionId) => {
    optionList.splice(optionId, 1);
    changeOptionList([...JSON.parse(JSON.stringify(optionList))]);
  };
  if (optionType === "radio") {
    return (
      <div className="flex flex-col w-full p-2 mt-2">
        <RadioGroup>
          {optionList.map((optionId, index) => (
            <OptionDiv
              optionId={optionId}
              correctOptionID={correctOptionID}
              changeCorrectOptionID={changeCorrectOptionID}
              addOption={addOption}
              key={optionId}
              removeOption={removeOption}
              optionType={"radio"}
            />
          ))}
        </RadioGroup>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full p-2 mt-2">
      {optionList.map((optionId, index) => (
        <OptionDiv
          optionId={optionId}
          correctOptionID={correctOptionID}
          changeCorrectOptionID={changeCorrectOptionID}
          addOption={addOption}
          key={optionId}
          removeOption={removeOption}
          optionType={optionType}
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
  optionType,
}) => {
  let btn = null;
  if (optionType === "radio") {
    btn = (
      <Radio
        value={optionId}
        onChange={(e) => {
          changeCorrectOptionID(optionId);
        }}
        sx={{ zIndex: 0 }}
      />
    );
  }
  if (optionType === "checkbox") {
    btn = (
      <Checkbox
        onClick={(e) => {
          changeCorrectOptionID(0);
        }}
      />
    );
  }
  return (
    <>
      <div className="flex justify-between p-2 w-full items-baseline">
        <span>
          <img src={myIcons.grid_vertical} />
        </span>
        {btn}
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
      <input
        className=" inline-block rounded-md w-[80%] py-1 pl-2 border"
        placeholder="Enter answer choice"
      />
    </>
  );
};
