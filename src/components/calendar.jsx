import React from 'react';
import airplane from './svg/airplane.svg';
import location from './svg/location.svg';
import text from './svg/text.svg';
import arrowRight from './svg/arrow-right.svg';
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
     destination_iata: bcbp.origin,
     destination : openflights.findIATA(`${bcbp.origin}`).city,
     origin_iata: bcbp.destination,
     origin : openflights.findIATA(`${bcbp.destination}`).city,
     flight_no : `${bcbp.flight_number}`,
     flight_airline: `${bcbp.airline}`,
     flight_time: moment().dayOfYear(bcbp.flight_date).format('dddd, Do MMMM'),
     ready : 1
    }, 
    ()=>{
         console.log(this.state.destination);
         console.log(this.state.flight_no);
         console.log(this.state.flight_time);
        });
    
  }

  render() {
    return (
      <React.Fragment><br></br>
      <div id="calendar" className="card">

        <div className="section first">
          <img alt="Airplane Icon" src={airplane} />
          <h3>Flight to {this.state.destination} ({this.state.flight_airline} {this.state.flight_no})</h3>
          <p className="minor-txt">{this.state.flight_time}</p>
        </div>

        <div className="section">
          <img alt="Location" src={location} />
          <a href={`https://www.google.com/maps?hl=en-GB&q=${this.state.origin}+${this.state.origin_iata}`}>{this.state.origin} {this.state.origin_iata}</a>
          <img className="to" src={arrowRight} alt="Up Arrow"/>
          <a href={`https://www.google.com/maps?hl=en-GB&q=${this.state.destination}+${this.state.destination_iata}`}>{this.state.destination} {this.state.destination_iata}</a>
        </div>

        <div className="section">
          <img alt="Description" src={text} />
          <p>$(Airline Name) flight </p>
        </div>
      </div>
      </React.Fragment>
    );
  }
}


