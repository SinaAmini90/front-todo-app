import React from "react";
import ButtonComponent from "./ButtonComponent";
export default function SideBarComponent({ onClick }) {
  //   const onClickHandler = onClick;
  return (
    <div className=" min-w-fit p-5 h-fit m-2 ml-0 bg-zinc-100 rounded-lg flex flex-col items-start ">
      <ButtonComponent
        onClick={() => onClick("new task")}
        context="کار جدید"
        icon="add"
        className="sideBar"
      />
      <ButtonComponent
        onClick={() => onClick("draft")}
        context="پیش نویس"
        icon="draft"
        className="sideBar"
      />
      <ButtonComponent
        onClick={() => onClick("today tasks")}
        context="کارهای امروز"
        icon="today"
        className="sideBar"
      />
      <ButtonComponent
        onClick={() => onClick("all tasks")}
        context="همه کارها"
        icon="week"
        className="sideBar"
      />
      <hr class="border-t-2 border-gray-300 w-full max-w-md my-4" />
      <ButtonComponent context="پروژه های من" className="sideBar" />
      <ButtonComponent
        onClick={() => onClick("personal")}
        context="شخصی"
        icon="personal"
        className="sideBar"
      />
      <ButtonComponent
        onClick={() => onClick("home")}
        context="خانه"
        icon="home"
        className="sideBar"
      />
      <ButtonComponent
        onClick={() => onClick("business")}
        context="شغلی"
        icon="business"
        className="sideBar"
      />
      <ButtonComponent
        onClick={() => onClick("sport")}
        context="ورزش"
        icon="sport"
        className="sideBar"
      />
      <ButtonComponent
        onClick={() => onClick("study")}
        context="مطالعه"
        icon="study"
        className="sideBar"
      />
      <ButtonComponent
        onClick={() => onClick("birthday")}
        context="مناسبت"
        icon="birthday"
        className="sideBar"
      />
    </div>
  );
}
