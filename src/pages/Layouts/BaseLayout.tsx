import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <>
      <h1>Test Task</h1>
      <Outlet />
      <footer>Footer</footer>
    </>
  );
}
