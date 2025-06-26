import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigation } from "@remix-run/react";
import { useRef } from "react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { getTodos, createTodo, updateTodo, deleteTodo, type Todo } from "~/services/api";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo List" },
    { name: "description", content: "A minimal todo list application" },
  ];
};

export async function loader() {
  const todos = await getTodos();
  return json({ todos });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action");

  switch (action) {
    case "create": {
      const title = formData.get("title") as string;
      if (!title.trim()) throw new Error("Title is required");
      const todo = await createTodo(title);
      return json({ todo });
    }
    case "toggle": {
      const id = formData.get("id") as string;
      const completed = formData.get("completed") === "true";
      const todo = await updateTodo(id, { completed: !completed });
      return json({ todo });
    }
    case "delete": {
      const id = formData.get("id") as string;
      await deleteTodo(id);
      return json({ success: true });
    }
    default:
      throw new Error("Invalid action");
  }
}

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  const isAdding = navigation.formData?.get("_action") === "create";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(e.currentTarget, { method: "post" });
    formRef.current?.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Todo List</h1>
        
        {/* Add Todo Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              name="title"
              placeholder="Add a new todo..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none"
              disabled={isAdding}
              required
            />
            <input type="hidden" name="_action" value="create" />
            <button
              type="submit"
              disabled={isAdding}
              className="rounded-lg bg-teal-500 px-6 py-2 font-semibold text-white hover:bg-teal-600 focus:outline-none disabled:opacity-50"
            >
              {isAdding ? "Adding..." : "Add"}
            </button>
          </div>
        </form>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <form method="post">
                  <input type="hidden" name="_action" value="toggle" />
                  <input type="hidden" name="id" value={todo.id} />
                  <input type="hidden" name="completed" value={String(todo.completed)} />
                  <button
                    type="submit"
                    className={`h-5 w-5 rounded border ${
                      todo.completed
                        ? "border-teal-500 bg-teal-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {todo.completed && (
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                </form>
                <span
                  className={`text-gray-800 ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <form method="post">
                <input type="hidden" name="_action" value="delete" />
                <input type="hidden" name="id" value={todo.id} />
                <button
                  type="submit"
                  className="text-gray-500 hover:text-red-500 focus:outline-none"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
