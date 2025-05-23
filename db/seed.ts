import { faker } from "@faker-js/faker";

import { hashPassword } from "~/auth/auth";

import { db } from ".";

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

const TODO_TITLES = [
  "Buy Groceries",
  "Schedule dentist appointment",
  "Reply to Sarah's email about the project",
];

async function seed() {
  return await db.user.create({
    data: {
      email: faker.internet.email(),
      password: hashPassword("SecretPassword1"),
      todos: {
        create: [
          {
            title: TODO_TITLES[Math.floor(Math.random() * TODO_TITLES.length)],
            description: faker.lorem.lines(1),
            dueDate: faker.date.recent(),
          },
          {
            title: TODO_TITLES[Math.floor(Math.random() * TODO_TITLES.length)],
            description: faker.lorem.lines(1),
            dueDate: faker.date.recent(),
          },
          {
            title: TODO_TITLES[Math.floor(Math.random() * TODO_TITLES.length)],
            description: faker.lorem.lines(1),
            dueDate: faker.date.soon(),
          },
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
