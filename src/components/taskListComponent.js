import React, { useState, useEffect, useContext } from "react";
import ButtonComponent from "./ButtonComponent.js";
import { TimeContext } from "../store/time-context.js";

function TaskListComponent({ tasks, deleteTask }) {
  const colors = [
    "bg-red-100", //high 0
    "bg-green-100", //low 1
    "bg-blue-100", //
    "bg-yellow-100", //mediom 3
    "bg-purple-100", //defalt 4
    "bg-pink-100",
    "bg-indigo-100",
    "bg-teal-100",
    "bg-orange-100",
    "bg-red-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-teal-200",
    "bg-orange-200",
  ];

  const initialColors = [];
  const [taskColors, setTaskColors] = useState([]);

  useEffect(() => {
    let i = 0;
    tasks.forEach((task) => {
      initialColors[i] = colors[Math.floor(Math.random() * colors.length)];
      i += 1;
    });
    setTaskColors(initialColors);
  }, [tasks]);

  // two type of layout for todos list.
  const [liTagClass, setliTagClass] = useState(true);
  function flexTypeHandler() {
    setliTagClass((prevState) => !prevState);
  }
  let liTagClassAdd = "";
  switch (liTagClass) {
    case true: //grid
      liTagClassAdd = " w-52 h-52 flex-col ";
      break;
    case false: //row
      liTagClassAdd = " max-w-2xl w-full items-center";
      break;
  }

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
        {console.log(tasks)}
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex ${colors[4]} p-4 rounded-lg shadow-md ${liTagClassAdd}`}
          >
            <div className="flex-grow overflow-hidden w-9/12">
              <h3 className="text-sm font-semibold mb-1 truncate">
                عنوان کار: {task.title}
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
