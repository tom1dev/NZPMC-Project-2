# NZPMC-Project-2

This is the Second miniproject created by tdev429(tom).

## About the project:
### Project Stack:
 * JavaScript
 * MongoDB
 * Java
 * SpringBoot

This project is a user event registration site where users can join events after signing in. Admins can also view all users and create events directly through the application.

### Key Design Decisions:
This project contains many key design decisions that were integral to the design past the initial project requirements and decisions:

- Sidebar: The sidebar is key for allowing the user to always be in control of their login status and account details. Adding the sidebar now will allow for easier routing between page features as the site's requirements grow.

- Security, Authentication, and Cookies: Security is a major concern when creating online applications and websites. As such, I applied hashing before storing user passwords, as well as sending the user a jwt authorisation token after they sign in. This JWT token is used to authorise the user to use certain endpoints in the backend. For example, a query with no JWT token (e.g. non, non-signed-in user) cannot access the get-user info endpoint, or a non-admin user cannot access the create-event endpoint. This JWT token is also used in the cookie to save user sign-in even if the page is refreshed.

- Event and user detail popups: I have opted to use popups for showing user and event details. This has allowed me more flexibility in the number of parameters and the way I display parameters for events and users. For example, this has allowed me to add additional parameters to the event display (number of attendees and location) without making the pages look chunky.

- Signout: I have also opted to add a signout button as users may want to use different accounts. For example, an admin may also want a regular user account.

- Scalability: When designing this project, scalability is a major concern as the requirements grow. I have implemented good code design practices, such as single responsibility principles and restful architecture, to combat this. I have also implemented elements in the website, such as pop-ups, to see additional parameters and use components well.

The Initial Wireframe of the project with some of these attributes is visible here (please note this is the initial design and doesn't reflect the final design and state of the project):
![wireFrame](https://github.com/user-attachments/assets/21bb5adb-af08-4d38-b07d-80ab18e7e92c)


## Structure:

### FrontEnd:
Created using a vite template.
#### /src/:
- /App.jsx: initialises our pages and defines the routes between them('/','/signin','/admin')

- /pages/: contains main .jsx component for each page(Admin,Landing,Signin)

- /components/: contains supplementary components used by /src/pages

- /styles/: contains CSS styles used by the components

- /services/: contains services used for querying the backend

### Backend:

#### /routers/:
-    defines endpoint for different user queries

#### /controllers/:
-   controls the data manipulation of HTTP requests and responses

#### /services/:
-   used to query mongoDB and return responses.

#### /models/:
-   contains the MongoDB schemas and objects for different objects stored in the database



## Getting Started:
To run the dev version of the application, we will need to perform initialisation for both the frontend and backend.

### General:
1. clone the project (git Clone)

### Frontend:
1. In the 'frontend' folder, run 'npm install'
2. In the 'frontend' folder, run 'npm run dev'

### Backend:
1. mvn install
2. .env file is required to run this application in the 'backend' directory. It contains the URI for the database, A preferred port for the backend to run on, and the secret key for generating jwt auth tokens. It can be created with the template here:
<br>
<br>
MONGODB_URI  = {MongoDB URI HERE}
<br>
PORT = {PortNum}
<br>
JWT_SECRET = "{secret here}"

3. Run backend from BackendApplication
