function authLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container md:w-5/6">
      <div>{children}</div>
    </div>
  );
}

export default authLayout;
