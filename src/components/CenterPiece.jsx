import { useEffect, useRef, useState } from "react";
import { myIcons } from "../assets";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export const Centerpiece = ({ optionTypeProp }) => {
  const [optionType, changeOptionType] = useState(optionTypeProp || "radio");
  return (
    <>
      <div className="border rounded-sm w-full flex flex-col sm:w-[600px] h-[300px] bg-[#F9FAFB]">
        <IconMenu />
        <QuestionDiv optionTypeProp={optionTypeProp} />
        <AnswersDiv optionType={optionType} />
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

const QuestionDiv = ({ optionTypeProp }) => {
  const [optionType, changeOptionType] = useState(optionTypeProp || "radio");
  return (
    <>
      <div className="flex justify-between w-full p-2 mt-2">
        <div className=" focus:border-[#228BE6] bg-white rounded-md px-2 py-1 w-[60%] flex justify-between">
          <span className="text-[#CED4DA] inline-block">?</span>
          <input className=" inline-block w-[90%]" />
        </div>
        <div className="w-[40%]">
          <Select value={optionType} renderValue={(value) => <span> <RadioButtonCheckedIcon /> {value}</span>} size="small" sx={{ width: "90%", display: "flex", flexDirection: "row" }}>
            <MenuItem value="radio">
              <ListItemIcon sx={{ display: "flex", alignItems: "baseline" }}>
                <RadioButtonCheckedIcon />
              </ListItemIcon>
              <ListItemText primary="Radio" />
            </MenuItem>
            <MenuItem value="radio">
              <ListItemIcon>
                <CheckBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Radio" />
            </MenuItem>
          </Select>
        </div>
      </div>
    </>
  );
};

const DropdownBtn = ({ activeOptionType, changeActiveOptionType }) => {
  let [isOpen, toggle] = useState(false);
  let btnRef = useRef();
  let dropdownRef = useRef();

  useEffect(() => {
    if (dropdownRef.current) {
      let btnRect = btnRef.current.getBoundingClientRect();
      let dropdownRect = dropdownRef.current.getBoundingClientRect();
      dropdownRect = btnRect;
      dropdownRect.top = btnRect.top + 30;
    }
  }, [dropdownRef]);
  return (
    <>
      <span
        ref={btnRef}
        className="w-[100px] flex justify-between border-[#D1D5DB] bg-white py-1 px-2"
        onClick={(e) => {
          toggle(!isOpen);
        }}
      >
        <span className=" capitalize">{activeOptionType}</span>
        <span>{<BsChevronDown />}</span>
      </span>
      {isOpen ? (
        <span
          className="absolute flex flex-col p-2 bg-white rounded-md items-start"
          ref={dropdownRef}
        >
          <span
            className="mb-3"
            onChange={(e) => {
              changeActiveOptionType("radio");
            }}
          >
            Radio
          </span>
          <span
            onChange={(e) => {
              changeActiveOptionType("checkbox");
            }}
          >
            Checkbox
          </span>
        </span>
      ) : null}
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
  let optionGif
  return (
    <>
      <div className="flex justify-between p-2 w-full items-baseline">
        <span>
          <img src={myIcons.grid_vertical} />
        </span>
        <input type={optionType}
          onChange={(e) => {
            changeCorrectOptionID(0);
          }}
        />
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
