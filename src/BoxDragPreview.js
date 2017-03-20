import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import Card from './Card';

const styles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  transform: 'scale(.7)',
  opacity: '.6',
  height: '100%',
  backgroundImage: 'none',
};

export default class BoxDragPreview extends Component {

  shouldComponentUpdate = shouldPureComponentUpdate;
  
  render() {
    const transform = true;
    const {card} = this.props;
    return (
      <div style={styles}>
        <Card card={card} imgSrc={card.img}/>
      </div>
    );
  }
}