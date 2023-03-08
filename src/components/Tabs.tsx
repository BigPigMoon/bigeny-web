import React from "react";
import { Link } from "react-router-dom";

type Tab = {
  name: string;
  to: string;
  active: boolean;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs = (props: TabsProps) => {
  return (
    <>
      <div className="tabs w-full fixed left-0 right-0 items-center">
        {props.tabs.map((tab: Tab) => {
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`tab tab-bordered grow ${
                tab.active ? "tab-active" : ""
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Tabs;
