import React from "react";
import { parseBCBP } from 'bcbp-parser';

export default class Capture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result_string: null, 
      bcbp_result: {}
    }
  }
  componentDidMount() {
    document.getElementById("pcCanvas").remove();
    document.getElementById("mobileCanvas").remove();
    let w = new Worker("result_check.js");
    w.onmessage = () => {
      console.log(this.state.result_string)
      if (localStorage.barcode) {
        this.setState({
          result_string: localStorage.barcode
        }, ()=> {
          localStorage.clear();
          w.terminate();
          console.log(this.state.result_string);
          this.setState({
            bcbp_result: parseBCBP(this.state.result_string)
          });
        });
      }
    };
  }

  // detect = () => {
  //   this.setState({ result_string:window.string_result }, () => {
  //     console.log(this.state.result_string);
  //     console.log(parseBCBP(this.state.result_string))
  //   });
  // };

  thing = (e) => {
    console.log(this.state.result_string);
    console.log(this.state.bcbp_result);
  }

  render() {
    return (
      <div>
        <div id="dbr" ></div> 
          { this.state.result_string === "test" ? <h1>BIG TEST</h1> : null }
        <button onClick={this.detect}>result!</button>
        <button onClick={this.thing}>do thing</button>
      </div>
    );
  }
}

