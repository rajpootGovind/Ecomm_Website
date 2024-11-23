I created a backend for managing products and categories for an e-commerse website, by using node.js, express.js and mongoDB.
We use Restful APIs for CRUD operations.
Whole Process- Firstly we setup our project with installing Express, Mongodb, dotenv and validators by command npm install. and initiate Git by git init.
Primarly we created server.js file in we connect database to our project and runs our server on specific port.
Then we create our backend by 3-tier architechture Models, Routes and Controllers.
Firstly we create category schema with validators. than we create category controller for create category, get all categories, get category by id with products, update category and delete category without deleting products. Than we creates routes for all of these. inside routes we mentioned the endpoints of our APIs. Same process we follow for product for creating products APIs.
Time to time we tested our APIs by a tool (POSTMAN) and commit and push our code in GitHub . for deployment We use a tool (VERCEL).
Deployment- we make some changes on server.js like removing local server and export app to vercel, add cors, body-parser dependencies then we create index.js for entry and import app in to it. we created another file vercel.json used for routing and build instruction. 
than in vercel we add project and deploy it. Thats the process of this project.

