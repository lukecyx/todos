function TodosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container lg:w-2/3">
      <div className="mb-8 mt-8">{children}</div>
    </div>
  );
}

export default TodosLayout;
