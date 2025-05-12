"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { registerUser } from "~/auth/auth";
import { USER_COOKIE_NAME } from "~/constants";
import { registerUserSchema } from "~/schemas/auth/register";

export async function registerAction(_: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error("No formData");
  }

  const formDataAsObj = Object.fromEntries(formData.entries());

  if (formDataAsObj.password !== formDataAsObj.confirmPassword) {
    return {
      fieldErrors: {
        password: ["Passwords do not match"],
        confirmPassword: ["Passwords do not match"],
      },
    };
  }

  const result = registerUserSchema.safeParse(formDataAsObj);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const { token } = await registerUser(
      result.data.email,
      result.data.password,
    );
    (await cookies()).set(USER_COOKIE_NAME, token);
  } catch (error) {
    const err = error as Error;
    console.error(err.stack ?? err.message);

    return { formErrors: ["Sign up failed"] };
  }

  redirect("/todos");
}
