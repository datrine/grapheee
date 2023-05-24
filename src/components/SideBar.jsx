import { useEffect, useRef, useState } from "react";
import { myIcons } from "../assets";
import {
  BsArrowLeftShort,
  BsChevronDown,
  BsChevronRight,
} from "react-icons/bs";

export const SideBar = ({ isMenuOpenProp, toggleMenuProp }) => {
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
          <div className=" p-2 flex flex-row mb-2">
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
            </div>
          </div>
        </div>
        {activeMenuID ? (
          <SubMenuBar
            submenulist={activeSubMenu}
            activeMenuTitle={activeMenuID}
            changeActiveMenuID={changeActiveMenuID}
          />
        ) : null}
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
                setActiveMenuID={setActiveMenuID}
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
  return (
    <div
      className="flex justify-between items-center px-2 py-1 w-full"
      onClick={(e) => {
        toggle((state) => !state);
      }}
    >
      <span className="p-2 rounded-full flex justify-center items-center bg-[#E7F5FF]">
        <img src={icon} />
      </span>
      <span className=" inline-block w-[80%] text-left">{title}</span>
      <span>{isCollapsedProps ? <BsChevronDown /> : <BsChevronRight />}</span>
    </div>
  );
};

const MenuItem = ({
  title,
  setActiveSubMenu,
  setActiveMenuID,
  menuID,
  menulist = [],
}) => {
  return (
    <>
      <div
        className={`flex w-full justify-between items-center md:mt-2 px-2 py-2 hover:bg-[#E7F5FF]`}
        onMouseEnter={(e) => {
          setActiveMenuID(title);
          setActiveSubMenu(menulist);
        }}
        onClick={(e) => {
          setActiveMenuID(title);
          setActiveSubMenu([...menulist]);
        }}
      >
        <span className={`ml-[10px]`}>{title}</span>
      </div>
    </>
  );
};

const SubMenuBar = ({ submenulist, activeMenuTitle, changeActiveMenuID }) => {
  return (
    <>
      <div className=" md:w-[200px] p-2 z-30 mb-2 mt-2">
        <div className="flex justify-between ">
          <span className=" capitalize text-[#1C7ED6]">{activeMenuTitle}</span>
          <span
            onClick={(e) => {
              changeActiveMenuID("");
            }}
          >
            <img src={myIcons.close_submenu} />
          </span>
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
        className="rounded-md drop-shadow-md bg-white p-2 flex flex-row justify-between mb-5 mt-1"
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
        submenu: [
          { icon: myIcons.radio, title: "Radio", value: "radio" },
          { icon: myIcons.uncheckedbox, title: "Checkboxes", value: "checkbox" },
          { icon: myIcons.short_answer, title: "Short Answer", value: "short_answer" },
          { icon: myIcons.long_answer, title: "Long Answer", value: "long_answer" },
          { icon: myIcons.email, title: "Email", value: "email" },
        ],
      },
      {
        title: "Integrations",
        menuID: "integrations",
        submenu: [],
      },
    ],
  },
  {
    title: "Workspace Settings",
    menuID: "workspace_settings",
    icon: myIcons.workspace_settings,
    submenu: [
      {
        title: "Billing",
        menuID: "billing",
        submenu: [],
      },
      {
        title: "Users",
        menuID: "users",
        submenu: [],
      },
      {
        title: "Company",
        menuID: "company",
        submenu: [],
      },
      {
        title: "Permissions",
        menuID: "permissions",
        submenu: [],
      },
    ],
  },
];
