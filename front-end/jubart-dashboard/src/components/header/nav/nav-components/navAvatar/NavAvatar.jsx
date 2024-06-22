import React, { useState, useEffect, useRef } from 'react';
import profileImg from './user.jpg';

function NavAvatar() {
  // Estado para controlar se o menu está aberto ou fechado
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Referência para o elemento do menu
  const menuRef = useRef(null);

  // Função para alternar o estado do menu entre aberto e fechado
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Função para fechar o menu ao clicar fora dele
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  // Efeito para adicionar e remover o ouvinte de eventos ao montar e desmontar o componente
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);;

    // Renderização do componente
  return (
    <li className="nav-item dropdown ps-3" ref={menuRef}>
      {/* Botão para abrir ou fechar o menu */}
      <button
        onClick={toggleMenu}
        className="nav-link nav-profile d-flex align-items-center pe-0"
        aria-expanded={isMenuOpen ? 'true' : 'false'}
      >
        <img src={profileImg} alt="Imagem de Perfil" className="rounded-circle" />
        <span className="d-none d-md-block dropdown-toggle ps-2">Lara Costa</span>
      </button>

      {/* Renderização condicional do menu dropdown */}
      {isMenuOpen && (
        <ul className="avatar-menu dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        {/* Cabeçalho do menu dropdown */}
          <li className="dropdown-header">
            <h6>DESENVOLVEDORA</h6>
            <span>JUBARTDATA</span>
          </li>
          {/* Itens do menu dropdown */}
          {/* Item do menu para "Dados de Perfil" */}
          <li className='menu-item'>
            <a href="users-profile.html" className="dropdown-item d-flex align-items-center">
              <i className="bi bi-person">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
              </i>
              <span>Perfil</span>
            </a>
          </li>
          {/* Item do menu para "Configurações de Conta" */}
          <li className='menu-item'>
            <a href="users-profile.html" className="dropdown-item d-flex align-items-center">
              <i className="bi bi-gear">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492m-2.246 3.246a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                </svg>
              </i>
              <span>Configurações</span>
            </a>
          </li>
     
          {/* Item do menu para "Ajuda" */}
          <li className='menu-item'>
            <a href="pages-faq.html" className="dropdown-item d-flex align-items-center">
              <i className="bi bi-question-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.586 0-1.01.388-1.01.94z"/>
                </svg>
              </i>
              <span>Ajuda</span>
            </a>
          </li>
        
          {/* Item do menu para "Sair" */}
          <li className='menu-item logout'>
            <a href="#" className="dropdown-item d-flex align-items-center">
              <i className="bi bi-box-arrow-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                  <path fillRule-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                  <path fillRule-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                </svg>
              </i>
              <span>Sair</span>
            </a>
          </li>
        </ul>
      )}
    </li>
  );
}

export default NavAvatar;