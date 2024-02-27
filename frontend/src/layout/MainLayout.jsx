import React from "react";
import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div>
      <header>
        <nav className="navbar bg-primary ">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Navbar
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <div className="container mt-3">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
