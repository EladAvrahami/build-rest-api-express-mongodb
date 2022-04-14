dependencies command : 
npm init --y 
npm i express mongoose

npm i --save-dev dotenv nodemon
start nodemon -> package.json->remove textScript->add instead: 
"devStart" : nodemon server.js

and to start node mon just type on terminal "npm run devStart"




download VS extension called REST client
allows me to call a rest api directly from VS code  INSTEAD Postman
(open new file format rest (fileName.rest for example ))