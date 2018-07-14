import React, { Component } from "react";
import { Route } from 'react-router-dom';

import App from "./App";

class Main extends Component {
  render() {
    return(
      <main>
        <Route exact path='/' component={App} />
      </main>
    );
  }
}

export default Main;