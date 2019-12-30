import React from "react";
import { parseBCBP } from 'bcbp-parser';

export default class Capture extends React.Component {
  // constructor(props) {
  //   super(props);
  // }


  detect = () => {
    console.log(window.string_result);
    console.log(parseBCBP(window.string_result))
  };

  render() {
    return (
      <div>
        <button onClick={this.detect}>result!</button>
      </div>
    );
  }
}
