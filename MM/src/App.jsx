import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Компоненты
import NavBar from './components/NavBar';
import Home from './pages/home';
import Login from './pages/login';
import Statistics from './pages/statistics';
import Operations from './pages/operatons';

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route index Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/statistics" Component={Statistics} />
        <Route path="/operations" Component={Operations} />
      </Routes>
    </div>
  );
}

export default App;
