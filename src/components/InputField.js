import React, { Component } from "react";
import "../styles/InputField.css";

class InputField extends Component {
  render() {
    return(
      <div id="input-field">
        <p>PASTE IMAGE URL HERE</p>
        <div id="the-input-field">
          <input onChange={this.props.onInputChange} type="text" placeholder="/dank-meme.jpg"/>
          <button onClick={this.props.onInputSubmit}>ANALYZE</button>
        </div>
      </div>
    );
  }
}

export default InputField;