import React from "react";
import { parseBCBP } from 'bcbp-parser';
import Results from "./results.jsx"
import Calendar from "./calendar.jsx"
import Loader from "./loader.jsx";
import Map from "./map.jsx";
import { connect } from 'react-context-global-store';

class Capture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result_string: null, 
      bcbp_result: null
    }
  }

  componentDidMount() {

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
             // Close Camera
             window.stream.getTracks().forEach(function(track) {
	             track.stop();
	          });
          });
        });
      }
    };
  }


   render() {
    return (
      <React.Fragment>
      {this.props.store.airports.ready ? <Map  /> : null}
        <div id="capture">
          {!this.state.bcbp_result ? <Loader /> : null}
          {!this.state.bcbp_result ? <p class="card" id="headtxt">Scan a boarding pass that a barcode that looks like <a href="https://raw.githubusercontent.com/x8BitRain/ticket2calendar/master/public/pdf417_bcbp.png">this</a> or <a href="https://raw.githubusercontent.com/x8BitRain/ticket2calendar/master/public/aztec_bcbp.png">this</a>.</p> : null}
          {this.state.bcbp_result ?
            <React.Fragment> 
              <Calendar values={this.state.bcbp_result} />
            </React.Fragment>
           : null}
            <br></br>
            
              <Results values={this.state.bcbp_result} />
           
            <br></br>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(Capture, ['airports']);
