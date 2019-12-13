import React from 'react';
import FileDrop from 'react-file-drop';
import { connect } from 'react-context-global-store';
import axios from "axios";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '',
      file:''
    }
  }

  handleDrop = (files, event) => {
    console.log(files);

  }


  doThing = () => {
    axios
    .get(`http://127.0.0.1:3000/api/v1/pdfs/`)
    .catch(function (error) {
      // handle error
      console.log(error);})
    .then(res => {
      console.log(res.data);
      this.setState({
        file:res.data
      });
    });
  }

  postRequest = (pdf) => {
    let file = new FormData();
    file.append('name',pdf[0])
    console.log(pdf[0]);
    axios.post('http://127.0.0.1:3000/api/v1/pdfs/', file, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
  .then(response => {
    this.setState({
      file: JSON.stringify(response.data)
    });
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }




  render() {
      const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
    return (

      <div id="react-file-drop-demo" style={{styles}}>
      <img src={this.state.picture} />
      <button onClick={this.doThing}>GET</button>
      <button onClick={this.postRequest}>post</button>
        <FileDrop onDrop={this.postRequest}
                  accept={'application/pdf'}
                  maxSize={5242880}>
          Drop some files here!
        </FileDrop>
        <div>{this.state.file}</div>
      </div>
    );
  }
}
export default connect(Upload, ['counter']);

