import { db } from "~/db";

export default async function getAllCategories() {
  return await db.category.findMany({});
}
