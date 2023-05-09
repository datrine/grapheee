import { useState } from "react";
import { myIcons } from "../assets";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
export const SideBar = () => {
  const [openMenu, toggleMenuBar] = useState(false);
  const [openSubMenubar, toggleSubmenuBar] = useState(false);
  const [submenuTitle, changeSubMenuTitle] = useState("");
  const [submenuList, changeSubMenuList] = useState([]);
let getSubMenuList=(id)=>{
  let submenuList= subMenuSuperList[id]|| []
  changeSubMenuTitle(id)
  changeSubMenuList(submenuList)
}
  return (
    <>
      <div className=" bg-[#F8F9FA] top-0 left-0 absolute p-2 flex flex-row">
        {openMenu?<BsChevronLeft onClick={e=>{
          toggleMenuBar(false)
        }}/>:<BsChevronRight onClick={e=>{
          toggleMenuBar(true)
        }} />}
      {openMenu?<div className=" flex flex-col">
        <CollapsibleMenu
          title={"Personal Settings"}
          icon={myIcons.personal_settings}
        >
          <MenuItem title={"Profile"} setSubMenu={getSubMenuList} submenuID={"profile"} />
          <MenuItem title={"Notification"} setSubMenu={getSubMenuList} submenuID={"profile"} />
          <MenuItem title={"Credentials"} setSubMenu={getSubMenuList} submenuID={"profile"} />
        </CollapsibleMenu>
        <CollapsibleMenu
          title={"Product Settings"}
          icon={myIcons.personal_settings}
        >
          <MenuItem title={"Attributes"} />
          <MenuItem title={"Group Mentions"} />
          <MenuItem title={"Task forms"} />
          <MenuItem title={"Integrations"} />
        </CollapsibleMenu>
        </div>:null}  
        <SubMenuBar title={submenuTitle} isSubMenuOpen={openSubMenubar} submenulist={submenuList} toggle={toggleSubmenuBar}/>
      </div>
    </>
  );
};

const CollapsibleMenu = ({ children, ...props }) => {
  const [openCollapsible, toggle] = useState(false);
  return (
    <div className=" md:w-[299px] flex flex-col items-center">
      <CollapsibleMenuHeader
        {...props}
        toggle={toggle}
        isCollapsedProps={openCollapsible}
      />
      <div className="flex flex-col items-start px-2 w-1/2">
        {openCollapsible ? children : null}
      </div>
    </div>
  );
};

const CollapsibleMenuHeader = ({ toggle, isCollapsedProps, icon, title }) => {
  return (
    <div className="flex justify-between px-2 py-1 w-full">
      <img src={icon} />
      <span>{title}</span>
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
      <div className="mt-5" onMouseEnter={(e) => {
        setSubMenu(submenuID)
      }} onMouseLeave={e=>{
        setSubMenu("")
      }}>{title}</div>
      <SubMenuBar toggle={toggle} submenulist={submenulist}/>
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
      <span>
        {title}
      </span>
     </div>
    </>
  );
};



let subMenuSuperList={
  "profile":[{icon:myIcons.radio,title:"Radio"}]
}