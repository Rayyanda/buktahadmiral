
import { Route, Routes } from "react-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import LandingPage from "../views/Landing";

export default function RoutesIndex()
{
    return (
       <Routes>

            <Route path="/" element={<LandingPage/>} />

            {/* Students */}
            <Route path="/students" element={<Home/>}/>

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

       </Routes>
    )
}