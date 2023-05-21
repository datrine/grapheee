import { useState } from "react";
import { myIcons } from "../assets";
import { BsArrowRightShort } from "react-icons/bs";
import { SideBar } from "./SideBar";
export const SideMenu = () => {
  const [openMenu, toggleMenuBar] = useState(false);
  return (
    <>
      <div className="top-0 left-0 absolute">
        {openMenu ? (
          <SideBar isMenuOpenProp={openMenu} toggleMenuProp={toggleMenuBar} />
        ) : (
          <span>
            <BsArrowRightShort
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
