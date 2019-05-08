import React, { Component } from 'react';
import { Stage, Layer, Circle, Text } from 'react-konva';
import Konva from 'konva';
import styled, { keyframes } from 'styled-components';
import uuidv4 from 'uuid/v4';
import {Spring} from 'react-spring/renderprops';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      circles: [],
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', () => this.onKeyDown())
  }


  componentWillUnmount() {
  }


  onKeyDown(event) {
    const array = this.state.circles;

    const newId = uuidv4();
    const newCircle = {
      x: Math.floor(Math.random() * (window.innerWidth + 1)),
      y: Math.floor(Math.random() * (window.innerHeight + 1)),
      color: Konva.Util.getRandomColor(),
      duration: ((Math.random() * 1.7) + 0.5) * 1000,
      id: newId,
    }

    array.push(newCircle);
    this.setState({ circles: array });

    setTimeout(() => {
      if (newCircle.id === newId) {
        const array = this.state.circles
        const updateArr = array.filter(x => x!== newCircle);
        this.setState({ circles: updateArr })
      }
    }, newCircle.duration)
  }

  render() {
    return (
      <StyledStage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {this.state.circles.map(circle => (
            <Spring key={circle.id} config={{ duration: circle.duration }} from={{ radius: 100 }} to={{ radius: 0 }}>
              {props => (
                [
                  <Circle radius={props.radius} x={circle.x} y={circle.y} fill={circle.color} />,
                  <Circle radius={props.radius + 5} x={circle.x} y={circle.y} stroke={'white'} />,
                  <Circle radius={props.radius + 15} x={circle.x} y={circle.y} stroke={circle.color} />,
                  <Circle radius={props.radius + 20} x={circle.x} y={circle.y} stroke={'white'} />
                ]
              )}
            </Spring>
          ))}
        </Layer>
      </StyledStage>
    );
  }
}

const StyledStage = styled(Stage)`
  background: black;
`
const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`
const zoom = keyframes`
    0% {
        transform: scale(1,1);
    }
    100% {
        transform: scale(0,0);
    }
`
const StyledCircle = styled.circle`
  /* transform: scale(2); */
  transition: transform 3s;
`
export default App;
