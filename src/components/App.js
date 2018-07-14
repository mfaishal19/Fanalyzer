import React, { Component } from "react";

import Header from "./Header";
import InputField from "./InputField";
import ResultContainer from "./ResultContainer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgUrl: "",
      isLoading: false,
      detectedFaces: "",
      clickedFaceIndex: 0,
      box: [],
      guess: [],
      selectedGuess: {},
      isNotFace: false
    }
  }

  calculateFaceLocation = (data) => {
    const img = document.getElementById("img");
    const width = Number(img.width);
    const height = Number(img.height);
    const regions = data.outputs[0].data.regions;
    let faceBox = [];
    regions.forEach((data, i) => {
      for (let key in data) {
        if(key === "region_info") {
          faceBox.push({
            leftCol: regions[i][key].bounding_box.left_col * width,
            topRow: regions[i][key].bounding_box.top_row * height,
            rightCol: width - (regions[i][key].bounding_box.right_col * width),
            bottomRow: height - (regions[i][key].bounding_box.bottom_row * height)
          });
        }
      }
    })
    return faceBox;
  }

  bestGuess = (data) => {
    const regions = data.outputs[0].data.regions;
    let guess = [];
    regions.forEach((data, i) => {
      for (let key in data) {
        if(key === "data") {
          let gender;
          if(regions[i][key].face.gender_appearance.concepts[0].name === "masculine") {
            gender = 'male';
          } else {
            gender = 'female';
          }
          guess.push({
            age: regions[i][key].face.age_appearance.concepts[0].name,
            gender: gender,
            race: regions[i][key].face.multicultural_appearance.concepts[0].name
          });
        }
      }
    })
    return guess;
  }

  handleFaceClick = (e) => {
    this.setState({ selectedGuess: this.state.guess[e.target.attributes['data-index'].value] });
  }

  handleInputSubmit = () => {
    if(this.state.input.slice(0,4) !== 'http') {
      alert("Please enter a valid URL");
      return;
    }
    
    this.setState({ imgUrl: this.state.input });
    this.setState({ isLoading: true });

    fetch("https://peaceful-everglades-77433.herokuapp.com/imageurl", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(!(response.outputs[0].data.regions)) {
          this.setState({
            isNotFace: true, 
            isLoading: false
          });
          return;
        }
        this.setState({
          detectedFaces: response.outputs[0].data.regions.length,
          box: this.calculateFaceLocation(response),
          guess: this.bestGuess(response),
          selectedGuess: this.bestGuess(response)[0],
          isNotFace: false,
          isLoading: false
        });
      })
      .catch(err => console.error(err));
  }

  handleInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  render() {
    return(
      <div id="container">
        <Header/>
        <InputField onInputChange={this.handleInputChange} onInputSubmit={this.handleInputSubmit}/>
        <ResultContainer isNotFace={this.state.isNotFace} isLoading={this.state.isLoading} clickedFaceIndex={this.state.clickedFaceIndex} onFaceClick={this.handleFaceClick} guess={this.state.selectedGuess} detectedFaces={this.state.detectedFaces} box={this.state.box} imgUrl={this.state.imgUrl}/>
      </div>
    );
  }
}

export default App;