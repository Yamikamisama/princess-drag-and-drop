import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import { detectIE, detectFirefox, detectSafari, setDragScroll } from './helpers';
import { getEmptyImage } from 'react-dnd-html5-backend';
import flow from 'lodash/flow';
import Text from './Text';

const style = {
  backgroundColor: 'transparent',
  cursor: 'move',
  display: 'inline-block',
  height: '278px',
  margin: '.5rem',
  textAlign: 'center',
  width: '235px',
};

class Card extends Component {

  shouldComponentUpdate = shouldPureComponentUpdate

  componentWillMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      // IE workaround
      captureDraggingState: detectIE(),
    });
    if (detectFirefox() || detectSafari()) {
      setDragScroll();
    }
  }

  render() {
    const { imgSrc, card, canTransform, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1; 
    const transform = canTransform ? 'scale(.8)' : 'none';
    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity, transform }}>
        {imgSrc ? <img style={{WebkitUserDrag: "none", maxWidth: '235px'}} src={imgSrc} /> : null}
        <Text text={card.text}/>
      </div>
    ));
  }
}

const cardSource = {

  beginDrag(props) {    
    return {      
      index: props.index,
      listId: props.listId,
      card: props.card
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult(); 

    if ( dropResult && dropResult.listId !== item.listId ) {
      props.removeCard(item.index);
    }
  }
};

const cardTarget = {

  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;  

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    if ( props.listId === sourceListId ) {
      props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }   
  }
};

export default flow(
  DropTarget("CARD", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("CARD", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))
)(Card);