import { z } from "zod";

import { createTodoSchema } from "~/schemas/todos";

// don't do this
export type createTodo = z.infer<typeof createTodoSchema>;
