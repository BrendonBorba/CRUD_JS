import { Link } from 'react-router-dom'

import './header_pizzaria.css'

export const header_pizzaria = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Pizzaria
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              Listagem
            </Link>
          </li>
          <li className="nav-item">
            <Link to="inclusao" className="nav-link active">
              Inclusão
            </Link>
          </li>
          <li className="nav-item">
            <Link to="gerencia" className="nav-link active">
              Gerência
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
