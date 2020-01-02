import React from "react";
import { parseBCBP } from 'bcbp-parser';
import Results from "./results.jsx"
import Calendar from "./calendar.jsx"
import openflights from "openflights-cached";
export default class Capture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result_string: null, 
      bcbp_result: null
    }
  }

  componentDidMount() {
    console.log(openflights.findIATA("DPS").name);
    console.log(openflights.findIATA("DPS").country);
    console.log(openflights.findIATA("DPS").city);

    document.getElementById("pcCanvas").remove();
    document.getElementById("mobileCanvas").remove();
    let w = new Worker("result_check.js");
    let ready = 0
    w.onmessage = (e) => {
      console.log(e.data);
      if (window.stream && ready === 0) {
        let status = window.string_result
        if (status === null && ready === 0) {
          setTimeout(async function(){ window.scanBarcode() }, 1000);
          ready = 1
        }
      }
      // console.log(this.state.result_string)
      if (localStorage.barcode) {
        this.setState({
          result_string: localStorage.barcode
        }, ()=> {
          localStorage.clear();
          w.terminate();
          this.setState({
            bcbp_result: parseBCBP(this.state.result_string)
          }, ()=>{
             console.log(this.state.bcbp_result);
             w.terminate();
          });
        });
      }
    };
  }


  thing = (e) => {
    console.log(this.state.result_string);
    console.log(this.state.bcbp_result);
  }

   render() {
    return (
      <div>
        
        <h3 id="headtxt">Scan a boarding pass that looks like <a href="https://raw.githubusercontent.com/x8BitRain/ticket2calendar/master/public/pdf417_bcbp.png">this</a> or <a href="https://raw.githubusercontent.com/x8BitRain/ticket2calendar/master/public/aztec_bcbp.png">this</a>.</h3>
        {this.state.bcbp_result ?
          <React.Fragment> 
            <Calendar values={this.state.bcbp_result} />
          </React.Fragment>
         : null}
          <br></br>
          
            <Results values={this.state.bcbp_result} />
         
          <br></br>
      </div>
    );
  }
}

        // {this.state.bcbp_result ? <Results results={} /> : null}
