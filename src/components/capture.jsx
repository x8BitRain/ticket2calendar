import React from "react";

export default class Capture extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    let image = document.getElementById("image");
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

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
        <img hidden id="image" alt="shut" src="1_basic.jpg" />
        <canvas id="canvas" width="320" height="320" />
        <br />
        <footer>waiting</footer>
      </div>
    );
  }
}
