import React, { Component } from 'react';
import './App.css';
import TaskList from './TaskList';
import Client from './Client';
import _ from 'lodash';

class App extends Component {

  constructor() {
    super();
    this.state = {
		tasks: []
    };
	
	this.addTask = this.addTask.bind(this);
	this.deleteTask = this.deleteTask.bind(this);
	this.updateTask = this.updateTask.bind(this);
  }
  
  retrieveTasks() {
	console.log("In retrieveTasks");
	  Client.retrieve((data) => this.setState({ tasks: data.sort() }));
  }
  
  addTask(event) {
	  Client.add(event, (data) => this.setState({ tasks: this.state.tasks.concat([data]) }));
	  event.preventDefault();
  }
  
  updateTask(id, title, selected) {
	  var app = this;
	  var task = { title: title, isDone: !selected };
	  var body = JSON.stringify(task);
	  console.log("Updating " + id + ": " + body);
	  fetch(`api/task/${id}` , {
 		  headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
 		  },
 		  method: "PUT",
		  body: body
	  }).then(function(res) {
		  return res.json();
	  }).then(function(data) {
		  var tasks = app.state.tasks;
		  var index = _.findIndex(tasks, { "_id": id });
		  // console.log("id: " + id + ", index: " + index + ", task: " + JSON.stringify(tasks[index]) + ", data: " + JSON.stringify(data));
		  task._id = id;
		  tasks[index] = task;
		  // console.log(" tasks: " +  JSON.stringify(tasks, null, 2));
		  app.setState({ tasks: tasks });
	  });
  }
  
  deleteTask(id) {
	  console.log("In deleteTask, id: " + id);
	  var app = this;
	  fetch(`api/task/${id}` , {
 		  headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
 		  },
 		  method: "DELETE",
	  }).then(function(res) {
		  return res.json();
	  }).then(function(data) {
		  app.setState({ tasks: _.filter(app.state.tasks, function(t) { return t._id !== id; }) });
	  });
  }
  
  componentWillMount() {
	   // console.log("In componentWillMount");
	this.retrieveTasks();
  }
  
  componentDidUpdate() {
  }
  
  render() {
	// console.log("IN App.render(), tasks: " +  JSON.stringify(this.state.tasks, null, 2));
	return (
		<div className="container">
			<h1>MyTaskList</h1>
			<hr/>
			<form className="well" onSubmit={this.addTask}>
			   <div className="form-group">
				   <input type="text" name="title" className="form-control" placeholder="Add Task..."/>
			   </div>
			</form>
			<TaskList tasks={this.state.tasks} deleteTask={this.deleteTask} updateTask={this.updateTask} />
		</div>    );
  }
}

export default App;
