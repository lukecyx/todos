function TodoForm() {
  async function onSubmit(formData: FormData) {
    "use server";

    const t = Object.fromEntries(formData);
    console.log("t", t);
    // const result = api.todo.create.useMutation();
    // result.mutateAsync();

    // console.log(result);
  }

  // TODO: Should be for authed users only.

  return (
    <div className="lg: flex w-2/3 flex-col border bg-slate-50 shadow-md lg:w-1/3">
      <form className="p-4" action={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="title">
                Title
              </label>
              <input
                className="w-full rounded-sm border border-gray-300 bg-slate-100 font-bold text-gray-800 placeholder:text-gray-600  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                name="title"
                id="title"
                type="text"
                required
                placeholder="Wash the dishes"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="description">
                Description
              </label>
              <input
                className="w-full rounded-sm border  border-gray-300 bg-slate-100 text-sm text-gray-800 placeholder:text-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                name="description"
                id="description"
                type="text"
                placeholder="Description"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-end space-x-2">
              <button
                className="w-28 rounded-sm border bg-gray-200 p-2 font-semibold text-gray-800 shadow-sm hover:bg-gray-400 focus:border-gray-400 focus:outline-gray-400 focus:ring-4 focus:ring-gray-400"
                type="button"
              >
                Cancel
              </button>
              <button
                className="w-28 rounded-sm bg-indigo-500 p-2 font-semibold text-white shadow-sm hover:bg-indigo-700 focus:border-indigo-700 focus:outline-indigo-700 focus:ring-4 focus:ring-indigo-700"
                type="submit"
              >
                Add task
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
