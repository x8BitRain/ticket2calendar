import React from "react";
import { connect } from "react-context-global-store";

class Interface extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <h1>{this.props.store.counter.value}</h1>
      </div>
    );
  }
}

export default connect(
  Interface,
  ["counter"]
);
