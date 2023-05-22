import { useEffect, useRef, useState } from "react";
import { myIcons } from "../assets";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
export const SideBar = ({ isMenuOpenProp, toggleMenuProp }) => {
  const [openSubMenubar, toggleSubmenuBar] = useState(false);
  const [activeMenuID, changeActiveMenuID] = useState("");
  console.log({ activeMenuID })
  return (
    <>

      <div onMouseLeave={e => {

      }} className=" bg-[#F8F9FA] flex flex-row">
        <div>
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
                menulist={[{
                  title: "Profile",
                  menuID: "profile"
                }, {
                  title: "Notification",
                  menuID: "notification"
                }, {
                  title: "Credentials",
                  menuID: "credentials"
                }]}
                setActiveMenuID={changeActiveMenuID}
              >
              </CollapsibleMenu>
              <CollapsibleMenu
                title={"Product Settings"}
                icon={myIcons.product_settings}
                menulist={[{
                  title: "Attributes",
                  menuID: "attributes"
                }, {
                  title: "Group Mentions",
                  menuID: "group_mentions"
                }, {
                  title: "Task forms",
                  menuID: "task_forms"
                }, {
                  title: "Integrations",
                  menuID: "integrations"
                }]}
                setActiveMenuID={changeActiveMenuID}
              >
              </CollapsibleMenu>
              <CollapsibleMenu
                title={"Workspace Settings"}
                icon={myIcons.workspace_settings}
              >
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
        {activeMenuID ? < SubMenuBar activeMenuID={activeMenuID} /> : null} </div>
    </>
  );
};

const CollapsibleMenu = ({ children, setActiveMenuID, menulist = [], ...props }) => {
  const [openCollapsible, toggle] = useState(false);
  const [leftMargin, changeLeftMargin] = useState(0);
  const [titleLeftoffset, changeTitleLeftoffset] = useState(0);
  const [menuParentLeftoffset, changeMenuParentLeftoffset] = useState(0);
  return (
    <div className=" md:w-[299px] flex flex-col items-center mb-3">
      <CollapsibleMenuHeader
        {...props}
        toggle={toggle}
        isCollapsedProps={openCollapsible}
        setLeftMarginHook={changeLeftMargin}
        setTitleLeftoffsetHook={changeTitleLeftoffset}
      />
      <div className={` w-[calc(100%-25px)] ml-[25px] border-l `}>
        {openCollapsible
          ? menulist.map(menuItem => <MenuItem setActiveMenuID={setActiveMenuID} menuID={menuItem.menuID} leftMargin={leftMargin} titleLeftoffset={titleLeftoffset} title={menuItem.title} key={menuItem.title} />)
          : null}
      </div>

    </div>
  );
};

const CollapsibleMenuHeader = ({ toggle, isCollapsedProps, icon, title, setLeftMarginHook, setTitleLeftoffsetHook }) => {
  let refContainerDiv = useRef();
  let refTitle = useRef();

  useEffect(() => {
    if (!refContainerDiv) {
      return
    }
    let leftMargin = refContainerDiv.current.offsetLeft
    setLeftMarginHook(leftMargin)
  }, [refContainerDiv])

  useEffect(() => {
    if (!refTitle) {
      return
    }
    let leftMargin = refTitle.current.offsetLeft
    setTitleLeftoffsetHook(leftMargin)
  }, [refTitle])
  return (
    <div ref={refContainerDiv} className="flex justify-between items-center px-2 py-1 w-full">
      <span className="p-2 rounded-full flex justify-center items-center bg-[#E7F5FF]">
        <img src={icon} />
      </span>
      <span className=" inline-block w-[80%] text-left" ref={refTitle}>{title}</span>
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

const MenuItem = ({ title, leftMargin, titleLeftMargin, submenulist, setActiveMenuID, menuID }) => {
  const [openSubMenuBar, toggle] = useState(false);
  console.log(title)
  return (
    <>
      <div
        className={`flex w-full justify-between items-center px-2 py-1 hover:bg-[#E7F5FF]`}
        onMouseEnter={(e) => {
          setActiveMenuID(menuID);
        }}
        onClick={(e) => {
          setActiveMenuID(prev => prev === menuID ? "" : menuID);
        }}
      >
        <span className={`ml-[10px]`}>{title}</span>
      </div>
    </>
  );
};

const SubMenuBar = ({ activeMenuID, }) => {
  let getSubMenuList = (id) => {
    return subMenuSuperList[id] || [];
  };
  let submenulist = getSubMenuList(activeMenuID)
  console.log({ submenulist })
  return (
    <>
      <div className=" md:w-[299px] p-2">
        {submenulist.map((subItem, index) => (
          <SubMenuItem key={index} title={subItem.title} icon={subItem.icon} />
        ))}
      </div>
    </>
  );
};

const SubMenuItem = ({ title, icon }) => {
  const [openSubMenuBar, toggle] = useState(false);
  return (
    <>
      <div draggable={true} className="border bg-white p-2 flex flex-row justify-between">
        <span className="bg-[#E6FCF5] p-2 rounded-full"> <img src={icon} /></span>
        <span className="w-2/3 text-left inline-block">{title}</span>
      </div>
    </>
  );
};

let subMenuSuperList = {
  profile: [{ icon: myIcons.radio, title: "Radio" }],
};
