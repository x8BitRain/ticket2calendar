import React from 'react';
import airplane from './svg/airplane.svg';
import location from './svg/location.svg';
import text from './svg/text.svg';
import openflights from "openflights-cached";
import moment from "moment";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: null, 
      flight_no: null, 
      ready: 0
    }
  }


  componentDidMount() {
    let bcbp = JSON.parse(JSON.stringify(this.props.values));
    this.formatBcbp(bcbp);
  }

  formatBcbp = (bcbp) => {
    this.setState({
     destination_iata: bcbp.destination,
     destination : openflights.findIATA(`${bcbp.destination}`).city,
     flight_no : `${bcbp.airline} ${bcbp.flight_number}`,
     flight_time: moment().dayOfYear(bcbp.flight_date).format('dddd, Do MMMM'),
     ready : 1
    }, 
    ()=>{console.log(this.state.destination);
         console.log(this.state.flight_no);
         console.log(this.state.flight_time);

          });
    
  }

  render() {
    return (
      <div id="calendar">

        <div className="section">
          <img alt="Airplane Icon" src={airplane} />
          <h3>Flight to {this.state.destination} ({this.state.flight_no})</h3>
          <p className="minor-txt">{this.state.flight_time}</p>
        </div>

        <div className="section">
          <img alt="Airplane Icon" src={location} />
          <h4>{this.state.destination} {this.state.destination_iata}</h4>
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


