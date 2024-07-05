
import AddTodo from "./_components/AddTodo";
import ListTodos from "./_components/ListTodos";
import { trpc } from "./_trpc/client";
import { serverClient } from "./_trpc/server";

export default async function Home() {

  const hello = await serverClient.allTodos();


  return (
    <div className="flex items-center pt-4 flex-col">
      <AddTodo />
      <ListTodos initialTodos={hello}/>
    </div>
  )
}
