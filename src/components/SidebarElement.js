import React, { Component } from 'react';
import '../styles/Sidebar-element.css';
import Divider from 'muicss/lib/react/divider';
import Toggle from 'react-toggle'
import 'react-toggle/style.css'


class SiedebarElement extends Component {

  constructor(props) {
    super(props)
    this.state = {
      enabled: true
    }
    this.handleBaconChange = this.handleBaconChange.bind(this)
  }

  handleBaconChange() {
    this.setState({
      enabled: !this.state.enabled
    }, () => this.props.onChange(this.props.sensorType, this.state.enabled))

  }

  render() {
    return (
      <div key={this.props.sensorType} className="sidebar-element">
        <Toggle
          defaultChecked={this.state.enabled}
          onChange={this.handleBaconChange} />
        <h3 id="home" className="menu-item">{this.props.sensorType}</h3>
        <Divider />
      </div>
    );
  }
}

export default SiedebarElement;
