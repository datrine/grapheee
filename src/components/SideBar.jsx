import { useEffect, useRef, useState } from "react";
import { myIcons } from "../assets";
import {
  BsArrowLeftShort,
  BsChevronDown,
  BsChevronRight,
} from "react-icons/bs";

export const SideBar = ({ isMenuOpenProp, toggleMenuProp }) => {
  const [openSubMenubar, toggleSubmenuBar] = useState(false);
  const [activeMenuID, changeActiveMenuID] = useState("");
  const [activeSubMenu, changeActiveSubMenu] = useState([]);
  return (
    <>
      <div
        onBlurCapture={(e) => {
          toggleMenuProp(false);
        }}
        onMouseLeave={(e) => {
          changeActiveMenuID("");
        }}
        className=" bg-[#F8F9FA] flex flex-row"
      >
        <div>
          <div>
            <BsArrowLeftShort
              className=" text-xl"
              onClick={(e) => {
                toggleMenuProp(false);
              }}
            />
          </div>
          <div className=" p-2 flex flex-row">
            <div className=" flex flex-col">
              {subMenuSuperList.map((menu) => (
                <CollapsibleMenu
                  title={menu.title}
                  icon={menu.icon}
                  menulist={menu.submenu}
                  setActiveMenuID={changeActiveMenuID}
                  setActiveSubMenu={changeActiveSubMenu}
                  key={menu.menuID}
                />
              ))}
              <CollapsibleMenu
                title={"Workspace Settings"}
                icon={myIcons.workspace_settings}
              ></CollapsibleMenu>
            </div>
          </div>
        </div>
        {activeMenuID ? <SubMenuBar submenulist={activeSubMenu} /> : null}
      </div>
    </>
  );
};

const CollapsibleMenu = ({
  children,
  setActiveMenuID,
  setActiveSubMenu,
  menulist = [],
  ...props
}) => {
  const [openCollapsible, toggle] = useState(false);
  return (
    <div className=" md:w-[299px] flex flex-col items-center mb-3">
      <CollapsibleMenuHeader
        {...props}
        toggle={toggle}
        isCollapsedProps={openCollapsible}
      />
      <div className={` w-[calc(100%-25px)] ml-[25px] border-l `}>
        {openCollapsible
          ? menulist.map((menuItem) => (
              <MenuItem
                setActiveSubMenu={setActiveSubMenu}
                menuID={menuItem.menuID}
                title={menuItem.title}
                key={menuItem.title}
                menulist={menuItem.submenu}
              />
            ))
          : null}
      </div>
    </div>
  );
};

const CollapsibleMenuHeader = ({
  toggle,
  isCollapsedProps,
  icon,
  title,
  setLeftMarginHook,
  setTitleLeftoffsetHook,
}) => {
  let refContainerDiv = useRef();
  let refTitle = useRef();

  useEffect(() => {
    if (!refContainerDiv) {
      return;
    }
    let leftMargin = refContainerDiv.current.offsetLeft;
    setLeftMarginHook(leftMargin);
  }, [refContainerDiv]);

  useEffect(() => {
    if (!refTitle) {
      return;
    }
    let leftMargin = refTitle.current.offsetLeft;
    setTitleLeftoffsetHook(leftMargin);
  }, [refTitle]);
  return (
    <div
      ref={refContainerDiv}
      className="flex justify-between items-center px-2 py-1 w-full"
      onClick={(e) => {
        toggle((state) => !state);
      }}
    >
      <span className="p-2 rounded-full flex justify-center items-center bg-[#E7F5FF]">
        <img src={icon} />
      </span>
      <span className=" inline-block w-[80%] text-left" ref={refTitle}>
        {title}
      </span>
      <span>{isCollapsedProps ? <BsChevronDown /> : <BsChevronRight />}</span>
    </div>
  );
};

const MenuItem = ({
  title,setActiveSubMenu,
  menuID,
  menulist = [],
}) => {
  return (
    <>
      <div
        className={`flex w-full justify-between items-center px-2 py-1 hover:bg-[#E7F5FF]`}
        onMouseEnter={(e) => {
          setActiveSubMenu(menulist);
        }}
        onClick={(e) => {
          setActiveSubMenu([...menulist]);
        }}
      >
        <span className={`ml-[10px]`}>{title}</span>
      </div>
    </>
  );
};

const SubMenuBar = ({ submenulist }) => {
  return (
    <>
      <div className=" md:w-[200px] p-2 z-30">
        <div className="flex justify-between ">
          <span className=" capitalize">{activeMenuID}</span>
        </div>
        {submenulist.map((subItem, index) => (
          <SubMenuItem
            key={index}
            title={subItem.title}
            value={subItem.value}
            icon={subItem.icon}
          />
        ))}
      </div>
    </>
  );
};

const SubMenuItem = ({ title, icon, value }) => {
  const [openSubMenuBar, toggle] = useState(false);
  return (
    <>
      <div
        onDragStartCapture={(e) => {
          e.dataTransfer.clearData();
          e.dataTransfer.setData("text/plain", value);
        }}
        draggable={true}
        className="rounded-sm drop-shadow-md bg-white p-2 flex flex-row justify-between"
      >
        <span className="bg-[#E6FCF5] p-2 rounded-full">
          <img src={icon} />
        </span>
        <span className="w-2/3 text-left inline-block">{title}</span>
      </div>
    </>
  );
};

let subMenuSuperList = [
  {
    title: "Personal Settings",
    menuID: "personal_settings",
    icon: myIcons.personal_settings,
    submenu: [
      {
        title: "Profile",
        menuID: "profile",
        submenu: [],
      },
      {
        title: "Credentials",
        menuID: "credentials",
        submenu: [],
      },
      {
        title: "Notifications",
        menuID: "notifications",
        submenu: [],
      },
    ],
  },
  {
    title: "Product Settings",
    menuID: "product_settings",
    icon: myIcons.product_settings,
    submenu: [
      {
        title: "Attributes",
        menuID: "attributes",
        submenu: [],
      },
      {
        title: "Group Mentions",
        menuID: "group_mentions",
        submenu: [],
      },
      {
        title: "Task forms",
        menuID: "task_forms",
        submenu: [{ icon: myIcons.radio, title: "Radio", value: "radio" }],
      },
      {
        title: "Integrations",
        menuID: "integrations",
        submenu: [],
      },
    ],
  },
];
