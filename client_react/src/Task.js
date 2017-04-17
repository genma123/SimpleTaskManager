import React, { Component } from 'react';
import './Task.css';

class Task extends Component {
	shouldComponentUpdate(nextProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
		return true;
	}
  
	render() {
		return (<span className="Task"><div className="col-md-1">
            <input name="select" type="checkbox"/>
        </div>  
        <div className="col-md-7">
            {this.props.title}
        </div>
        <div className="col-md-4">
            <input type="button" value="Delete" className="btn btn-danger"/>
        </div>
        <br/><br/></span>);
	}
}

export default Task;