const ics = require('ics');

let theICS;

const makeIcs = (state, store) => {
	
	let button = document.getElementById('ical');
	const event = {
	  start: [2018, 5, 30, 6, 30],
	  duration: { hours: 1 },
	  title: `Flight to ${state.destination}`,
	  description: `Please manually set the departure and arrival time!
	  Confirmation number: ${state.flight_booking_no} ${state.flight_airline}.
	  Flight ${state.flight_no}.
	  Legs: ${state.flight_legs}.
	  Seat: ${state.flight_seat}.`,
	  location: `${state.origin} ${state.origin_iata}`,
	  url: 'https://x8bitrain.github.io/ticket2calendar/',
	  geo: { lat: store.origin.lat, lon: store.origin.lng },
	  categories: ['Flight', 'Travel', `${state.destination}`, `${state.origin}`],
	  status: 'CONFIRMED',
	  busyStatus: 'BUSY'
	}

	theICS = ics.createEvent(event, (error, value) => {
  	if (error) {
    console.log(error)
    return error
  	} 
  	button.href = 'data:attachment/text,' + encodeURI(value);
		button.target = '_blank';
		button.download = `Flight to ${state.destination}`;
	});

	
	// console.log("ICS END\n", theICS);
	
}


export default makeIcs;