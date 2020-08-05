import React from 'react'

import WhatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './style.css';

function TeacherItem() {
  return(
    <article className="teacher-item">
        <header>
          <img src="https://avatars2.githubusercontent.com/u/36475975?s=460&u=bc6ff76fe3466b2700370db9e1c9a7cdcd5d741f&v=4"
          alt="Imagem do professor."/>
          <div>
            <strong>Douglas Fernando</strong>
            <span>Química</span>
          </div>
        </header>

        <p>Entusiasta das melhores tecnologias de química avançada.</p>
        <footer>
          <p>Preço/hora
            <strong>R$ 80,00</strong>
          </p>
          <button type="button">
            <img src={WhatsappIcon} alt="WhatsApp"/>
            Entrar em contato
          </button>
        </footer>
      </article>
  )
}

export default TeacherItem;
