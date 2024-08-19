import React, { Children } from "react";

export default function ButtonComponent({
  type,
  context,
  icon,
  onClick,
  classNameAdd,
  classImgAdd,
  children,
  className,
  disabled,
}) {
  let classVlaueButtonTag = " flex items-center justify-center border-none ";
  switch (className) {
    case "sideBar":
      classVlaueButtonTag =
        "hover:scale-110 duration-200 whitespace-nowrap border-none font-bold py-2 px-4 rounded-lg ";
      break;
    case "action":
      classVlaueButtonTag =
        " hover:scale-110 duration-200 whitespace-nowrap font-bold py-2 px-4 rounded-lg shadow-md";
      break;
    case "none":
      classVlaueButtonTag = //cursor-default
        " cursor-default border-none rounded whitespace-nowrap font-bold px-2 py-2";
      break;
  }

  let classVlaue = "rounded-lg";
  // pulsar icon in website: https://icons8.com/
  let clipArts = {
    signup: {
      src: "https://img.icons8.com/pulsar-line/96/add-user-male.png",
      alt: "signup",
    },
    logout: {
      src: "https://img.icons8.com/pulsar-line/96/exit.png",
      alt: "logout",
    },
    login: {
      src: "https://img.icons8.com/pulsar-line/96/login-rounded.png",
      alt: "login",
    },
    account: {
      src: "https://img.icons8.com/pulsar-line/96/guest-male.png",
      alt: "account",
    },
    category: {
      src: "https://img.icons8.com/pulsar-color/96/opened-folder.png",
      alt: "category",
    },
    birthday: {
      src: "https://img.icons8.com/pulsar-color/96/birthday.png",
      alt: "birthday",
    },
    study: {
      src: "https://img.icons8.com/pulsar-color/96/learning.png",
      alt: "learning",
    },
    sport: {
      src: "https://img.icons8.com/pulsar-color/96/sports.png",
      alt: "sports",
    },
    business: {
      src: "https://img.icons8.com/pulsar-color/96/money-bag-euro.png",
      alt: "business",
    },
    home: {
      src: "https://img.icons8.com/pulsar-color/96/home-page.png",
      alt: "home",
    },
    personal: {
      src: "https://img.icons8.com/pulsar-color/96/user-male-circle.png",
      alt: "personal",
    },
    week: {
      src: "https://img.icons8.com/pulsar-color/96/year-view.png",
      alt: "week",
    },
    today: {
      src: "https://img.icons8.com/pulsar-color/96/today.png",
      alt: "today",
    },
    draft: {
      src: "https://img.icons8.com/pulsar-color/96/sign-up-in-calendar.png",
      alt: "draft",
    },
    exit: {
      src: "https://img.icons8.com/pulsar-color/96/close-window.png",
      alt: "exit",
    },
    repeat: {
      src: "https://img.icons8.com/pulsar-color/96/clock-arrow.png",
      alt: "repeat",
    },
    trash: {
      src: "https://img.icons8.com/fluency-systems-regular/96/trash--v1.png",
      alt: "trash",
    },
    edit: {
      src: "https://img.icons8.com/windows/96/edit--v1.png",
      alt: "edit",
    },
    done: {
      src: "https://img.icons8.com/office/96/checkmark--v1.png",
      alt: "checkmark",
    },
    back: {
      src: "https://img.icons8.com/pulsar-color/96/back.png",
      // "https://img.icons8.com/plasticine/96/back.png",
      alt: "back",
    },
    clock: {
      src: "https://img.icons8.com/pulsar-color/96/present.png",
      alt: "clock",
    },
    reminder: {
      src: "https://img.icons8.com/pulsar-color/96/remind.png",
      alt: "alarm",
    },
    priority: {
      src: "https://img.icons8.com/pulsar-color/96/high-priority.png",
      alt: "priority",
    },
    add: {
      src: "https://img.icons8.com/pulsar-color/96/add.png",
      alt: "add",
    },
  };
  return (
    <div className={classVlaue + classNameAdd}>
      <button
        className={classVlaueButtonTag + " bg-inherit"}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {icon && (
          <img
            className={
              (context ? "w-6 h-6 ml-2 mt-1" : "w-4 h-4 ml-2 mt-1") +
              classImgAdd
            }
            {...clipArts[icon]}
          />
        )}
        {context && <span>{context}</span>}
        {children}
      </button>
    </div>
  );
}
