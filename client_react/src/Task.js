import React, { Component } from 'react';
import './Task.css';

class Task extends Component {
	constructor() {
		super();
		
		this.handleClickDelete = this.handleClickDelete.bind(this);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.title !== nextProps.title;
	}
  
	handleClickDelete() {
		event.preventDefault();
		console.log("Delete button clicked");
		this.props.deleteTask(this.props.id);
	}
	
	render() {
		console.log("In render, id is: " + this.props.id);
		return (<span className="Task"><div className="col-md-1">
            <input name="select" type="checkbox"/>
        </div>  
        <div className="col-md-7">
            {this.props.title}
        </div>
        <div className="col-md-4">
            <input type="button" onClick={this.handleClickDelete} value="Delete" className="btn btn-danger"/>
        </div>
        <br/><br/></span>);
	}
}

export default Task;