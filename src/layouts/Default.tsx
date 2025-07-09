import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <main className="min-h-screen px-[88px] py-[70px]">
      <div className="max-w-7xl mx-auto w-full">
        <Outlet />
      </div>
    </main>
  );
};

export { DefaultLayout };
