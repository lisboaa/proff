import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.css';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({children, ...rest}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar"/>
        </Link>
        <img src={logoImg} alt="Proff"/>
      </div>

      <div className="header-content">
        <strong>{rest.title}</strong>
          { rest.description && <p>{rest.description}</p> }
          {children}
      </div>

    </header>
  )
}

export default PageHeader;
