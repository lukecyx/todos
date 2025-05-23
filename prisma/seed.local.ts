import { faker } from "@faker-js/faker";

import { hashPassword } from "~/auth/auth";
import { db } from "~/db";
import { TODO_CATEGORIES } from "~/types/todo";

const TODO_TITLES = [
  "Buy Groceries",
  "Schedule dentist appointment",
  "Reply to Sarah's email about the project",
];

async function main() {
  const categories = await Promise.all(
    TODO_CATEGORIES.map(async (category) => {
      return await db.category.upsert({
        where: {
          name: category,
        },
        update: {},
        create: {
          name: category,
        },
      });
    }),
  );

  const emails = Array.from({ length: 3 }, () => faker.internet.email());
  emails.forEach(async (email) => {
    const coinFlip = Math.floor(Math.random() * 2);
    const maybeRandomCategory = coinFlip
      ? categories[Math.floor(Math.random() * categories.length)]
      : null;

    await db.user.upsert({
      where: {
        email,
      },
      update: {},
      create: {
        email,
        password: hashPassword("SecretPassword1"),
        todos: {
          create: [
            {
              title:
                TODO_TITLES[Math.floor(Math.random() * TODO_TITLES.length)],
              description: faker.lorem.lines(1),
              dueDate: faker.date.recent(),
              categoryId: maybeRandomCategory?.id ?? null,
            },
          ],
        },
      },
    });
  });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
