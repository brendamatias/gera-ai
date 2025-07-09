import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <main className="min-h-screen md:px-[88px] md:py-[70px] px-9 py-11">
      <div className="max-w-7xl mx-auto w-full">
        <Outlet />
      </div>
    </main>
  );
};

export { DefaultLayout };
