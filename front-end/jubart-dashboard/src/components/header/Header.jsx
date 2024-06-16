import React from 'react'
import './Header.css' // Importa o arquivo CSS para estilização do componente
import Logo from './logo/Logo' // Importa o componente Logo
import Searchbar from './searchbar/Searchbar' // Importa o componente Searchbar
import Nav from './nav/Nav' // Importa o componente Nav

function Header() {
  return (
    <header 
      id='header' 
      className='header fixed-top d-flex align-items-center'>
        {/* Componente de Logo */}
        <Logo />
        {/* Componente de Barra de Pesquisa */}
        <Searchbar />
        {/* Componente de Navegação */}
        <Nav />
    </header>
  )
}

export default Header
