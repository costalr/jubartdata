import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import DashGeral from './pages/dashboard_geral/DashGeral';
import GraphsGeral from './pages/dashboard_geral/graph/GraphsGeral'

function App() {
  // Usando o SidebarProvider para envolver todos os componentes que precisam de acesso ao sidebar state
  return (
      <div className="App">
        <Header />
        <Sidebar />
        <DashGeral />
        <GraphsGeral /> 
      </div>
  );
}


export default App;
