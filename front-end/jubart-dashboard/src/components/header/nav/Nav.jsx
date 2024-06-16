import React from 'react'
import './Nav.css'
import NavAvatar from './nav-components/navAvatar/NavAvatar'
import NavNotice from './nav-components/navNotice/NavNotice'

// Componente funcional Nav
function Nav() {
  return (
    // Container principal da navegação
    <div className="header-nav ms-auto">
        {/* Lista de itens de navegação, usando classes Bootstrap para flexbox e alinhamento */}
        <ul className="d-flex align-items-center">
            {/* Componente de notificações */}
            <NavNotice />
            {/* Componente de avatar */}
            <NavAvatar />
        </ul>
    </div>
  )
}

// Exporta o componente Nav como padrão
export default Nav
