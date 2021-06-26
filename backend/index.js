const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3');
const { request } = require('express');

let database;
app.use(express.json());
app.use(bodyParser.json());
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
sqlite
  .open({ driver: sqlite3.Database, filename: 'myDb.sqlite' })
  .then((database_) => {
    database=database_;
  })

app.get('/', (request, response) => {
  //response.send('fhdfghfg!')
  database.all('SELECT * FROM todo').then(rows => {
    response.send(rows)
    
  })
  
})

app.post('/newTask',(request,response)=>{
  database
  .run("INSERT INTO todo VALUES(?,?)",[null,
    request.body.newTask
  ])
  .then(()=>{
    console.log('A row has been inserted:'+request.body.newTask)
  })
  

})
 app.post('/deleteTask',(request,response)=>{
   let deleteItem=request.body.id
   database
   .run("DELETE FROM todo WHERE id="+
     deleteItem
   )
  .then(()=>{
    console.log('A row has been deleted:'+request.body.description)
   })
 })

 //Update Row
 app.post('/updateTask',(request,response)=>{
  let updateItem=request.body
  database
  .run("UPDATE todo SET description=? WHERE id=?",[updateItem.description,updateItem.id]
    
  )
 .then(()=>{
   console.log('A row has been updated:'+request.body.description)
  })
})



app.listen(3000, () => {
  console.log('Webbtjänsten kan nu ta emot anrop.')
})
