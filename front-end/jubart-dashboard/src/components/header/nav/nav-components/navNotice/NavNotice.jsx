import React, { useState, useEffect, useRef } from 'react';


function NavNotice() {
  // Estado para controlar se a caixa de notificação está aberta
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  // Estado para controlar se todas as notificações estão expandidas
  const [isExpanded, setExpanded] = useState(false);
  // Referência para o elemento da caixa de notificação
  const noticeRef = useRef(null);

  // Função para alternar a visibilidade da caixa de notificação
  const toggleNotification = (event) => {
    event.preventDefault();
    setNotificationOpen(!isNotificationOpen);
  };

  // Função para alternar entre a exibição de todas as notificações
  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };

  // Função para fechar a caixa de notificação quando clicar fora dela
  const handleClickOutside = (event) => {
    if (noticeRef.current && !noticeRef.current.contains(event.target)) {
      setNotificationOpen(false);
    }
  };

  // Efeito para adicionar e remover o evento de clique fora da caixa de notificação
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Renderização do componente
  return (
    <div className="nav-notice" ref={noticeRef}>
      {/* Ícone de notificação com um contador de notificações */}
      <a href="#" className="nav-link nav-icon" onClick={toggleNotification}>
        <i className="bi bi-bell">
          <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
          </svg>
        </i>
        <span className="badge-number">4</span>
      </a>
      
      {/* Caixa de notificações */}
      {/* Renderiza a caixa de notificações somente se isNotificationOpen for true */}
      {isNotificationOpen && (
        <div className="notice-menu drop-container">
          <ul className="nav-item dropdown">
            {/* Notificação 1 */}
            <li className="notification-item">
              <i className="bi bi-exclamation-circle text-warning">
                <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                </svg>
              </i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorenearun veritatus oditseno</p>
                <p>30 min atrás</p>
              </div>
            </li>

            {/* Notificação 2 */}
            <li className="notification-item">
              <i className="bi bi-x-circle text-danger">
                <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </i>
              <div>
                <h4>Atque rerun nesciunt</h4>
                <p>QUae doloren earum veritatis oditseno</p>
                <p>1 hr atrás</p>
              </div>
            </li>

            {/* Notificação 3 */}
            <li className="notification-item">
              <i className="bi bi-check-circle text-success">
                <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                </svg>
              </i>
              <div>
                <h4>Atque rerun nesciunt</h4>
                <p>QUae doloren earum veritatis oditseno</p>
                <p>2 hrs atrás</p>
              </div>
            </li>

            {/* Botão para expandir e ver todas as notificações */}
            {!isExpanded && (
              <li className="notification-expand">
                <button onClick={toggleExpand} className="expand-button">Ver todas as notificações</button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavNotice;
