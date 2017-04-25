import React, { Component } from 'react';
import Task from './Task';
import './TaskList.css';
import _ from 'lodash';

class TaskList extends Component {	

	/* NOT NEEDED
	shouldComponentUpdate(nextProps, nextState) {
		return !_.isEqual(this.props.tasks, nextProps.tasks);
	} */
  
	render() {
		// TODO should use id as key not index
		const tasks = this.props.tasks.map((task) =>
			<Task key={task._id} id={task._id} title={task.title} selected={task.isDone} deleteTask={this.props.deleteTask} updateTask={this.props.updateTask} />);
		return (
			<div className="TaskList">
			{tasks}
			</div>
		);
	}
}

export default TaskList;