import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import ButtonComponent from "./ButtonComponent.js";
import InputComponent from "./InputComponent.js";
import { signin } from "../api/userAPI.js";

function NavBarComponent({ isSignin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayAccountModal, setDisplayAccountModal] = useState(false);
  const [displaySigninModal, setDisplaySigninModal] = useState(false);
  const accountToggle = () => {
    setDisplayAccountModal((perv) => !perv);
  };

  const signinHandler = async () => {
    const signinData = {
      username: username,
      password: password,
    };
    const token = await signin(signinData);
    const decodedToken = jwtDecode(token);
    const dataToken = {
      id: decodedToken.id,
      name: decodedToken.name,
      username: decodedToken.username,
      jwt: token,
    };
    localStorage.setItem("token", JSON.stringify(dataToken));
    console.log("token==>", decodedToken);
    setDisplaySigninModal((perv) => !perv);
  };
  const signinToggle = () => {
    setDisplaySigninModal((perv) => !perv);
  };
  return (
    <div className=" flex justify-between py-3 px-10 mx-2 bg-zinc-100 rounded-lg ">
      {/* -------signin and signout part---------- */}
      <div
        className={`${
          displaySigninModal ? "" : "hidden"
        } fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center`}
      >
        <div className="flex flex-col gap-2 bg-white rounded-lg border m-6 p-6 w-80">
          <p className="text-lg font-bold">ورود به حساب کاربری</p>
          <InputComponent
            context="نام کاربری"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            classNameAdd=" w-full text-right p-2 "
          />
          <InputComponent
            context="رمز عبور"
            name="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            classNameAdd=" w-full text-right mb-2 p-2 "
          />
          <div className="flex justify-center gap-4">
            <ButtonComponent
              className="action"
              context="انصراف"
              onClick={signinToggle}
            />
            <ButtonComponent
              className="action"
              context="ورود به کاربری"
              onClick={async () => {
                await signinHandler();
                isSignin();
              }}
            />
          </div>
        </div>
      </div>
      {/* -------account handle part--------- */}
      <div
        className={`${
          displayAccountModal ? "" : "hidden"
        } fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
      >
        <div className="flex flex-col gap-2 bg-white rounded-lg border m-6 p-6 w-80">
          <p className="text-lg font-bold">فرم ثبت نام</p>
          <InputComponent
            context="نام کاربری"
            name="username"
            type="text"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            classNameAdd=" w-full text-right p-2 "
          />
          <InputComponent
            context="رمز عبور"
            name="password"
            type="text"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            classNameAdd=" w-full text-right p-2 "
          />
          <InputComponent
            context="تکرار رمز عبور"
            name="password"
            type="text"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            classNameAdd=" w-full text-right mb-2 p-2 "
          />
          <div className="flex justify-center gap-4">
            <ButtonComponent
              className="action"
              context="انصراف"
              onClick={accountToggle}
            />
            <ButtonComponent
              className="action"
              context="ورود به کاربری"
              onClick={accountToggle}
            />
          </div>
        </div>
      </div>
      {/* -----------------navbar------------------ */}
      <div>sina amini</div>
      <div className="flex gap-5 ">
        <ButtonComponent
          onClick={signinToggle}
          context="ورود به کاربری" //"خروج از کاربری"
          icon="login" //"logout"
          className="sidebar"
          classImgAdd=" w-5 h-5 ml-1"
          classNameAdd=" text-slate-800 text-sm"
        />
        <ButtonComponent
          onClick={accountToggle}
          context="ثبت نام" //"حساب کاربری"
          icon="signup" //"account"
          className="sidebar"
          classImgAdd=" w-5 h-5 ml-1"
          classNameAdd=" text-slate-800 text-sm"
        />
      </div>
    </div>
  );
}
export default NavBarComponent;
