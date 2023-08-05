import React from "react";
import { Button } from "@chakra-ui/react";
import "../css/navbar.css";
import { NavLink } from "react-router-dom";
import LogOut from "./LogOut";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  return (
    <div className="navbar">
      <div className="logo">TASK MANAGER</div>
      <div className="navbar__elem">
        <ul>
          <NavLink
            to="/"
            style={({ isActive }) => {
              return {
                borderBottom: isActive ? "1px solid orange" : "none",
              };
            }}
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/completed"
            style={({ isActive }) => {
              return {
                borderBottom: isActive ? "1px solid orange" : "none",
              };
            }}
          >
            <li>Completed</li>
          </NavLink>
        </ul>
        {cookies?.user?.email ? <LogOut /> : "" }
      </div>
    </div>
  );
};

export default Navbar;
