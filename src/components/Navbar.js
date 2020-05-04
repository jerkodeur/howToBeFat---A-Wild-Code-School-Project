import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faBeer,
  faHamburger,
  faBalanceScaleRight,
} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import './Navbar.css'

function Navbar(){
    return (
        <div className ="navbar-mobile">
          <Link className="active" to="./components/Accueil"><FontAwesomeIcon icon={faHome} /></Link>
          <Link to="./components/RecipeSearch"><FontAwesomeIcon icon={faHamburger} /></Link>
          <Link to="#beer"><FontAwesomeIcon icon={faBeer} /></Link>
          <Link to="/Calculator"><FontAwesomeIcon icon={faBalanceScaleRight} /></Link>
        </div>
          )
}

export default Navbar

