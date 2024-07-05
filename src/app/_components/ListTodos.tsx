"use client";

import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/server";

type Props = {
  initialTodos: Awaited<ReturnType<(typeof serverClient)["allTodos"]>>;
};

export default function ListTodos({ initialTodos }: Props) {
  const todos = trpc.allTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const doneTodo = trpc.doneTodo.useMutation();

  async function handleDoneTodo(id: number, done: number) {
    await doneTodo.mutate(
      { id, done },
      {
        onSuccess: (data, variable) => {
          todos.refetch();
        },
      }
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 pt-2 px-3 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-200 mb-6 text-center">
        All Todos
      </h2>
      <ul className="space-y-4">
        {todos.data?.map((todo) => (
          <li
            key={todo.id}
            className={`p-4 border rounded-lg flex justify-between items-center ${
              todo.done
                ? "bg-green-900 border-green-700"
                : "bg-red-900 border-red-700"
            }`}
          >
            <input
              onChange={() => handleDoneTodo(todo.id, todo.done ? 0 : 1)}
              value={todo.done}
              checked={todo.done ? true : false}
              type="checkbox"
            />
            <span className="text-lg font-medium text-gray-200">
              {todo.todo}
            </span>
            <span
              className={`px-2 py-1 text-sm font-semibold rounded-full ${
                todo.done
                  ? "text-green-300 bg-green-800"
                  : "text-red-300 bg-red-800"
              }`}
            >
              {todo.done ? "Done" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
