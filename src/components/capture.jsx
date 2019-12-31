import React from "react";
import { parseBCBP } from 'bcbp-parser';
import Results from "./results.jsx"
let assssss = {}
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
    setTimeout(async function(){ window.scanBarcode() }, 1000);
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
          }, ()=>{
            console.log(this.state.bcbp_result);
            assssss = this.state.bcbp_result
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
        <button onClick={this.thing}>Print result!</button>
        {this.state.bcbp_result ? 
            <Results values={this.state.bcbp_result} />
         : null}
      </div>
    );
  }
}

        // {this.state.bcbp_result ? <Results results={} /> : null}
