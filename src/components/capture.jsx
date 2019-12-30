import React from "react";

export default class Capture extends React.Component {
  // constructor(props) {
  //   super(props);
  // }


  detect = () => {
    console.log(window.string_result);
  };

  render() {
    return (
      <div>
        <button onClick={this.detect}>result!</button>
      </div>
    );
  }
}
