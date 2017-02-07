import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import 'whatwg-fetch'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: undefined
    }
    this.getData = this.getData.bind(this)
  }

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
    this.getData(window.location.pathname.substring(1))
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    if(this.state.data !== undefined) {
      console.log(this.state.data)
      return (
        <div className="App">
          <Container className="middle">
            <div className="mui--text-display3">{this.state.data.name}</div>
            <Row className="cards-wrapper">
              {this.state.data.sensors.map((sensor, index) =>
                <Col md="6" key={index}><Card value={sensor.lastMeasurement.value} property={sensor.title} unit={sensor.unit}/></Col>
              )}
            </Row>
          </Container>

        </div>
      );
    }
    else {
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
