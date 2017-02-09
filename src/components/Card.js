import React, { Component } from 'react';
import '../styles/Card.css';
import Divider from 'muicss/lib/react/divider';


class Card extends Component {
  render() {
    return (
      <div className="App">
        <div className="Card">
          <div className="mui--text-dark mui--text-display3 value">{this.props.value} <div className="mui--text-dark mui--text-display1 inline">{this.props.unit}</div></div>
          <Divider />
          <div className="mui--text-display1">{this.props.property}</div>
        </div>
      </div>
    );
  }
}

export default Card;
