import React from 'react';
import airplane from './svg/airplane.svg';
import location from './svg/location.svg';
import text from './svg/text.svg';


export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let bcbp = JSON.parse(JSON.stringify(this.props.values));
  }

  render() {
    return (
      <div id="calendar">

        <div className="section">
          <img alt="Airplane Icon" src={airplane} />
          <h3>Flight to Amsterdam</h3>
          <p className="minor-txt">Monday, December 23rd - 7:30pm - 8:30pm</p>
        </div>

        <div className="section">
          <img alt="Airplane Icon" src={location} />
          <h4>Flight to Amsterdam</h4>
          <p className="minor-txt">Monday, December 23rd - 7:30pm - 8:30pm</p>
        </div>

        <div className="section">
          <img alt="Airplane Icon" src={text} />
          <h4>Flight to Amsterdam</h4>
          <p className="minor-txt">Monday, December 23rd - 7:30pm - 8:30pm</p>
        </div>
      </div>
    );
  }
}


