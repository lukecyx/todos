"use client";

import { Todo as TodoPrisma } from "@prisma/client";
import { useState } from "react";

import { completeTodo } from "~/actions/todos/completeTodo";

import CheckCircleIcon from "../icons/CheckCircle";

import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: TodoPrisma[];
  title: string;
};
export default function TodoList(props: TodoListProps) {
  function handleOnChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;

    if (!isChecked) {
      return;
    }

    completeTodo(e.target.value);
    setTodos(todos.filter((todo) => todo.id !== e.target.value));
  }

  const [todos, setTodos] = useState(props.todos);
  return (
    <div>
      {todos.length ? (
        <div>
          <h1 className="text-2xl font-bold">{props.title}</h1>
          <div className="flex">
            <div className="flex flex-row items-center">
              <CheckCircleIcon className="h-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                {props.todos.length} tasks
              </span>
            </div>
          </div>
          <div>
            {/* TODO: handle todos empty state */}
            {/* TODO: When a new todo is added, this should add to the list */}
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description ?? null}
                dueDate={todo.dueDate}
                deleteHandler={handleOnChangeCheckbox}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
