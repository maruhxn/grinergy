"use client";

import { useFormState } from "react-dom";
import { login } from "./actions";

export default function AdminLoginPage() {
  const [state, action] = useFormState(login, null);
  return (
    <div className="mt-[16.55vh] w-full">
      <h1 className="text-[10vw] lg:text-[3vw] text-center font-bold font-en mb-[1.5625rem]">
        Login
      </h1>
      <form
        action={action}
        className="w-[70vw] lg:w-[50vw] flex flex-col mx-auto p-[20px] border-[#ccc] border-[1px] gap-[10px]"
      >
        <label
          htmlFor="password"
          className="text-[0.8rem] lg:text-[0.9375rem] font-en"
        >
          Password
        </label>
        <div className="flex flex-col mb-[10px] gap-2">
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            className="w-full p-[10px]  rounded-[5px] border-[#ccc] border-[1px]"
          />
          {state?.fieldErrors.password?.map((error, index) => (
            <span
              className="text-red-500 font-medium font-kr text-sm"
              key={index}
            >
              {error}
            </span>
          ))}
        </div>
        <button
          className="font-en bg-black text-white text-[0.8rem] lg:text-[1rem] py-[0.3rem] px-[0.8rem] lg:py-[0.5rem] lg:px-[1rem] border-0 hover:bg-white hover:text-black transition-all"
          type="submit"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
