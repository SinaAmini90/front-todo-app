import "./App.css";
import React, { useState, useEffect } from "react";
import { getTasks, deleteTask, createTask, updateTask } from "./api/taskAPI.js";
import { SigninContext } from "./store/auth-context.js";
import { TimeContext } from "./store/time-context.js";
import { FormContext } from "./store/form-context.js";
import AddFormComponent from "./components/AddFormComponent.js";
import TaskListComponent from "./components/taskListComponent.js";
import SideBarComponent from "./components/SideBarComponent.js";
import NavBarComponent from "./components/NavBarComponent.js";
import { signin } from "./api/userAPI.js";

function App() {
  const [displayForm, setDisplayForm] = useState(false);
  // const [reminderTime, setReminderTime] = useState(""); (**about reminder time ** develop later**)
  const [deadLineDate, setDeadLineDate] = useState("");
  const [deadLineTime, setDeadLineTime] = useState("");
  const [tasks, setTasks] = useState([]); //all tasks recive from database
  const [customTasks, setCustomTasks] = useState([]); //all tasks we can modify theme
  const [isSignin, setIsSignin] = useState();
  const [categoryClicked, setCategoryClicked] = useState("");
  const [taskForEdit, setTaskForEdit] = useState("");

  const sideBarHandler = (context) => {
    switch (context) {
      case "new task":
        setDisplayForm((prevState) => !prevState);
        break;
      case "draft":
        setCustomTasks(tasks.filter((task) => task.category === "draft"));
        setCategoryClicked(context);
        break;
      case "today tasks":
        const today = new Date().toISOString().split("T")[0];
        setCustomTasks(tasks.filter((task) => task.deadlineDate === today));
        setCategoryClicked(context);
        break;
      case "all tasks":
        setCustomTasks(tasks.filter((task) => task.category !== "draft"));
        setCategoryClicked(context);
        break;
      case "personal":
        setCustomTasks(tasks.filter((task) => task.category === "personal"));
        setCategoryClicked(context);
        break;
      case "home":
        setCustomTasks(tasks.filter((task) => task.category === "home"));
        setCategoryClicked(context);
        break;
      case "business":
        setCustomTasks(tasks.filter((task) => task.category === "business"));
        setCategoryClicked(context);
        break;
      case "sport":
        setCustomTasks(tasks.filter((task) => task.category === "sport"));
        setCategoryClicked(context);
        break;
      case "study":
        setCustomTasks(tasks.filter((task) => task.category === "study"));
        setCategoryClicked(context);
        break;
      case "birthday":
        setCustomTasks(tasks.filter((task) => task.category === "birthday"));
        setCategoryClicked(context);
        break;
      default:
        setCustomTasks([...tasks]);
        break;
    }
  };
  const setDisplayFormHandler = () => {
    setDisplayForm((prevState) => !prevState);
  };

  // const setReminderTimeHandler = (time) => {
  //   setReminderTime(time);
  // }; //about reminder time ** develop later
  const setDeadLineDateHandler = (date) => {
    setDeadLineDate(date);
  };
  const setDeadLineTimeHandler = (time) => {
    setDeadLineTime(time);
  };
  const setIsSigninHandler = () => {
    setIsSignin((perv) => !perv);
  };
  const signinContect = {
    isSignin,
    setIsSignin: setIsSigninHandler,
  };
  const formContext = {
    displayForm,
    setDisplayForm: setDisplayFormHandler,
  };
  const timeContext = {
    // reminderTime, (**about reminder time ** develop later**)
    // setReminderTime: setReminderTimeHandler, (**about reminder time ** develop later**)
    deadLineDate,
    setDeadLineDate: setDeadLineDateHandler,
    deadLineTime,
    setDeadLineTime: setDeadLineTimeHandler,
  };
  const handleAddTask = async (taskData) => {
    await createTask(taskData);
    setTasks((prevTasks) => [...prevTasks, taskData]);
    setCustomTasks((prevTasks) => [...prevTasks, taskData]);
  };
  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setCustomTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };
  //edit handeling
  const handelEditedTask = async (editedTask) => {
    console.log("editedTask", editedTask);
    await updateTask(editedTask);
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== editedTask.id)
    );
    setCustomTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== editedTask.id)
    );
    setTasks((prevTasks) => [...prevTasks, editedTask]);
    setCustomTasks((prevTasks) => [...prevTasks, editedTask]);
  };
  const handelEditTask = async (taskId) => {
    const task = tasks.filter((task) => task.id === taskId);
    setTaskForEdit(task[0]);
  };
  useEffect(() => {
    if (!displayForm) {
      console.log("app");
      setTaskForEdit("");
      console.log("app");
    }
  }, [displayForm]);

  useEffect(() => {
    // console.log("Updated taskForEdit:", taskForEdit);
  }, [taskForEdit]);
  // get tasks in first time
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        fetchedTasks ? setTasks(fetchedTasks) : setTasks([]);
        fetchedTasks
          ? setCustomTasks(
              fetchedTasks.filter((task) => task.category !== "draft")
            )
          : setTasks([]);
      } catch (error) {
        console.error(
          "Error fetching tasks:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchTasks();
  }, []);
  const handleSignin = () => {
    console.log("signin");
    setIsSignin((perv) => !perv);
  };

  return (
    <SigninContext.Provider value={signinContect}>
      <FormContext.Provider value={formContext}>
        <TimeContext.Provider value={timeContext}>
          <div className=" pt-2 bg-slate-700">
            <NavBarComponent isSignin={handleSignin} />
            <div className=" flex ">
              <SideBarComponent onClick={sideBarHandler} />
              <TaskListComponent
                tasks={customTasks}
                deleteTask={handleDeleteTask}
                editTask={handelEditTask}
                categoryClicked={categoryClicked}
              />
              <div className={displayForm ? "" : " hidden"}>
                <AddFormComponent
                  onEditTask={handelEditedTask}
                  onAddTask={handleAddTask}
                  taskForEdit={taskForEdit}
                />
              </div>
            </div>
          </div>
        </TimeContext.Provider>
      </FormContext.Provider>
    </SigninContext.Provider>
  );
}

export default App;
