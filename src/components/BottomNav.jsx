import React from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  HouseFill,
  Calculator,
  CalculatorFill,
  GraphUp,
  GraphUpArrow,
  Gear,
  GearFill,
} from "react-bootstrap-icons";

const BottomNav = () => {
  const commonClasses =
    "d-flex flex-column align-items-center text-decoration-none p-3";
  const activeStyle = { color: "var(--finwise-green)" };
  const inactiveStyle = { color: "var(--bs-secondary-color)" };

  return (
    <div className="floating-nav-container">
      <nav className="floating-nav d-flex justify-content-around align-items-center">
        <NavLink
          to="/"
          className={commonClasses}
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          {({ isActive }) =>
            isActive ? <HouseFill size={24} /> : <House size={24} />
          }
        </NavLink>
        <NavLink
          to="/tax-calculator"
          className={commonClasses}
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          {({ isActive }) =>
            isActive ? <CalculatorFill size={24} /> : <Calculator size={24} />
          }
        </NavLink>
        <NavLink
          to="/simulator"
          className={commonClasses}
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          {({ isActive }) =>
            isActive ? <GraphUpArrow size={24} /> : <GraphUp size={24} />
          }
        </NavLink>
        <NavLink
          to="/settings"
          className={commonClasses}
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          {({ isActive }) =>
            isActive ? <GearFill size={24} /> : <Gear size={24} />
          }
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNav;
