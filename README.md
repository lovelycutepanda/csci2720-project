![react](https://img.shields.io/github/package-json/dependency-version/lovelycutepanda/csci2720-project/react)
![mongodb](https://img.shields.io/github/package-json/dependency-version/lovelycutepanda/csci2720-project/mongodb)
![mongoose](https://img.shields.io/github/package-json/dependency-version/lovelycutepanda/csci2720-project/mongoose)
![bootstrap](https://img.shields.io/github/package-json/dependency-version/lovelycutepanda/csci2720-project/bootstrap)
![mapbox-gl](https://img.shields.io/github/package-json/dependency-version/lovelycutepanda/csci2720-project/mapbox-gl)
![react-toastify](https://img.shields.io/github/package-json/dependency-version/lovelycutepanda/csci2720-project/react-toastify)
![bcrypt](https://img.shields.io/github/package-json/dependency-version/lovelycutepanda/csci2720-project/bcrypt)

# Overview
This is the project of 2022-23 1st semester CSCI2720 Group 9.

In this project, we try to set up a web application that allows users to check details of cultural events in different locations. 

# Functionalities
The user will be able to view a list of locations available as well as a map showing all the locations. The user can filter some locations using either keywords or his favourite list, or both. The user can also view the list of locations with different sorting order of event numbers in that location.

By selecting a single location, the user can visit the location's details, including position in map, a list of events in the location, as well as comments for the location. The user can leave a comment for the location, which can be seen by other users.

We also have an admin role for basic CRUD (Create, Retrieve, Update, Delete) actions on users, locations and events data respectively. 

# Objective
We hope that through this project, the users can get real-time information about different events held in different locations in a clear manner. 

Although being a miniscule project, we see potential in it when we can extend the database and functionalities. For instance, we may redirect the user to the event registration system upon clicking an event, so that it may serve as a platform for practical event registration.

# Running the website
The website is being hosted on an AWS EC2 virtual machine, which requires activating the instance and starting the server. However, the service is provided as a student free account which will expire soon.

In order to run this project locally, one may clone this repository and create a file called .env in the root directory. Inside the .env file, include the following:

MONGODB_URI=(uri for mongoDB)
REACT_APP_MAPBOXGL_ACCESS_TOKEN=(access token for Mapbox GL)
REACT_APP_MAPBOXGL_STYLE=(style link for Mapbox GL)

After that, create a production build, for instance using "npm run build", and run the website by "node src/backend/server.js". The website will be available in localhost on port 80.

# Groupmates / Collaborators
Tam King Man https://github.com/marcotam2002 <br>
Ku Nok Tik https://github.com/lovelycutepanda <br>
Tung Yuen Lok https://github.com/JohnnyTung123 <br>
Lai Cheuk Lam https://github.com/lclam027 <br>
Wong Wai Chun https://github.com/MaxWongProgramming
