import React, { Component } from 'react';
import Task from './Task';
import './TaskList.css';
import _ from 'lodash';

class TaskList extends Component {	

	shouldComponentUpdate(nextProps, nextState) {
		return !_.isEqual(this.props.tasks, nextProps.tasks);
	}
  
	render() {
		const tasks = this.props.tasks.map((task, k) =>
			<Task key={k} id={task._id} title={task.title} deleteTask={this.props.deleteTask} />);
		return (
			<div className="TaskList">
			{tasks}
			</div>
		);
	}
}

export default TaskList;