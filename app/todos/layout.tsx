function TodosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container lg:w-2/3">
      <div>{children}</div>
    </div>
  );
}

export default TodosLayout;
