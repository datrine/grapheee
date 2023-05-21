import { useEffect, useRef, useState } from "react";
import { myIcons } from "../assets";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
export const SideBar = ({ isMenuOpenProp, toggleMenuProp }) => {
  const [openSubMenubar, toggleSubmenuBar] = useState(false);
  const [submenuTitle, changeSubMenuTitle] = useState("");
  const [submenuList, changeSubMenuList] = useState([]);
  let getSubMenuList = (id) => {
    let submenuList = subMenuSuperList[id] || [];
    changeSubMenuTitle(id);
    changeSubMenuList(submenuList);
  };
  return (
    <>
      <div className=" bg-[#F8F9FA]">
        <BsChevronLeft
          onClick={(e) => {
            toggleMenuProp(false);
          }}
          className="block"
        />
        <div className=" p-2 flex flex-row">
          <div className=" flex flex-col">
            <CollapsibleMenu
              title={"Personal Settings"}
              icon={myIcons.personal_settings}
            >
              <MenuItem
                title={"Profile"}
                setSubMenu={getSubMenuList}
                submenuID={"profile"}
              />
              <MenuItem
                title={"Notification"}
                setSubMenu={getSubMenuList}
                submenuID={"profile"}
              />
              <MenuItem
                title={"Credentials"}
                setSubMenu={getSubMenuList}
                submenuID={"profile"}
              />
            </CollapsibleMenu>
            <CollapsibleMenu
              title={"Product Settings"}
              icon={myIcons.product_settings}
            >
              <MenuItem title={"Attributes"} />
              <MenuItem title={"Group Mentions"} />
              <MenuItem title={"Task forms"} />
              <MenuItem title={"Integrations"} />
            </CollapsibleMenu>
            <CollapsibleMenu
              title={"Workspace Settings"}
              icon={myIcons.workspace_settings}
            >
              <MenuItem title={"Attributes"} />
              <MenuItem title={"Group Mentions"} />
              <MenuItem title={"Task forms"} />
              <MenuItem title={"Integrations"} />
            </CollapsibleMenu>
          </div>
          {openSubMenubar ? (
            <SubMenuBar
              title={submenuTitle}
              isSubMenuOpen={openSubMenubar}
              submenulist={submenuList}
              toggle={toggleSubmenuBar}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

const CollapsibleMenu = ({ children, menulist = [], ...props }) => {
  const [openCollapsible, toggle] = useState(false);
  const [leftMargin, changeLeftMargin] = useState(0);
  return (
    <div className=" md:w-[299px] flex flex-col items-center">
      <CollapsibleMenuHeader
        {...props}
        toggle={toggle}
        isCollapsedProps={openCollapsible}
        changeLeftMarginHook={changeLeftMargin}
      />
      {openCollapsible
        ? menulist.map((menuItem) => <MenuItem key={menuItem.title} />)
        : null}
    </div>
  );
};

const CollapsibleMenuHeader = ({ toggle, isCollapsedProps, icon, title }) => {
 let refTitle= useRef();
 useEffect(()=>{
  if (!refTitle) {
    return
  }
console.log(refTitle.current)
 },[refTitle])
  return (
    <div className="flex justify-between items-center px-2 py-1 w-full mb-5">
      <span className="p-2 rounded-full flex justify-center items-center bg-[#E7F5FF]">
        <img src={icon} />
      </span>
      <span ref={refTitle}>{title}</span>
      <span
        onClick={(e) => {
          toggle((state) => !state);
        }}
      >
        {isCollapsedProps ? <BsChevronDown /> : <BsChevronRight />}
      </span>
    </div>
  );
};

const MenuItem = ({ title, submenulist, setSubMenu, submenuID }) => {
  const [openSubMenuBar, toggle] = useState(false);
  return (
    <>
      <div
        className={`flex justify-between items-center px-2 py-1 w-full border-l`}
        onMouseEnter={(e) => {
          setSubMenu(submenuID);
        }}
        onMouseLeave={(e) => {
          setSubMenu("");
        }}
      >
        <span> {title}</span>
      </div>
    </>
  );
};

const SubMenuBar = ({ toggle, submenulist = [] }) => {
  return (
    <>
      <div className=" md:w-[299px]">
        {submenulist.map((subItem, index) => (
          <SubMenuItem key={index} title={subItem.title} />
        ))}
      </div>
    </>
  );
};

const SubMenuItem = ({ title, icon }) => {
  const [openSubMenuBar, toggle] = useState(false);
  return (
    <>
      <div className="border bg-white p-2">
        <img src={icon} />
        <span>{title}</span>
      </div>
    </>
  );
};

let subMenuSuperList = {
  profile: [{ icon: myIcons.radio, title: "Radio" }],
};
