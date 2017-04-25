import React, { Component } from 'react';
import './Task.css';
import _ from 'lodash';

class Task extends Component {
	constructor() {
		super();
		
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return !_.isEqual(this.props, nextProps)
	}
  
	handleSelect() {
		this.props.updateTask(this.props.id, this.props.title, this.props.selected);
	}
	
	handleClickDelete() {
		event.preventDefault();
		console.log("Delete button clicked");
		this.props.deleteTask(this.props.id);
	}
	
	render() {
		console.log("In render, id is: " + this.props.id);
		return (<span className="Task"><div className="col-md-1">
            <input name="select" type="checkbox" checked={this.props.selected} onChange={this.handleSelect} />
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