import React from "react";

export default class Capture extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  detect = () => {
    let barcodeDetector = new window.BarcodeDetector();
    let image = document.querySelector("#image");
    barcodeDetector.detect(image).then(barcode => console.log(barcode[0]));
  };

  render() {
    return (
      <div>
        <button id="detect" onClick={this.detect}>
          Detect barcodes
        </button>
        <img
          id="image"
          alt="shut"
          src="https://raw.githubusercontent.com/ihabunek/pdf417-py/master/images/1_basic.jpg"
        />
        <br />
        <footer>waiting</footer>
      </div>
    );
  }
}
