import React, { Component } from "react";
import MemDataService from "../services/mem.services";

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.onChangeTopText = this.onChangeTopText.bind(this);
    this.onChangeBottomText = this.onChangeBottomText.bind(this);
    this.saveMem = this.saveMem.bind(this);
    this.newMem = this.newMem.bind(this);

    this.state = {
      id: null,
      topText: "",
      bottomText: "", 
    };
  }

  onChangeTopText(e) {
    this.setState({
        topText: e.target.value
    });
  }

  onChangeBottomText(e) {
    this.setState({
        bottomText: e.target.value
    });
  }

  saveMem() {
    var data = {
        topText: this.state.topText,
        bottomText: this.state.bottomText
    };

    MemDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          topText: response.data.topText,
          bottomText: response.data.bottomText,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMem() {
    this.setState({
      id: null,
      topText: "",
      bottomText: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Przesłano pomyślnie!</h4>
            <button className="btn btn-success" onClick={this.newMem}>
              Dodaj
            </button>
          </div>
        ) : (
          <div>
            <div className="form">
              <label htmlFor="title">Tytuł</label>
              <input
                type="text"
                className="form"
                id="topText"
                required
                value={this.state.topText}
                onChange={this.onChangeTopText}
                name="topText"
              />
            </div>

            <div className="form">
              <label htmlFor="bottomText">Źródło</label>
              <input
                type="text"
                className="form"
                id="bottomText"
                required
                value={this.state.bottomText}
                onChange={this.onChangeBottomText}
                name="bottomText"
              />
            </div>

            <button onClick={this.saveMem} >
             Wyślij
            </button>
          </div>
          
        )}
      </div>
    );
  }
}

