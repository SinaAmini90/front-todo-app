import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent.js";

export default function NavBarComponent() {
  const [displayAccountModal, setDisplayAccountModal] = useState("hidden");
  const [displayExitAccountModal, setDisplayExitAccountModal] =
    useState("hidden");
  const accountToggle = () => {
    setDisplayAccountModal((perv) => !perv);
    const exitAccountToggle = () => {
      setDisplayExitAccountModal((perv) => !perv);
    };
    return (
      <div className=" flex justify-between py-1 px-10 mx-2 bg-zinc-100 rounded-lg ">
        <div
          className={`${displayAccountModal} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
        >
          <ButtonComponent></ButtonComponent>
        </div>
        <div
          className={`${displayExitAccountModal} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
        ></div>
        <div>sina amini</div>
        <div className="flex gap-3 ">
          <ButtonComponent
            onClick={accountToggle}
            context="ورود به کاربری"
            icon="draft"
            className="sidebar"
            classNameAdd=" text-slate-800 text-sm"
          />
          <ButtonComponent
            onClick={exitAccountToggle}
            context="خروج از حساب"
            icon="exit"
            className="sidebar"
            classNameAdd=" text-slate-800 text-sm"
          />
        </div>
      </div>
    );
  };
}
