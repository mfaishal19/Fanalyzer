import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "../styles/Header.css";

class Header extends Component {
  render() {
    return(
      <header>
        <Link to="/"><h1>FACE ANALYZER</h1></Link>
      </header>
    );
  }
}

export default Header;