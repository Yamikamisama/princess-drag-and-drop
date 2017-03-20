import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import CustomDragLayer from './CustomDragLayer';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
 
class App extends Component {
 
  render() {
    const style = {
      display: "flex",
      justifyContent: "space-around",
      paddingTop: "20px"
    }
 
    const listOne = [
      { id: 1, img: "https://s3.amazonaws.com/michaelangelotest/peach.png" },
      { id: 2, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 3, img: "https://s3.amazonaws.com/michaelangelotest/goomba.png" },
      { id: 4, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 5, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 6, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 7, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 8, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 9, img: "https://s3.amazonaws.com/michaelangelotest/goomba.png" },
      { id: 10, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 11, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 12, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 13, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 14, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 15, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 16, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 17, img: "https://s3.amazonaws.com/michaelangelotest/goomba.png" },
      { id: 18, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 19, img: "https://s3.amazonaws.com/michaelangelotest/goomba.png" },
      { id: 20, img: "https://s3.amazonaws.com/michaelangelotest/goomba.png" },
      { id: 21, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 22, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 23, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 24, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 25, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 26, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
      { id: 27, img: "https://s3.amazonaws.com/michaelangelotest/goomba.png" },
      { id: 28, img: "https://s3.amazonaws.com/michaelangelotest/block.png" },
    ];
 
    return (
      <div>
        <CustomDragLayer/>
        <Container id={1} list={listOne} />
      </div>
    );
  }
}
 
export default DragDropContext(HTML5Backend)(App);
