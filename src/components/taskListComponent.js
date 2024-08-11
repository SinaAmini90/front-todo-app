import React, { useContext, useState } from "react";
import ButtonComponent from "./ButtonComponent.js";
import { TimeContext } from "../store/time-context.js";

function TaskListComponent({ tasks, deleteTask }) {
  // const { deadLineTime, deadLineDate } = useContext(TimeContext);
  const colors = [
    "bg-purple-50", //default 0
    "bg-green-100", //low 1
    "bg-yellow-100", //medium 2
    "bg-red-100", //high 3
  ];

  // two type of layout for todos list.
  const [liTagClass, setliTagClass] = useState(true);
  const flexTypeHandler = () => {
    setliTagClass((prevState) => !prevState);
  };
  //for two type of layout for tasks list
  let liTagClassAdd = liTagClass
    ? " w-52 h-52 flex-col "
    : " max-w-2xl w-full items-center";

  return (
    <div className="min-w-96 w-full p-5 m-2 bg-zinc-50 rounded-lg ">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4 ">لیست کارها:</h2>
        <ButtonComponent
          context="تغییر نحوه نمایش "
          onClick={flexTypeHandler}
        />
      </div>
      <ul className=" flex flex-wrap gap-4 ">
        {tasks.map((task) => (
          <li
            key={task.key}
            className={`flex p-4 rounded-lg shadow-md ${liTagClassAdd} ${
              task.priority === "default" && colors[0]
            } ${task.priority === "low" && colors[1]} ${
              task.priority === "mid" && colors[2]
            } ${task.priority === "high" && colors[3]}`}
          >
            <div className="flex-grow overflow-hidden w-9/12">
              <h3 className="text-sm font-semibold mb-1 truncate">
                {task.title}
                {task.deadlinedate && " _ "}
                {task.deadlinedate}
                {task.deadlinetime && " _ "}
                {task.deadlinetime}
              </h3>
              <p className="text-gray-600 text-sm break-words truncate">
                توضیحات: {task.description}
              </p>
            </div>
            <div className="flex gap-2">
              <ButtonComponent
                icon="trash"
                onClick={() => deleteTask(task.id)}
              />
              <ButtonComponent icon="edit" />
              <ButtonComponent icon="done" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskListComponent;
