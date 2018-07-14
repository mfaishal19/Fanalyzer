import React, { Component } from "react";

class ImageInput extends Component {
  render() {

    const boundingBox = this.props.box.map((data, i) => {
      return(
        <div key={i} data-index={i} onClick={this.props.onFaceClick} className="bounding-box" style={{top: data.topRow, right: data.rightCol, bottom: data.bottomRow, left: data.leftCol}}></div>
      );
    })

    return(
      <div id="image-input">
        <div id="image-container" style={{position: 'relative'}}>
          <img id="img" src={this.props.imgUrl} alt=""/>
          {boundingBox}
        </div>
      </div>
    );
  }
}

export default ImageInput;