import React, { Component } from 'react';
import './App.css';
import TaskList from './TaskList';
import _ from 'lodash';

class App extends Component {

  constructor() {
    super();
    this.state = {
		tasks: []
    };
	
	this.addTask = this.addTask.bind(this);
	this.deleteTask = this.deleteTask.bind(this);
  }
  
  retrieveTasks() {
	console.log("In retrieveTasks");
	  var app = this;
	  return fetch(`api/tasks`)
	  .then(function(res) {
		  return res.json();
	  }).then(function(data) {
		  console.log("In retrieveTasks: (1)" + JSON.stringify(data, null, 2));
		  app.setState({ tasks: data.sort() });
	  });
  }
  
  addTask(event) {
	  var app = this;
	  var task = { title: event.target.elements.title.value, isDone: false };
	  var body = JSON.stringify(task);
	  console.log("Posting: " + body);
	  fetch(`api/task`, {
 		  headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
 		  },
 		  method: "POST",
		  body: body
	  }).then(function(res) {
		  return res.json();
	  }).then(function(data) {
		  var tasks = app.state.tasks.concat([data]);
		  app.setState({ tasks: tasks });
	  });
	  event.preventDefault();
  }
    
  deleteTask(id) {
	  console.log("In deleteTask, id: " + id);
	  event.preventDefault();
  }

  shouldComponentUpdate(nextProps, nextState) {
	return !_.isEqual(this.state.tasks, nextState.tasks);
  }
  
  componentWillMount() {
	   console.log("In componentWillMount");
	this.retrieveTasks();
  }
  
  componentDidUpdate() {
  }
  
  render() {
	  // console.log("IN App.render(), tasks: " +  + JSON.stringify(this.state.tasks));
	return (
		<div className="container">
			<h1>MyTaskList</h1>
			<hr/>
			<form className="well" onSubmit={this.addTask}>
			   <div className="form-group">
				   <input type="text" name="title" className="form-control" placeholder="Add Task..."/>
			   </div>
			</form>
			<TaskList tasks={this.state.tasks} deleteTask={this.deleteTask}/>
		</div>    );
  }
}

export default App;
