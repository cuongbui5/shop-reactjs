import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {protectedRouterAdmin, protectedRouterUser, publicRouter} from "./routes/routes";


import AppLayout from "./ui/AppLayout";
import Register from "./pages/Register/Register";
import Login from "../src/pages/Login/Login"
import {RequireAuth} from "./ui/RequireAuth.jsx";



function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        {
          publicRouter.map((route, index) =>
              <Route path={route.path}  key={index} element={<route.component />} />
          )
        }
        <Route path="/*" element={<Navigate to="/login"/>}/>

        <Route element={<AppLayout />}>
          <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
            {protectedRouterAdmin.map((route, index) =>
                <Route path={route.path} key={index} element={<route.component />} />
            )}
          </Route>
            <Route element={<RequireAuth allowedRoles={["USER","ADMIN"]}/>}>
            {protectedRouterUser.map((route, index) =>
                <Route path={route.path} key={index} element={<route.component />} />
            )}
            </Route>


        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
