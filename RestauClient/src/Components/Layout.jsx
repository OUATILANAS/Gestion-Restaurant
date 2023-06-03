import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <nav className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" activeClassName="active">
              Ville
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/zone" activeClassName="active">
              Zone
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/zoneByCity" activeClassName="active">
              Zone par ville
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/pharmacie" activeClassName="active">
              Pharmacie
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <p className="text-center p-3">© {new Date().getFullYear()} Mon application</p>
    </footer>
  );
};

export { Header, Footer };