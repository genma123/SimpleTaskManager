import React, { Component } from 'react';
import Task from './Task';
import './TaskList.css';

class TaskList extends Component {	

	shouldComponentUpdate(nextProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
		return true;
	}
  
	render() {
		const tasks = this.props.tasks.map((task, k) => <Task key={k} title={task.title}/>);
		return (
			<div className="TaskList">
			{tasks}
			</div>
		);
	}
}

export default TaskList;