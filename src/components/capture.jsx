import React from "react";


export default class Capture extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    let script1 = document.createElement('script');
    script1.src = "zxing.js";
    script1.async = true
    let script2 = document.createElement('script');
    script2.src = "video.js";
    document.getElementsByTagName('body')[0].appendChild(script1);
    document.getElementsByTagName('body')[0].appendChild(script2);
  }

  detect = () => {

  };

  render() {
    return (
      <div>
      <div id="dbr" />
        <div className="select">
          <label htmlFor="videoSource">Video source: </label><select id="videoSource"></select>
        </div>
        <button id="go">Read Barcode</button>
        <video muted autoPlay id="video" playsInline={true}></video>
        <canvas id="pcCanvas" width="640" height="480" ></canvas>
        <canvas id="mobileCanvas" width="240" height="320" ></canvas>
      </div>
    );
  }
}
