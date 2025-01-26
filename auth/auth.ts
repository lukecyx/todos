import bcrypt from "bcrypt";
import jwt, { TokenExpiredError } from "jsonwebtoken";

import { cookies } from "next/headers";
import { USER_COOKIE_NAME } from "~/constants";
import { type Cookie } from "~/types/auth";

import db from "~/db/db";
import { redirect } from "next/navigation";

export async function registerUser(email: string, password: string) {
  const userExists = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  const newUser = await db.user.create({
    data: {
      email,
      password: hashPassword(password),
    },
  });

  // eslint-disable-next-line
  const { password: _, ...retUser } = newUser;

  return {
    user: retUser,
    token: createToken(newUser.id),
  };
}

export async function loginUser(email: string, password: string) {
  const userExists = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!userExists) {
    throw new Error("User does not exist");
  }

  const match = await comparePasswords(password, userExists.password);

  if (!match) {
    throw new Error("User does not exist");
  }

  // eslint-disable-next-line
  const { password: _, ...retUser } = userExists;
  return {
    user: retUser,
    token: createToken(userExists.id),
  };
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

function createToken(userId: string) {
  return jwt.sign(
    { user: userId },
    process.env.JWT_SECRET_KEY as unknown as string,
    {
      expiresIn: "1h",
    },
  );
}

function comparePasswords(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

async function getUserFromToken(token: Cookie) {
  if (!token) return;

  let payload;
  // TODO: Handle this properly.
  try {
    payload = jwt.verify(
      token.value,
      process.env.JWT_SECRET_KEY as unknown as string,
    ) as { id: string };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      redirect("/login");
    }
  }

  return await db.user.findFirst({
    where: {
      id: payload?.id,
    },
  });
}

export async function isUserLoggedIn() {
  return !!(await cookies()).get(USER_COOKIE_NAME);
}

export async function getCurrentUser() {
  const userToken = (await cookies()).get(USER_COOKIE_NAME) as Cookie;

  if (!userToken) {
    redirect("/login");
  }

  const userFromToken = await getUserFromToken(userToken);
  if (!userFromToken) {
    redirect("login");
  }

  //eslint-disable-next-line
  const { password: _, ...retUser } = userFromToken;

  return retUser;
}
