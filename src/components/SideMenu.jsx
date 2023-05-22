import { useState } from "react";
import { myIcons } from "../assets";
import { BsArrowRight,  } from "react-icons/bs";
import { SideBar } from "./SideBar";
export const SideMenu = () => {
  const [openMenu, toggleMenuBar] = useState(false);
  return (
    <>
      <div className="top-0 left-0  fixed">
        {openMenu ? (
          <SideBar isMenuOpenProp={openMenu} toggleMenuProp={toggleMenuBar} />
        ) : (
          <span>
            <BsArrowRight className=" text-xl"
              onClick={(e) => {
                toggleMenuBar(true);
              }}
            />
          </span>
        )}
      </div>
    </>
  );
};
