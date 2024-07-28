import React, { useState, useEffect } from "react";
import jalaali from "jalaali-js";
import ButtonComponent from "./ButtonComponent";

function CalendarComponent() {
  const [deadLine, setDeadLine] = useState("");

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const jalaaliDate = jalaali.toJalaali(year, month, now.getDate());
  const [jalaaliYear, setJalaaliYear] = useState(jalaaliDate.jy);
  const [jalaaliMonth, setJalaaliMonth] = useState(jalaaliDate.jm);
  const jalaaliDay = jalaaliDate.jd;

  function getDayOfWeak(jy, jm, jd) {
    const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
    const date = new Date(gy, gm - 1, gd); // Months are 0-based in JavaScript Date
    const dayOfWeak = date.getDay();
    const persianDayOfWeak = dayOfWeak + 1;
    return persianDayOfWeak;
  }

  const daysInMonth = jalaali.jalaaliMonthLength(jalaaliYear, jalaaliMonth);
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const firstDayOfMonth = getDayOfWeak(jalaaliYear, jalaaliMonth, 1);
  const lastDayOfMonth = getDayOfWeak(jalaaliYear, jalaaliMonth, daysInMonth);
  console.log(lastDayOfMonth);

  if (firstDayOfMonth < 7) {
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.unshift("");
    }
  }
  if (lastDayOfMonth < 7) {
    for (let i = 0; i < 6 - lastDayOfMonth; i++) {
      daysArray.push("");
    }
  } else {
    for (let i = 0; i < 6; i++) {
      daysArray.push("");
    }
  }

  const monthNames = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const dayNames = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  const monthName = monthNames[jalaaliMonth - 1];

  const onClickPastMonth = () => {
    setJalaaliMonth((prevState) => {
      if (prevState > 1) {
        return prevState - 1;
      } else {
        setJalaaliYear((prevYear) => prevYear - 1);
        return 12;
      }
    });
  };
  const onClickNextMonth = () => {
    setJalaaliMonth((prevState) => {
      if (prevState < 12) {
        return prevState + 1;
      } else {
        setJalaaliYear((prevYear) => prevYear + 1);
        return 1;
      }
    });
  };

  return (
    <div className="p-4">
      <div className="p-4 flex justify-between">
        <ButtonComponent className="action" context="امروز" />
        <ButtonComponent className="action" context="فردا" />
        <ButtonComponent className="action" context="این هفته" />
      </div>
      <div className="flex items-center justify-between">
        <ButtonComponent
          icon="back"
          className="none"
          classImgAdd=" rotate-180 ml-0 mt-0 hover:scale-125 duration-200 "
          onClick={onClickPastMonth}
        />
        <h2 className="text-l font-bold">
          {monthName} {jalaaliYear}
        </h2>
        <ButtonComponent
          className="none"
          icon="back"
          classImgAdd=" ml-0 mt-0 hover:scale-125 duration-200"
          onClick={onClickNextMonth}
        />
      </div>
      <div className="grid grid-cols-7 gap-2 w-72 h-50">
        {dayNames.map((dayName) => (
          <ButtonComponent
            key={dayName}
            className="none"
            classNameAdd=" flex items-center justify-around border border-gray-300 "
          >
            {dayName}
          </ButtonComponent>
        ))}
        {daysArray.map((dayNumber, index) => (
          <ButtonComponent
            key={index}
            className="none"
            classNameAdd=" flex items-center justify-around border border-gray-300 "
          >
            {dayNumber}
          </ButtonComponent>
        ))}
      </div>
    </div>
  );
}

export default CalendarComponent;
