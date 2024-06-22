import React from 'react'
import './Searchbar.css'

function Searchbar() {
    // Função para alternar a classe 'toggle-sidebar' no elemento body
    const handleToggleSidebar = () => {
        document.body.classList.toggle('toggle-sidebar');
    };

    return (
        <div className="container">
            {/* Barra de pesquisa */}
            <div className="search-bar">
                <form 
                    className="search-form d-flex align-items-center" // Classe para estilização do formulário
                    method='POST' // Método do formulário
                    action="#" // URL de ação do formulário
                >
                    <input 
                        type="text" // Tipo de campo de entrada
                        name="query" // Nome do campo
                        placeholder='Pesquisar...' // Texto do placeholder
                        title='Insira a palavra-chave de pesquisa' // Título do campo de entrada
                    />
                    
                    <button 
                        type='submit' // Tipo do botão
                        title='search' // Título do botão
                    >
                        <i className="bi bi-search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Searchbar
