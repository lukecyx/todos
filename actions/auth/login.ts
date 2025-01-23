"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginUser } from "~/auth/auth";

import { USER_COOKIE_NAME } from "~/constants";
import { loginUserSchema } from "~/schemas/auth/register";

export async function loginAction(_: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error("No formData");
  }

  const userObj = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = loginUserSchema.safeParse(userObj);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    } as const;
  }

  try {
    const { token } = await loginUser(userObj.email, userObj.password);
    (await cookies()).set(USER_COOKIE_NAME, token);
  } catch (error) {
    const err = error as Error;
    console.error(err.stack ?? err.message);
    return { formErrors: ["Login failed"] };
  }

  redirect("/todos");
}
