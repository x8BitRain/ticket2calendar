import React, { useState } from 'react';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let bcbp = JSON.parse(JSON.stringify(this.props.values));
    return (
      <div>
      
        {Object.keys(bcbp).map(key => 
          <p key={Math.random()}>{key}: {bcbp[key]}</p>
        )}
      
        
      </div>
    );
  }
}


