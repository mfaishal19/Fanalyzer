import React, { Component } from "react";
import ImageInput from "./ResultContainer/ImageInput";
import Result from "./ResultContainer/Result";
import "../styles/ResultContainer.css";

class ResultContainer extends Component {
  render() {
    return(
      <div id="result-container">
        <ImageInput onFaceClick={this.props.onFaceClick} box={this.props.box} imgUrl={this.props.imgUrl}/>
        <Result imgUrl={this.props.imgUrl} isNotFace={this.props.isNotFace} isLoading={this.props.isLoading} guess={this.props.guess} detectedFaces={this.props.detectedFaces}/>
      </div>
    );
  }
}

export default ResultContainer;