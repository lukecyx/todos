import { hashPassword } from "~/auth/auth";
import { db } from ".";
import { faker } from "@faker-js/faker";

/**
 * If there are already users in the db, then the db is seeded.
 */
async function checkAlreadySeeded() {
  const users = await db.user.findFirst();
  if (!users) {
    return false;
  }

  return true;
}

async function seed() {
  return await db.user.create({
    data: {
      email: faker.internet.email(),
      password: hashPassword("SecretPassword1"),
      todos: {
        create: [
          { title: faker.string.uuid(), description: faker.lorem.lines(1) },
          { title: faker.string.uuid(), description: faker.lorem.lines(1) },
          { title: faker.string.uuid(), description: faker.lorem.lines(1) },
        ],
      },
    },
    include: {
      todos: true,
    },
  });
}

async function main() {
  const alreadySeeded = await checkAlreadySeeded();
  if (alreadySeeded) {
    console.log("**db already seeded**");
    return;
  }

  await seed();

  console.log("Seed completed");
}

main();
