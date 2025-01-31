import React, { useState, useContext, useEffect } from "react";
import InputComponent from "./InputComponent";
import CalendarComponent from "./CalenderComponent";
import ButtonComponent from "./ButtonComponent.js";
import { TimeContext } from "../store/time-context.js";
import { FormContext } from "../store/form-context.js";

function AddFormComponent({
  onAddTask,
  onEditTask,
  classNameAdd,
  taskForEdit,
}) {
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
  const [priority, setPriority] = useState("default");
  const [category, setCategory] = useState("");
  const [taskEditDate, setTaskEditDate] = useState("");
  const [addFormText, setAddFormText] = useState("");

  useEffect(() => {
    if (taskForEdit) {
      setTitle(taskForEdit.title);
      setDescription(taskForEdit.description);
      setPriority(taskForEdit.priority);
      setCategory(taskForEdit.category);
      const taskTime = taskForEdit.deadlinetime;
      const [hh, mm] = taskTime.split(":");
      hh > 0 ? setHour(hh) : setHour("00");
      mm > 0 ? setMinute(mm) : setMinute("00");
      const taskDate = taskForEdit.deadlinedate;
      taskDate ? setTaskEditDate(taskDate) : setTaskEditDate("noTaskDate");
    }
  }, [taskForEdit]);

  //this two useEffect help together to wont run in first rendering
  useEffect(() => {
    setDeadLineTime(`${hour}:${minute}`);
  }, [hour, minute]);

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
      setTaskEditDate("");
    }
  }, [displayForm]);

  // to get different color for tasks base type of priority
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    deadLineTime === "00:00" && setDeadLineTime(() => "");
    // reminderTime === "00:00" && setReminderTime(() => ""); (**about reminder time ** develop later**)
    try {
      if (taskForEdit) {
        if (title.trim()) {
          setAddFormText("در حال بررسی اطلاعات...");
          const editedTask = {
            key: taskForEdit.id,
            id: taskForEdit.id,
            title: title,
            description: description,
            priority: priority,
            category: category,
            deadlinedate: deadLineDate,
            deadlinetime: deadLineTime,
          };
          await onEditTask(editedTask);
          setAddFormText("");
        }
      } else {
        if (title.trim()) {
          setAddFormText("در حال بررسی اطلاعات...");
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
          await onAddTask(newTask);
          setAddFormText("");
        }
      }
      setDisplayForm();
    } catch (error) {
      console.error("Error during task submission or task editing:", error);
      setAddFormText("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  const onChangeCategory = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  const handleMinuteChange = (e) => {
    const minute = Number(e.target.value);
    if (!isNaN(minute) && minute < 60 && minute >= 0) {
      const minuteFormated = minute < 10 ? `0${minute}` : `${minute}`;
      setMinute(minuteFormated);
    } else {
      setMinute("00");
    }
  };
  const handleHourChange = (e) => {
    console.log(e.target.value);
    const hour = Number(e.target.value);
    if (!isNaN(hour) && hour < 24 && hour >= 0) {
      const hourFormated = hour < 10 ? `0${hour}` : `${hour}`;
      setHour(hourFormated);
    } else {
      setHour("00");
    }
  };
  return (
    <div className={classVlaue + classNameAdd}>
      <div className="bg-white rounded-lg border m-6 p-6 w-fit">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" ">
            <InputComponent
              context="عنوان کار (پر کردن عنوان الزامی است.)"
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
              <CalendarComponent taskEditDate={taskEditDate} />
            </div>
            <div className="flex flex-col gap-2 w-80">
              <div className="flex items-center ">
                <ButtonComponent
                  type="button"
                  context="آخرین فرصت:"
                  icon="clock"
                  className="none"
                />
                <div className="flex align-middle justify-center gap-1 ">
                  <InputComponent
                    value={minute}
                    onChange={handleMinuteChange}
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
                  classNameAdd={` ${
                    !title.trim() || !deadLineDate ? "text-slate-400" : ""
                  } ${taskEditDate ? "hidden" : ""}`}
                  disabled={!title.trim() || !deadLineDate}
                />
                <ButtonComponent
                  type="submit"
                  context="ویرایش کار"
                  className="action"
                  classNameAdd={` ${
                    !title.trim() || !deadLineDate ? "text-slate-400" : ""
                  } ${taskEditDate ? "" : "hidden"}`}
                  disabled={!title.trim() || !deadLineDate}
                />
              </div>
              <p
                className={` ${
                  !title.trim() || !deadLineDate ? "" : "hidden"
                } pr-1 pt-3 text-sm text-red-600`}
              >
                توجه: پرکردن عنوان و انتخاب تاریخ الزامی است.
              </p>
              <p className={` ${addFormText ? "" : "hidden"} pr-1 pt-3 `}>
                {addFormText}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFormComponent;
