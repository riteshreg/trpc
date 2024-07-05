"use client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { trpc } from "../_trpc/client";

export default function Page() {
  const addTodo = trpc.addTodo.useMutation();
  const queryClient = useQueryClient();

  async function addTodoHandler(formData: FormData) {
    const todo = formData.get("todo") as string;
    if (!todo) return;

    addTodo.mutate(todo, {
      onSuccess: () => {
        queryClient.refetchQueries({queryKey:getQueryKey(trpc.allTodos)})
      }
    });
  }

  return (
    <form action={addTodoHandler} className="space-x-3">
      <input
        id="todo"
        className="bg-purple-700 p-2 rounded-md"
        type="text"
        placeholder="Your Todo"
        name="todo"
      />
      <button
        disabled={addTodo.isPending}
        className="bg-purple-900 px-4 py-2 rounded-md"
        type="submit"
      >
        {addTodo.isPending ? "Loading" : "Submit"}
      </button>
    </form>
  );
}
