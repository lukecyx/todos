"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { registerUser } from "~/auth/auth";
import { registerUserSchema } from "~/schemas/auth/register";
import { USER_COOKIE_NAME } from "~/constants";

export async function registerAction(_: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error("No formData");
  }

  const userObj = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = registerUserSchema.safeParse(userObj);

  if (!result.success) {
    return result.error.formErrors;
  }

  const { token } = await registerUser(userObj.email, userObj.password);

  (await cookies()).set(USER_COOKIE_NAME, token);

  redirect("/");
}
