import clsx from "clsx";
import { useState } from "react";
import OpenEyeIcon from "../icons/Eye";
import ClosedEyeSlashIcon from "../icons/EyeSlash";

type PasswordInputProps = {
  label: string;
  inputName: string;
  errors?: string[];
};

function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div>
      <label className="mb-1 text-sm font-bold" htmlFor="password">
        {props.label}
      </label>
      <div className="relative">
        <input
          name={props.inputName}
          className={clsx(
            "w-full rounded border-gray-300 bg-slate-50 pr-10 shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500",
            {
              "border border-red-500 outline-red-500 focus:border-red-500 focus:ring-red-500":
                props.errors,
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
      {props.errors &&
        props.errors.map((error, idx) => (
          <p className="text-sm text-red-500" key={idx}>
            {error}
          </p>
        ))}
    </div>
  );
}

export default PasswordInput;
