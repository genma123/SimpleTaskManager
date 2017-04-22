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
		  // console.log("In retrieveTasks: (1)" + JSON.stringify(data, null, 2));
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

  shouldComponentUpdate(nextProps, nextState) {
		  /* console.log("In shouldComponentUpdate: length is " + this.state.tasks.length);
		  console.log("In shouldComponentUpdate: length is " + nextState.tasks.length); */
		 // THIS WON'T WORK ONCE WE START MODIFYING TASKS:
	   var shouldUpdate = this.state.tasks.length !== nextState.tasks.length;
	   console.log("In shouldComponentUpdate, shouldUpdate: " + shouldUpdate);
	return shouldUpdate;
  }
  
  componentWillMount() {
	   console.log("In componentWillMount");
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
			<TaskList tasks={this.state.tasks} deleteTask={this.deleteTask}/>
		</div>    );
  }
}

export default App;
