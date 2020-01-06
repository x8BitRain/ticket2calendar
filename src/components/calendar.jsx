import React from 'react';
import airplane from './svg/airplane.svg';
import openflights from "openflights-cached";
import moment from "moment";
import { connect } from 'react-context-global-store';

class Calendar extends React.Component {
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
     flight_no : bcbp.flight_number,
     flight_legs : bcbp.legs,
     flight_airline: bcbp.airline,
     flight_time: moment().dayOfYear(bcbp.flight_date).format('dddd, Do MMMM'),
     flight_booking_no: bcbp.pnr,
     flight_seat: bcbp.seat,
     flight_checked_in: bcbp.passenger_status,
     ready : 0
    }, 
    ()=>{   
          this.props.setStore({
          airports: {
              ready: true, 
              origin: { 
                lat: openflights.findIATA(bcbp.origin).latitude,
                lng: openflights.findIATA(bcbp.origin).longitude,
                },
              destination: { // The second level substore can be an array or other data structure
                lat: openflights.findIATA(bcbp.destination).latitude,
                lng: openflights.findIATA(bcbp.destination).longitude,
              },
            }
          }, ()=> console.log(this.props.store.airports));
          console.log(this.props.store.airports);
          //console.log(openflights.findIATA(bcbp.origin).latitude,);
          //console.log(openflights.findIATA(bcbp.destination).latitude,);
        });
    
  }

  render() {
    return (

      <React.Fragment><br></br>
      <div id="calendar" className="card">
      <div id="plane-icon">
        <img alt="Airplane Icon" src={airplane} />
      </div>
        <div className="section first">
          <h3>Flight from {this.state.origin} to {this.state.destination} ({this.state.flight_airline} {this.state.flight_no})</h3>
          <br />
          <p className="minor-txt">{this.state.flight_time}</p>
        </div>

        <div className="section end">

          <div className="route ">
            <a href={`https://www.google.com/maps?hl=en-GB&q=${this.state.origin}+${this.state.origin_iata}`}><p>{this.state.origin_iata}</p></a>
          </div>

          <div className="route ">
            <a href={`https://www.google.com/maps?hl=en-GB&q=${this.state.destination}+${this.state.destination_iata}`}><p>{this.state.destination_iata}</p></a>
          </div>

          <div className="grid-item left">
            <p>AIRLINE</p>
            <br />
            <p>{this.state.flight_airline}</p>
          </div>

          <div className="grid-item right">
            <p>FLIGHT NUMBER</p>
            <br />
            <p>{this.state.flight_no}</p>
          </div>

          <div className="grid-item left">
            <p>BOOKING NUMBER</p>
            <br />
            <p>{this.state.flight_booking_no}</p>
          </div>

          <div className="grid-item right">
            <p>SEAT</p>
            <br />
            <p>{this.state.flight_seat}</p>
          </div>

          <div className="grid-item left">
            <p>TICKET STATUS</p>
            <br />
            {this.state.flight_checked_in === "Ticket issuance/passenger checked in" ? 
          <p className="">Checked in</p> : <p className="">{this.state.flight_checked_in}.</p>}
          </div>

          <div className="grid-item right">
            <p>LEGS</p>
            <br />
            <p>{this.state.flight_legs}</p>
          </div>

          
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default connect(Calendar, ['airports']);


//  <img className="to" src={arrowRight} alt="Up Arrow"/>
// <img alt="Location" src={location} />
// <img alt="Description" src={text} />
//<img alt="Airplane Icon" src={airplane} />