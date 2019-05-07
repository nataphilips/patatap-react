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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resizeWindow())
  }

  makeGrid() {
    const xDots = 10;
    const yDots = 10;

    const grid = []

    console.log(this.box().width, this.box().height)
    for (var i = 0; i < xDots; i++) {
      for (var j = 0; j < yDots; j++) {
        const center = [
          i * this.box().width / (xDots - 1),
          j * this.box().height / (yDots -1),
        ]
        //console.log(center)
        grid.push(<Circle center={center} radius={8} fillColor="pink" />)
      }
    }
    return grid;
  }

  box() {
    return this._box && this._box.getBoundingClientRect()
  }

  render() {
    const { mounted } = this.state
    mounted && console.log(' RENDER ', this.box().width, this.box().height)
    return (
      <AppContainer ref={ref => this._box = ref}>
      {mounted &&
        <PaperContainer
            width={this.box().width}
            height={this.box().height}>
          <Layer>
            <Layer>
              {this.makeGrid()}
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
