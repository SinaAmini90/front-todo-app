import React, { useState, useContext, useEffect } from "react";
import InputComponent from "./InputComponent";
import CalendarComponent from "./CalenderComponent";
import ButtonComponent from "./ButtonComponent.js";
import { TimeContext } from "../store/time-context.js";
import { FormContext } from "../store/form-context.js";

function AddFormComponent({ onAddTask, classNameAdd }) {
  const {
    deadLineDate,
    deadLineTime,
    setDeadLineDate,
    setDeadLineTime,
    // reminderTime, (**about reminder time ** develop later**)
    // setReminderTime,
  } = useContext(TimeContext);
  const { displayForm, setDisplayForm } = useContext(FormContext);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  // const [reminderHour, setReminderHour] = useState("00"); (**about reminder time ** develop later**)
  // const [reminderMinute, setReminderMinute] = useState("00"); (**about reminder time ** develop later**)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [priority, setPriority] = useState("default");
  const [category, setCategory] = useState("");

  //this two useEffect help together to wont run in first rendering
  // useEffect(() => {
  //   setDeadLineTime(`${hour}:${minute}`);
  //   // if (!isFirstRender) {

  //   // }
  // }, [hour, minute]);
  // (**about reminder time ** develop later**)
  // useEffect(() => {
  //   if (isFirstRender) {
  //     setIsFirstRender(false);
  //   } else {
  //     setReminderTime(`${reminderHour}:${reminderMinute}`);
  //   }
  // }, [reminderHour, reminderMinute]);

  useEffect(() => {
    if (!displayForm) {
      setTitle("");
      setDescription("");
      setHour("00");
      setMinute("00");
      // setReminderHour("00"); (**about reminder time ** develop later**)
      // setReminderMinute("00"); (**about reminder time ** develop later**)
      setDeadLineDate("");
      setDeadLineTime("");
      setPriority("default");
      setCategory("noGroup");
    }
  }, [displayForm]);

  // to get diffrent color for tasks base type of priority
  const lowPriorityHandler = () => {
    setPriority("low");
  };
  const midPriorityHandler = () => {
    setPriority("mid");
  };
  const highPriorityHandler = () => {
    setPriority("high");
  };

  let classVlaue =
    " fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ";

  const onExitHandler = () => {
    setDisplayForm();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    deadLineTime === "00:00" && setDeadLineTime(() => "");
    // reminderTime === "00:00" && setReminderTime(() => ""); (**about reminder time ** develop later**)
    if (title.trim()) {
      const id = Math.floor(Date.now() * Math.random());
      const newTask = {
        key: id,
        id: id,
        title: title,
        // `${title}${deadLineDate && " _ "}${deadLineDate}${
        //   deadLineTime && " _ "
        // }${deadLineTime}`,
        description: description,
        // `${description}${
        //   reminderTime && "_ یادآوری: "
        // }${reminderTime} ${reminderTime && " قبل"}`,
        priority: priority,
        category: category,
        deadlinedate: deadLineDate,
        deadlinetime: deadLineTime,
        // reminderTime: reminderTime, (**about reminder time ** develop later**)
      };
      onAddTask(newTask);
    }
    setDisplayForm();
  };

  const onChangeCategory = (event) => {
    const value = event.target.value;
    setCategory(value);
  };
  return (
    <div className={classVlaue + classNameAdd}>
      <div className="bg-white rounded-lg border m-6 p-6 w-fit">
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
              {/* <div className=" flex items-center ">
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
              </div> */}
              {/*(**about reminder time ** develop later**)*/}
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
              {/* (**about task repeat ** develop later**) */}
              {/* <ButtonComponent
                type="button"
                context="تکرار کار:"
                icon="repeat"
                className="none"
              />
              <select
                id="repeat"
                // onChange={onChangeRepeat}
                // value={repeat}
                class=" bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded focus:outline-none"
              >
                <option value="noRepeat">-- بدون تکرار --</option>
                <option value="everyDay">هر روز تا یکماه</option>
                <option value="everyOtherDay"> یک روز در میان تا یکماه</option>
                <option value="everyWeek"> هر هفته تا یکماه</option>
                <option value="everyMonth">هر ماه تا یک سال</option>
                <option value="everyYear">هر سال</option>
                <option value="custome">انتخاب تکرارهای از روی تقویم</option>
              </select> */}
              <ButtonComponent
                type="button"
                context="انتخاب دسته بندی:"
                icon="category"
                className="none"
              />
              <select
                id="category"
                onChange={onChangeCategory}
                value={category}
                class=" bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded focus:outline-none"
              >
                <option value="noGroup">-- بدون دسته بندی --</option>
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
                  type="button"
                  context="خروج از فرم"
                  onClick={onExitHandler}
                  className="action"
                />
                <ButtonComponent
                  type="submit"
                  context="اضافه کردن کار"
                  className="action"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFormComponent;
