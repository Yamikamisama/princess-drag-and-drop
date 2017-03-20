import React, { Component } from 'react';
export default class Text extends Component {

  render() {
    const { text } = this.props;

    return (
    	<div>
    	{text}
    	</div>
    );
  }
}
