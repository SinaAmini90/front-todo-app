import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ButtonComponent from "./ButtonComponent.js";
import InputComponent from "./InputComponent.js";
import { createUser, signin } from "../api/userAPI.js";

function NavBarComponent({ isSignin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayRegisterModal, setDisplayRegisterModal] = useState(false);
  const [displayAccountModal, setDisplayAccountModal] = useState(false);
  const [displaySigninModal, setDisplaySigninModal] = useState(false);
  const [displaySignoutModal, setDisplaySignoutModal] = useState(false);
  const [isSigninForNav, setIsSigninForNav] = useState(false);
  const [signinModalText, setSigninModalText] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const tokenStorage = JSON.parse(localStorage.getItem("token"));
  const familyName = tokenStorage ? tokenStorage.name : "";
  const bearerToken = tokenStorage ? `Bearer ${tokenStorage.jwt}` : "";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setDisplaySigninModal(false);
      setIsSigninForNav(true);
    }
  }, []);

  const registerToggle = () => {
    setDisplayRegisterModal((perv) => !perv);
  };
  const accountToggle = () => {
    setDisplayAccountModal((perv) => !perv);
  };
  const signinToggle = () => {
    setDisplaySigninModal((perv) => !perv);
  };
  const signoutToggle = () => {
    setDisplaySignoutModal((perv) => !perv);
  };

  const signinHandler = async () => {
    setSigninModalText("در حال بررسی اطلاعات...");
    const signinData = {
      username: username,
      password: password,
    };
    try {
      const token = await signin(signinData);
      const decodedToken = jwtDecode(token);
      const dataToken = {
        id: decodedToken.id,
        name: decodedToken.name,
        username: decodedToken.username,
        jwt: token,
      };
      localStorage.setItem("token", JSON.stringify(dataToken));
      window.location.reload();
    } catch (error) {
      setSigninModalText("نام کاربری یا رمز عبور اشتباه است");
      console.error("Error loginig user in:", error);
    }
  };

  const signoutHandler = async () => {
    localStorage.removeItem("token");
    setDisplaySignoutModal(false);
    setIsSigninForNav(false);
    window.location.reload();
  };

  const registerHandler = async () => {
    if (phonenumber.length !== 11) {
      return setSigninModalText("شماره تماس را به صورت صحیح وارد کنید.");
    }
    if (password !== repeatPassword) {
      return setSigninModalText("رمز را به صورت صحیح وارد کنید.");
    }
    setSigninModalText("در حال بررسی اطلاعات...");

    const regData = {
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      email: email,
      username: username,
      password: password,
    };
    try {
      const response = await createUser(regData);
      if (response.success) {
        signinHandler();
      } else {
        setSigninModalText("ثبت نام ناموفق بود، لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      setSigninModalText("خطا در ثبت نام، لطفاً دوباره تلاش کنید.");
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className=" flex justify-between py-3 px-10 mx-2 bg-zinc-100 rounded-lg ">
      {/* -----------------navbar------------------ */}
      <div className="flex gap-5 w-full justify-end ">
        <ButtonComponent
          onClick={signinToggle}
          context="ورود به کاربری"
          icon="login"
          className="sidebar"
          classImgAdd=" w-5 h-5 ml-1"
          classNameAdd={` ${
            isSigninForNav ? "hidden" : ""
          } text-slate-800 text-sm`}
        />
        <ButtonComponent
          onClick={registerToggle}
          context="ثبت نام"
          icon="signup"
          className="sidebar"
          classImgAdd=" w-5 h-5 ml-1"
          classNameAdd={` ${
            isSigninForNav ? "hidden" : ""
          } text-slate-800 text-sm`}
        />
        <ButtonComponent
          onClick={signoutToggle}
          context="خروج از کاربری"
          icon="logout"
          className="sidebar"
          classImgAdd=" w-5 h-5 ml-1"
          classNameAdd={` ${
            isSigninForNav ? "" : "hidden"
          } text-slate-800 text-sm`}
        />
        <ButtonComponent
          onClick={accountToggle}
          context={familyName ? familyName : "حساب کاربری"}
          icon="account"
          className="sidebar"
          classImgAdd=" w-5 h-5 ml-1"
          classNameAdd={` ${
            isSigninForNav ? "" : "hidden"
          } text-slate-800 text-sm`}
        />
      </div>
      {/* -------signin modal part---------- */}
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
          <p className="">{signinModalText}</p>
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
      {/* -------signout part modal---------- */}
      <div
        className={`${
          displaySignoutModal ? "" : "hidden"
        } fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center`}
      >
        <div className="flex flex-col gap-2 bg-white rounded-lg border m-6 p-6 w-80">
          <p className="text-lg font-bold">
            آیا قصد خروج از حساب خود را دارید؟
          </p>
          <div className="flex justify-center gap-4">
            <ButtonComponent
              className="action"
              context="انصراف"
              onClick={signoutToggle}
            />
            <ButtonComponent
              className="action"
              context="خروج از کاربری"
              onClick={async () => {
                await signoutHandler();
                isSignin();
              }}
            />
          </div>
        </div>
      </div>
      {/* -------register handle part--------- */}
      <div
        className={`${
          displayRegisterModal ? "" : "hidden"
        } fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
      >
        <div className="flex flex-col gap-2 bg-white rounded-lg border m-6 p-6 w-80">
          <p className="text-lg font-bold">فرم ثبت نام</p>
          <fieldset className=" p-2 flex flex-col gap-1 border border-1 rounded-lg border-emerald-500">
            <legend className=" text-sm italic">
              مشخصات خود را وارد کنید (اختیاری):
            </legend>
            <InputComponent
              context="نام"
              name="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              classNameAdd=" w-full text-right p-2 "
            />
            <InputComponent
              context="نام خانوادگی"
              name="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              classNameAdd=" w-full text-right p-2 "
            />
            <InputComponent
              context="شماره تماس"
              name="phonenumber"
              type="text"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              classNameAdd=" w-full text-right p-2 "
            />
            <InputComponent
              context="ایمیل"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              classNameAdd=" w-full text-right p-2 "
            />
          </fieldset>
          <fieldset className=" p-2  flex flex-col gap-1 border border-1 rounded-lg border-amber-500">
            <legend className=" text-sm italic">
              {" "}
              نام کاربری و رمز خود را انتخاب کنید (اجباری):
            </legend>
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
              classNameAdd=" w-full text-right p-2 "
            />
            <InputComponent
              context="تکرار رمز عبور"
              name="repeatPassword"
              type="text"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              classNameAdd=" w-full text-right mb-2 p-2 "
            />
          </fieldset>
          <p className="">{signinModalText}</p>

          <div className="flex justify-center gap-4">
            <ButtonComponent
              className="action"
              context="انصراف"
              onClick={registerToggle}
            />
            <ButtonComponent
              className="action"
              context="ثبت نام"
              onClick={registerHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavBarComponent;
