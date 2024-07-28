// import "../App.css";
import React, { useState } from "react";
import InputComponent from "./InputComponent";
import CalendarComponent from "./CalenderComponent";
import ButtonComponent from "./ButtonComponent";
import ClockComponent from "./ClockComponent";

function AddFormComponent({ onExit, onAddTask, classNameAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDisplayed, setIsDisplayed] = useState(false);
  const handleToggle = () => {
    setIsDisplayed((prevState) => !prevState);
  };
  let classVlaue =
    " fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ";
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
    };
    onAddTask(newTask);
    setTitle("");
    setDescription("");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <div className={classVlaue + classNameAdd}>
      <div className="bg-white rounded-lg border m-6 p-6 w-fit">
        <ButtonComponent
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
          <div className="w-76 flex justify-between">
            <div className=" w-80">
              <CalendarComponent />
              <div className="flex items-center  justify-around">
                <ButtonComponent
                  context="آخرین فرصت:"
                  icon="clock"
                  className="none"
                />
                <ClockComponent />
              </div>
            </div>
            <div className=" w-80">
              <div className=" flex items-center  justify-around">
                <ButtonComponent
                  context="یادآوری:"
                  icon="reminder"
                  className="none"
                />
                <ClockComponent />
                <span>قبل</span>
              </div>
              <div className="flex items-center  justify-around">
                <ButtonComponent
                  context="اولویت:"
                  icon="priority"
                  className="none"
                />
                <ButtonComponent
                  className="action"
                  context="کم"
                  classNameAdd=" bg-lime-200"
                />
                <ButtonComponent
                  className="action"
                  context="معمولی"
                  classNameAdd=" bg-yellow-200"
                />
                <ButtonComponent
                  className="action"
                  context="زیاد"
                  classNameAdd=" bg-red-300"
                />
              </div>
              <ButtonComponent
                context="تکرار کار:"
                icon="repeat"
                className="none"
              />
              <div>
                <ButtonComponent type="submit" context="انتخاب گروه" />
                <div className="flex gap-3 items-center">
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
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFormComponent;
