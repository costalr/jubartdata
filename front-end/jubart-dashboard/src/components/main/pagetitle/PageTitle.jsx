import React from 'react'
import './PageTitle.css'


function PageTitle({page}) {
  return (
    <div className='pagetitle'>
      <h1>{page}</h1>
      <nav>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">
            <i className="-house-door">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
            </i>
            </a>
          </li>
          <li className="bread-item active">{page}</li>
        </ul>
      </nav>
      </div>
  )
}

export default PageTitle