import React, { Component } from 'react';
import '../styles/App.css';
import Card from '../components/Card';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import 'whatwg-fetch'

var Menu = require('react-burger-menu').slide;
import 'react-burger-menu/example/src/normalize.css'

import SidebarElement from '../components/SidebarElement'

var tempData = require('../../test.json')


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: undefined,
      disabledElements: []
    }
    this.getData = this.getData.bind(this)
    this.handleSidebarElementChange = this.handleSidebarElementChange.bind(this)

  }

  // gets current sensebox data and saves them into state
  getData(senseBoxID) {
    fetch(`https://api.opensensemap.org/boxes/${senseBoxID}`)
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({
          data: json
        })
        this.timer = setTimeout(() => {this.getData(senseBoxID)}, 10000);
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
  }

  componentDidMount() {
    // get sensebox id from url
    var senseBoxID = window.location.pathname.substring(1)
    if(!senseBoxID) {
      console.error("Please provide a senseBoxID. E.g. http://localhost:3000/58932c89d038b000102f7d35")
    }
    //this.getData(window.location.pathname.substring(1))

    this.setState({
      data: tempData
    })
  }

  componentWillUnmount() {
    // reset timer when unmounting
    clearTimeout(this.timer);
  }

  // handle sidebar visibility toggle
  handleSidebarElementChange(type, enabled) {
    var tempDisabledArray = this.state.disabledElements
    if(!enabled)
      tempDisabledArray.push(type)
    else
      tempDisabledArray.splice(this.state.disabledElements.indexOf(type), 1)

    this.setState({
      disabledElements: tempDisabledArray
    })

  }

  render() {
    // when there is sensebox data stored in state
    if(this.state.data !== undefined) {
      return (
        <div className="App">
          <video id="background-video" loop autoPlay src="http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_GL_G004_C010_v03_6Mbps.mov"></video>
          {/* create sidebar */}
          <Menu>
            {this.state.data.sensors.map((sensor, index) =>
              <SidebarElement
                onChange={this.handleSidebarElementChange}
                key={index}
                sensorType={sensor.title}
                />
            )}
          </Menu>
          {/* main content */}
          <Container className="middle">
            <div className="mui--text-light-secondary mui--text-display3">{this.state.data.name}</div>
            <Row className="cards-wrapper">
              {/* loop through all sensors of chosen sensebox */}
              {this.state.data.sensors.map((sensor, index) =>
                {
                  // only show sensebox when it is not on the disabledElements array
                  if(!this.state.disabledElements.includes(sensor.title))
                    return <Col md="6" key={index}><Card value={sensor.lastMeasurement.value} property={sensor.title} unit={sensor.unit}/></Col>
                  else
                    return null
                }
              )}
            </Row>
          </Container>
        </div>
      );
    }
    else { //show loading when no sensebox data in state
      return (
        <div className="App">
          <Container fluid={true}>
            Loading...
          </Container>
        </div>
      );
    }
  }
}

export default App;
