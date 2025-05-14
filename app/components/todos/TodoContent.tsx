"use client";

import { createId } from "@paralleldrive/cuid2";
import { DateTime } from "luxon";
import { useState, useOptimistic, useTransition } from "react";

import { completeTodo } from "~/actions/todos/completeTodo";
import { submitTodo } from "~/actions/todos/submitTodo";
import { SerialisedTodo } from "~/types/todo";
import { serialiseTodo } from "~/utils/serialiseTodo";

import PlusIcon from "../icons/Plus";

import TodoForm from "./CreateTodoForm";
import TodoList from "./TodoList";

type TodoContentProps = {
  iniitalTodayTodos: SerialisedTodo[];
  initialOverdueTodos: SerialisedTodo[];
};

export default function TodoContent(props: TodoContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [todaysTodos, setTodaysTodos] = useState<SerialisedTodo[]>(
    props.iniitalTodayTodos,
  );
  const [overdueTodos, setOverdueTodos] = useState<SerialisedTodo[]>(
    props.initialOverdueTodos,
  );

  const [isPending, startTransition] = useTransition(); // eslint-disable-line
  const [optimisticTodaysTodos, addOptimisticTodayTodo] = useOptimistic(
    todaysTodos,
    (state: SerialisedTodo[], newTodo: SerialisedTodo) => [...state, newTodo],
  );

  function handleShowTodosForm() {
    setIsVisible(!isVisible);
  }

  async function postTodo(formData: FormData) {
    startTransition(async () => {
      const now = new Date().toISOString();
      const newTodo: OptimisticTodo = {
        id: createId(), // temporary ID
        title: (formData.get("title") as string) + "(Saving...)",
        dueDate: formData.get("dueDate") as string,
        description: formData.get("description") as string,
        completed: false,
        createdAt: now,
        userId: "otimististicUser",
      };

      addOptimisticTodayTodo(newTodo);

      const result = await submitTodo({}, formData);
      if (!result.success) {
      } else {
        setTodaysTodos((prev) => [...prev, serialiseTodo(result.data)]);
      }
    });
  }

  function handleAddTodo(formData: FormData) {
    postTodo(formData);
  }

  async function handleOnChangeCheckbox(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const isChecked = e.target.checked;

    if (!isChecked) {
      return;
    }

    const completedTodo = await completeTodo(e.target.value);
    if (DateTime.fromJSDate(completedTodo.dueDate) < DateTime.now()) {
      setOverdueTodos(
        overdueTodos.filter((todo) => todo.id !== e.target.value),
      );
    }

    setTodaysTodos(todaysTodos.filter((todo) => todo.id !== e.target.value));
  }

  return (
    <div className="ml-6 mt-4">
      <TodoList
        title="Overdue"
        todos={overdueTodos}
        handleTodoDelete={handleOnChangeCheckbox}
      />
      <TodoList
        title="Today"
        todos={optimisticTodaysTodos}
        handleTodoDelete={handleOnChangeCheckbox}
      />

      {!isVisible ? (
        <button
          type="button"
          className="flex flex-row items-center  text-gray-600 hover:bg-slate-300 hover:text-gray-800 pr-1.5 pt-0.5 pb-0.5"
          onClick={handleShowTodosForm}
        >
          <PlusIcon className="h-4" />
          <span>Add Task</span>
        </button>
      ) : (
        <TodoForm
          closeHandler={handleShowTodosForm}
          addTodoHandler={handleAddTodo}
        />
      )}
    </div>
  );
}
