# Car-Dealership-Project
How to setup and run the Project
1.	Open terminal and go to frontend folder : cd frontend
2.	now install all dependencies for frontend project: npm install or npm i
3.	now run the frontend project : npm run start 
4.	now open beside new terminal and go to backend folder: cd backend
5.	now install all dependencies for backend project : npm install or npm i
6.	once all dependencies installed, backend server by running either: node index.js or nodemon index.js (if nodemon is installed in the system)

All API Documentation
1.	SignUp
a.	Method: “POST”
b.	End point: http://localhost:8000/register
c.	Body: { "name": "dax", "email": "dax@gmail.com", "password" : "123" }
2.	Login
a.	Method: “POST”
b.	End point: http://localhost:8000/login
c.	Body: { "email": "dax@gmail.com", "password" : "123" }
If you want to login as admin then use the below credentials: 
•	Email: admin@gmail.com
•	Password: “admin@123”
3.	Logout
a.	Method: “GET”
b.	End point: http://localhost:8000/logout
4.	Get All Cars
a.	Method: “GET”
b.	End point: http://localhost:8000/car
5.	Get particular Car
a.	Method: “GET”
b.	End point: http://localhost:8000/car/123
6.	Create Car
a.	Method: “POST”
b.	End point: http://localhost:8000/car
c.	Body: { "make": "Honda", "model": "CR-V", "year": 2016,  "color": "white", "price": 200000,  "mileage": 18,  "fuel": "petrol", "transmission": "Automatic", "engineSize": 1600”, "vin": “s12f1sd2f14sa5da”,  "file": Select file }
d.	Note: All data pass as a from-data in postman collection.
7.	Update Car
a.	Method: “PUT”
b.	End point: http://localhost:8000/car/123
c.	Body: { "make": "Honda", "model": "CR-V", "year": 2016,  "color": "white", "price": 200000,  "mileage": 18,  "fuel": "petrol", "transmission": "Automatic", "engineSize": 1600”, "vin": “s12f1sd2f14sa5da”,  "file": Selected file }
d.	Note: All data pass as a from-data in postman collection.
8.	Delete Car
a.	Method: “DELETE”
b.	End point: http://localhost:8000/car/123
9.	Car buy request to admin
a.	Method: “POST”
b.	End point: http://localhost:8000/carStatus
c.	Body: Body: {"userId" : "dasd81487f8eaf1e04", "carId" : "a8dds24787f8eaf1easdad", "carStatus": "Pending" }
10.	Fetch car request
a.	Method: “GET”
b.	End point : http://localhost:8000/CarStatus
11.	Approve request from admin side
a.	Method: “PUT”
b.	End point: http://localhost:8000/carStatus/:id
c.	Body: Body: {"carStatus": "Sold" }

