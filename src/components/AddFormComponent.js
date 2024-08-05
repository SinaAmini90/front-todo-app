// import "../App.css";
import React, { useState, useContext, useEffect, useRef } from "react";
import InputComponent from "./InputComponent";
import CalendarComponent from "./CalenderComponent";
import ButtonComponent from "./ButtonComponent.js";
import ClockComponent from "./ClockComponent";
import { TimeContext } from "../store/time-context.js";

function AddFormComponent({ onExit, onAddTask, classNameAdd }) {
  const {
    deadLineDate,
    deadLineTime,
    setDeadLineDate,
    setDeadLineTime,
    reminderTime,
    setReminderTime,
  } = useContext(TimeContext);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [reminderHour, setReminderHour] = useState("00");
  const [reminderMinute, setReminderMinute] = useState("00");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [priority, setPriority] = useState("default");

  //this two useEffect help together to wont run in first rendering
  useEffect(() => {
    if (!isFirstRender) {
      setDeadLineTime(`${hour}:${minute}`);
    }
  }, [hour, minute]);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      setReminderTime(`${reminderHour}:${reminderMinute}`);
    }
  }, [reminderHour, reminderHour]);

  const lowPriorityHandler = () => {
    setPriority("low");
  };
  const midPriorityHandler = () => {
    setPriority("mid");
  };
  const highPriorityHandler = () => {
    setPriority("high");
  };

  const handleToggle = () => {
    setIsDisplayed((prevState) => !prevState);
  };
  let classVlaue =
    " fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ";
  const handleSubmit = (event) => {
    event.preventDefault();

    deadLineTime === "00:00" && setDeadLineTime(() => "");
    reminderTime === "00:00" && setReminderTime(() => "");

    const newTask = {
      id: Date.now(),
      title: `${deadLineDate && " آخرین فرصت:"}${deadLineDate}${
        deadLineTime && "ساعت اتمام کار: "
      }${deadLineTime}${title}`,
      description: `${reminderTime && "یادآوری: "}${reminderTime} ${
        reminderTime && "قبل"
      } ${description}`,
      priority: priority,
    };
    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setDeadLineDate("");
    setDeadLineTime("");
    setPriority("default");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <div className={classVlaue + classNameAdd}>
      <div className="bg-white rounded-lg border m-6 p-6 w-fit">
        <ButtonComponent
          type="button"
          context="خروج"
          icon="exit"
          className="sideBar"
          onClick={onExit}
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" ">
            <InputComponent
              context="عنوان کار"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              classNameAdd=" w-full text-right mb-2 p-2 "
            />
            <InputComponent
              context="توضیحات ..."
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              classNameAdd=" w-full text-right mb-2 p-2"
            />
          </div>
          <div className=" flex justify-between">
            <div className=" w-80">
              <CalendarComponent />
            </div>
            <div className="flex flex-col gap-2 w-80">
              <div className="flex items-center ">
                <ButtonComponent
                  type="button"
                  context="آخرین فرصت:"
                  icon="clock"
                  className="none"
                />
                <div className="flex align-middle justify-center gap-2">
                  <InputComponent
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    context="00"
                  />
                  <p>:</p>
                  <InputComponent
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    context="24"
                  />
                </div>
              </div>
              <div className=" flex items-center ">
                <ButtonComponent
                  type="button"
                  context="یادآوری:"
                  icon="reminder"
                  className="none"
                />
                <div className="flex align-middle justify-center gap-2">
                  <InputComponent
                    value={reminderMinute}
                    onChange={(e) => setReminderMinute(e.target.value)}
                    context="00"
                  />
                  <p>:</p>
                  <InputComponent
                    value={reminderHour}
                    onChange={(e) => setReminderHour(e.target.value)}
                    context="00"
                  />
                </div>
                <span>قبل</span>
              </div>
              <div className="flex items-center ">
                <ButtonComponent
                  type="button"
                  context="اولویت:"
                  icon="priority"
                  className="none"
                  onClick={() => setPriority("default")}
                />
                <ButtonComponent
                  type="button"
                  className="action"
                  context="کم"
                  classNameAdd={` ${
                    priority === "low" ? "bg-green-200" : "bg-green-50"
                  }`}
                  onClick={lowPriorityHandler}
                />
                <ButtonComponent
                  type="button"
                  className="action"
                  context="معمولی"
                  classNameAdd={` ${
                    priority === "mid" ? "bg-yellow-200" : "bg-yellow-50"
                  }`}
                  onClick={midPriorityHandler}
                />
                <ButtonComponent
                  type="button"
                  className="action"
                  context="زیاد"
                  classNameAdd={` ${
                    priority === "high" ? "bg-red-200" : "bg-red-50"
                  }`}
                  onClick={highPriorityHandler}
                />
              </div>
              <ButtonComponent
                type="button"
                context="تکرار کار:"
                icon="repeat"
                className="none"
              />
              <ButtonComponent
                type="button"
                context="انتخاب دسته بندی:"
                icon="grouping"
                className="none"
              />
              <select
                id="grouping"
                onchange="ChangeGroup()"
                class=" bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded focus:outline-none"
              >
                <option value="">-- دسته بندی کار را انتخاب کنید --</option>
                <option value="draft">پیش نویس</option>
                <option value="personal">شخصی</option>
                <option value="home">خانه</option>
                <option value="business">شغلی</option>
                <option value="sport">ورزش</option>
                <option value="study">مطالعه</option>
                <option value="birthday">مناسبت</option>
              </select>

              <div className="flex gap-3 justify-center">
                <ButtonComponent
                  type="submit"
                  context="اضافه کن"
                  className="action"
                />
                <ButtonComponent
                  type="button"
                  context="حذف کن"
                  onClick={handleCancel}
                  className="action"
                />{" "}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFormComponent;
