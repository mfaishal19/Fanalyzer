import React, { Component } from "react";
import "../../styles/Spinner.css";

const Spinner = () => (
  <div className="css-1eitjko">
    <div className="css-1a2v5xa"></div>
    <div className="css-1wd6nbc"></div>
    <div className="css-jkkkrs"></div>
    <div className="css-qd8oq0"></div>
    <div className="css-lqkuay"></div>
    <div className="css-1tqtuzj"></div>
  </div>
)

class Result extends Component {
  render() {
  
    if(this.props.imgUrl === "") {
      return(
        <div id="result">
          <div id="intro">
            <p>Let machine guess one's demographic information by their face.</p>
            <p>Go ahead, try it.</p>
            <h3>Waiting for input...</h3>
          </div>
        </div>
      );
    } else if(this.props.isLoading) {
      return(
        <div id="result">
          <div id="spinner">
            <Spinner />
          </div>
        </div>
      );
    } else {
      if (this.props.isNotFace) {
        return(
          <div id="result">
            <div id="intro">
              <h3>No face detected in the image</h3>
            </div>
          </div>
        );
      } else {
        let subject = this.props.guess.gender === "male" ? "He" : "She";
        return (
          <div id="result">
            <p id="detected-face">{this.props.detectedFaces} FACE DETECTED</p>
            <div id="guess">
              <p>{subject} is a {this.props.guess.gender},</p>
              <p>{subject} is around {this.props.guess.age} years old</p>
              <p>And {subject.toLowerCase()} is {this.props.guess.race}</p>
            </div>
          </div>
        );
      }
    }
  }
}

export default Result;