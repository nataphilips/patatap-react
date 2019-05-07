import React, { Component } from 'react';
import {
  View,
  Layer,
  Group,
  Path,
  Circle,
  Ellipse,
  Rectangle,
  PointText,
  Tool,
} from 'react-paper-bindings';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      circles: [],
    }

    this._box = null
    this._request = null
  }

  resizeWindow() {
    this.forceUpdate()
  }

  resizePaper() {
    this._request = null
  }

  componentDidMount() {
    this.setState({ mounted: true })
    window.addEventListener('resize', () => this.resizeWindow())
    window.addEventListener('keydown', (e) => this.onKeyDown(e))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resizeWindow())
  }

  newCoordinate() {}

  onKeyDown(event) {
    const array = this.state.circles;

    const newId = uuidv4();
    const newCircle = {
      x: Math.floor(Math.random() * (this.box().width + 1)),
      y: Math.floor(Math.random() * (this.box().height + 1)),
      color: this.newColor(),
      id: newId,
    }

    array.push(newCircle)
    this.setState({ circles: array })

    setTimeout(() => {
      if (newCircle.id === newId) {
        const array = this.state.circles
        const updateArr = array.filter(x => x!== newCircle);
        this.setState({ circles: updateArr })
      }
    }, 2000)
  }

  randomColorValue() {
    return Math.floor(Math.random() * (255 + 1));
  }

  newColor() {
    const color = {r: this.randomColorValue(), g: this.randomColorValue(), b: this.randomColorValue()};
    return `rgb(${color.r}, ${color.g}, ${color.b})`
  }

  box() {
    return this._box && this._box.getBoundingClientRect()
  }

  render() {
    const { mounted } = this.state

    return (
      <AppContainer ref={ref => this._box = ref}>
      {mounted &&
        <PaperContainer
            width={this.box().width}
            height={this.box().height}>
          <Layer>
            <Layer>
              {this.state.circles.map(circle => (
                <Circle center={[circle.x, circle.y]} radius={8} fillColor={circle.color} />
              ))}
            </Layer>
          </Layer>
        </PaperContainer>
      }
      </AppContainer>
    );
  }
}

const PaperContainer = styled(View)`
  background: black;
`
const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`
export default App;
