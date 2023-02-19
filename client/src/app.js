import React from "react";
import HeaderReg from "./register/headerreg";
import BoxReg from "./register/boxreg";
import Header from "./start/header";
import Box from "./start/box";
import Boxlogin from "./login/boxlogin";
import Headerlogin from "./login/headerlogin";
import Boxdash from "./dashboard/boxdash";
import Headerdash from "./dashboard/headerdash";
import Error from "./error";
import Headerforget from "./forgetPassword/headerforget";
import Boxforget from "./forgetPassword/boxforget";
import Headerreset from "./reset/headerreset";
import Boxreset from "./reset/boxreset";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        <Box />
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <div>
        <Error />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <HeaderReg />
        <BoxReg />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Headerlogin />
        <Boxlogin />
      </div>
    ),
  },
  {
    path: "/dash",
    element: (
      <div>
        <Headerdash />
        <Boxdash />
      </div>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <div>
        <Headerforget />
        <Boxforget />
      </div>
    ),
  },
  {
    path: "/forgetpassword/:id/:token",
    element: (
      <div>
        <Headerreset />
        <Boxreset />
      </div>
    ),
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
