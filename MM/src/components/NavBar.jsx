import React from 'react';
import { NavLink } from 'react-router-dom';
// API
import { mainColor } from '../constants/styles';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: mainColor }}>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
                aria-current="page"
                to="/"
              >
                MM
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
                aria-current="page"
                to="/login"
              >
                Логин
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
                aria-current="page"
                to="/operations"
              >
                Операции
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
                aria-current="page"
                to="/statistics"
              >
                Статистика
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
                aria-current="page"
                to="/budgetcontrol"
              >
                Расчёт бюджета
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
                aria-current="page"
                to="/accounts"
              >
                Счета
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
