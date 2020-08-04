import React from 'react';

import logo from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
function Landing() {
  return (
    <div id="page-loading">
      <div id="page-loading-content">
        <div className="logo-container">
          <img src={logo} alt=""/>
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img src={landingImg} alt='Plataforma de estudos' className='hero-image'/>

        <div className="buttons-container">
          <a href="" className="study">
            <img src={studyIcon} alt=""/>
            Estudar
          </a>
          <a href="" className="give-classes">
            <img src={giveClassesIcon} alt=""/>
            Estudar
          </a>
        </div>

        <span className="total-connections">
          Total de 200 conexões já realizadas <img src={purpleHeartIcon} alt=""/>
        </span>
      </div>
    </div>
  )
}

export default Landing;
