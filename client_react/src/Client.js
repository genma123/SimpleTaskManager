function retrieve(cb) {
  return fetch(`api/tasks`)
  .then(function(res) {
	  return res.json();
  }).then(cb);
}

function add(event, cb) {
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
  }).then(cb);
}

const Client = { retrieve, add };
export default Client;