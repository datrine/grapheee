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
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export const Centerpiece = ({ optionTypeProp,compID ,handleDeleteComp}) => {
  const [optionType, changeOptionType] = useState(optionTypeProp || "radio");
  return (
    <>
      <div className="border rounded-sm w-full flex flex-col sm:w-[600px] h-[300px] bg-[#F9FAFB]">
        <IconMenu compID={compID} handleDeleteComp={handleDeleteComp} />
        <QuestionDiv optionTypeProp={optionTypeProp} changeOptionTypeProp={changeOptionType} />
        <AnswersDiv optionType={optionType} />
      </div>
    </>
  );
};

const IconMenu = ({compID,handleDeleteComp}) => {
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
          <span onClick={e=>{
            handleDeleteComp(compID)
          }}>
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

const QuestionDiv = ({ optionTypeProp, changeOptionTypeProp }) => {
  let[optionType,changeOptionType]=useState(optionTypeProp||"")
  useEffect(()=>{
    changeOptionTypeProp(optionType)
  },[optionType])
  return (
    <>
      <div className="flex justify-between w-full p-2 mt-2">
        <div className=" focus:border-[#228BE6] bg-white rounded-md px-2 py-1 w-[60%] flex justify-between">
          <span className="text-[#CED4DA] inline-block">?</span>
          <input className=" inline-block w-[90%]" />
        </div>
        <div className="w-[40%]">
          <Select value={optionType} onChange={e => {
            console.log(e.target.value)
            changeOptionType(e.target.value)
          }} renderValue={(value) => <span className=" capitalize"> 
          <span className="bg-[#CCFBF1]">{optionTypeProp==="radio"?<RadioButtonCheckedIcon sx={{color:"#0F766E"}} />:<CheckBoxIcon/>}</span> {value}</span>} size="small" sx={{ width: "90%", display: "flex", flexDirection: "row" }}>
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
    console.log(optionList);
    changeOptionList([...JSON.parse(JSON.stringify(optionList))]);
  };
  if (optionType === "radio") {
    return <div className="flex flex-col w-full p-2 mt-2">
      <RadioGroup>{optionList.map((optionId, index) => (

        <OptionDiv
          optionId={optionId}
          correctOptionID={correctOptionID}
          changeCorrectOptionID={changeCorrectOptionID}
          addOption={addOption}
          key={optionId}
          removeOption={removeOption}
          optionType={"radio"}
        />
      ))}</RadioGroup>
    </div>
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
  removeOption, optionType
}) => {
  let btn = null
  if (optionType === "radio") {
    btn = <Radio onClick={(e) => {
      changeCorrectOptionID(0);
    }} />
  }
  if (optionType === "checkbox") {
    btn = <Checkbox onClick={(e) => {
      changeCorrectOptionID(0);
    }} />
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
      <input className=" inline-block rounded-md w-[80%] py-1 pl-2" />
    </>
  );
};
