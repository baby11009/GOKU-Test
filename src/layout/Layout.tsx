import { Outlet, useLocation } from "react-router";
import { lazy } from "react";
import LoadingScreen from "@/components/loader/LoadingScreen";
const Navbar = lazy(() => import("@/components/navbar/Navbar"));

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div className='w-screen min-h-screen'>
      <div className='fixed inset-0 -z-1 bg-secondary'>
        <img
          src='/images/bgLoading.jpg'
          alt='bgImage'
          className='object-cover absolute size-full'
        />
      </div>
      <LoadingScreen activePathName={pathname} />
      <Outlet />
      {pathname !== "/" && <Navbar activePathName={pathname} />}
    </div>
  );
};
export default Layout;
