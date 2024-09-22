import { useRoutes } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
const User = lazy(() => import("../routes/user/User"));
const Auth = lazy(() => import("../routes/auth/Auth"));
const Login = lazy(() => import("../routes/auth/login/Login"));
const Signup = lazy(() => import("../routes/auth/signup/Signup"));
const Dashboard = lazy(() => import("../routes/dashboard/Dashboard"));
import { Spin } from 'antd';
const  SinglePage = lazy(() => import("../routes/single/SinglePage"));

const SuspenseWithDelay = ({ children }) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false); 
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={showLoading ? <Spin size="large" className="flex justify-center items-center h-screen w-screen w-full h-full " /> : null}>
      {children}
    </Suspense>
  );
};

const RouteController = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <SuspenseWithDelay>
          <User />
        </SuspenseWithDelay>
      ),
    },
    {
      path: "/auth",
      element: (
        <SuspenseWithDelay>
          <Auth />
        </SuspenseWithDelay>
      ),
      children: [
        {
          path: "/auth/login",
          element: (
            <SuspenseWithDelay>
              <Login />
            </SuspenseWithDelay>
          ),
        },
        {
          path: "/auth/signup",
          element: (
            <SuspenseWithDelay>
              <Signup />
            </SuspenseWithDelay>
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <SuspenseWithDelay>
          <Dashboard />
        </SuspenseWithDelay>
      ),
    },
    {
      path: "/single/:id",
      element: (
        <SuspenseWithDelay>
          <SinglePage />
        </SuspenseWithDelay>
      ),
    },
    {
      path: "*",
      element: <div>404 - Not Found</div>,
      errorElement: <div>404 - Not Found</div>,
      loader: () => {
        throw new Response("", {
          status: 404,
          statusText: "Not Found",
        });
      },
    },
  ]);
};

export default RouteController;
