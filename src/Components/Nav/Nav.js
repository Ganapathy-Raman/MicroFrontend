import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaChartBar, FaInfoCircle } from "react-icons/fa";
import "./Nav.css";

function Nav() {
  return (
    <>
      <header>
        <nav className="navbar sticky-top">
          <div className="navbar-container container">
            <input type="checkbox" id="menu-toggle" className="menu-toggle" />
            <label htmlFor="menu-toggle" className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </label>

            <ul className="menu-items">
              <li>
                <a href="/">
                  <img
                    src="https://t3.ftcdn.net/jpg/05/14/36/48/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0.jpg"
                    width={46}
                    height={50}
                    alt="Fitness logo"
                  />
                </a>
              </li>
              <li>
                <Link to="/"><FaHome /> Home</Link>
              </li>
              <li>
                <Link to="/login"><FaSignInAlt /> Login</Link>
              </li>
              <li>
                <Link to="/login"><FaChartBar /> Organ Donation</Link>
              </li>
              <li>
                <Link to="/login"><FaInfoCircle /> Donors</Link>
              </li>
              <li>
                <Link to="/login"><FaInfoCircle /> Recipients</Link>
              </li>
            </ul>
            <ul>
            <li>
                <Link className="logo text-2xl font-bold" to="/">Organ Donation Management</Link>
              </li>
              </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Nav;
