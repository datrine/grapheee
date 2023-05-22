import { useState } from "react";
import { myIcons } from "../assets";
import { BsArrowRight } from "react-icons/bs";
import { SideBar } from "./SideBar";
export const SideMenu = ({ ...props }) => {
  const [openMenu, toggleMenuBar] = useState(false);
  return (
    <>
      <div className="top-0 left-0  fixed">
        {openMenu ? (
          <SideBar
            {...props}
            isMenuOpenProp={openMenu}
            toggleMenuProp={toggleMenuBar}
          />
        ) : (
          <div>
            <BsArrowRight
              className=" text-xl ml-2"
              onClick={(e) => {
                toggleMenuBar(true);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
