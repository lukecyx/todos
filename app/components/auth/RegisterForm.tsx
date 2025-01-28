"use client";

import { useActionState } from "react";

import { registerAction } from "~/actions/auth/register";

import PasswordInput from "./PasswordInput";

function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, null);
  const invalidEmail = state?.fieldErrors?.email;
  const invalidPassword = state?.fieldErrors?.password;
  const invalidConfirmPassword = state?.fieldErrors?.confirmPassword;
  const formErrors = state?.formErrors;

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
            <PasswordInput
              label="Password"
              inputName="password"
              errors={invalidPassword}
            />
            <PasswordInput
              label="Confirm Password"
              inputName="confirmPassword"
              errors={invalidConfirmPassword}
            />
          </div>

          {formErrors &&
            formErrors.map((error, idx) => (
              <p
                className="flex justify-center pt-4 text-sm text-red-500"
                key={idx}
              >
                {error}
              </p>
            ))}
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
