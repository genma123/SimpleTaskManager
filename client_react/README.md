


# React Client for Simple Task Manager Example #
## Set-up ##
### Using Create React App ###
First install [Create React App](https://github.com/facebookincubator/create-react-app)
Then navigate to the home SimpleTaskManager folder, invoke with:
`create-react-app client_react`
Then navigate into the client_react folder. Replace or add files in the public and src folders with artifacts from this repository.
### Starting REST API ###
Open a separate CMD or shell session in the parent SimpleTaskManager folder and perform
`npm install`
Then set environment variables PORT and MONGODB_URI to the port number you want for the REST API and the URI for your MongoDB instance. In this example, 5000 is the recommended port number. Launch using node, nodemon, or npm run start.
Use curl,  Postman, or an ordinary browser to test. To get all tasks as an array of JSON objects, send a GET request to http://localhost:5000/api/tasks.
## Starting Development Server With WebPack ##
Return to the first command-line session opened. Modify package.json to contain the line:
`  "proxy": "http://localhost:5000/",`
(The version in the repository has already been modified in this way).
Assign some number other than 5000 to PORT (assume 5001 for this example).
Launch with:
`npm run start`
On Windows, the UI should launch within a new tab of whatever your default browser is. Probably other OSes as well. 
Otherwise open the URL http://localhost:5001/ (according to this example). You should see the same UI, and it will reload when you update your code (and display compilation errors when "appropriate".
## Running in Production Mode ##
Return to the second command-line session that was opened. Kill the REST API server. Set the NODE_ENV environment variable to "production" (case-sensitive). Build the production release package with:
`npm run build`
Then launch as before.
Now if you point your browser to http://localhost:5000/ you should see the Production version of the UI. If done with development, you can shut the development instance (on port 5001) down.
> Written with [StackEdit](https://stackedit.io/).
