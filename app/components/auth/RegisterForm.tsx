"use client";

import { useActionState, useState } from "react";
import { clsx } from "clsx";

import { registerAction } from "~/actions/auth/register";

import OpenEyeIcon from "~/app/components/icons/Eye";
import ClosedEyeSlashIcon from "../icons/EyeSlash";

function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, null);
  const invalidPassword = state?.fieldErrors?.password;
  const invalidEmail = state?.fieldErrors?.email;
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="w-full flex-col border bg-slate-100 p-4 lg:flex  lg:w-2/3">
      <form action={action}>
        <div className="flex flex-col space-y-4 font-bold">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-bold" htmlFor="email">
                Email address
              </label>
              <input
                className="rounded border-gray-300 bg-slate-50 shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500  "
                name="email"
                type="email"
                required
              />
              {invalidEmail &&
                invalidEmail.map((error, idx) => (
                  <p className="text-sm text-red-500" key={idx}>
                    {error}
                  </p>
                ))}
            </div>
            <div>
              <label className="mb-1 text-sm font-bold" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  className={clsx(
                    "w-full rounded border-gray-300 bg-slate-50 pr-10 shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500",
                    {
                      "border border-red-500 outline-red-500 focus:border-red-500 focus:ring-red-500":
                        invalidPassword,
                    },
                  )}
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  pattern="^(?=.*[\d@£$!%*?&])[A-Za-z\d@£$!%*?&]{8,32}$"
                  title="Password must be 8-32 characters long and include at least one number or one special character (@, £, $, !, %, *, ?, &)."
                  autoComplete="current-password"
                  required
                />
                {showPassword ? (
                  <OpenEyeIcon
                    type="button"
                    className="absolute right-3 top-1/2  -translate-y-1/2 transform hover:cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <ClosedEyeSlashIcon
                    type="button"
                    className="absolute right-3 top-1/2  -translate-y-1/2 transform hover:cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              {invalidPassword &&
                invalidPassword.map((error, idx) => (
                  <p className="text-sm text-red-500" key={idx}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <button
              className="w-full rounded bg-indigo-500 p-2 font-semibold text-white shadow-sm hover:bg-indigo-700 focus:border-indigo-700 focus:outline-indigo-700 focus:ring-4 focus:ring-indigo-700"
              type="submit"
            >
              {pending ? "Loading..." : "Register"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
