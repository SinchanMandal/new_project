
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require('request');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.send('Hello world')
});


app.get('/todos',(req,res)=>{
    
    const url="https://jsonplaceholder.typicode.com/todos";
      request(url,function (error, response, body) {
        //  console.log(process.env.api_key)
          console.error('error:', error);
              if (!error&&response.statusCode==200) {
                  console.log(response)
                  const data=JSON.parse(body)
                console.log(data[0].id);
                  console.log(data.length+69)
                      let todolist=[];
                      for(let i=0;i<data.length;i++)
                      {  
                      
                        let a={
                            "id": "",
                           "title": "",
                           "completed": " "
                              }
                          a.id=data[i].id;
                          a.title=data[i].title;
                          a.completed=data[i].completed;
                          console.log(a);

                         todolist.push(a);
                      }
                      res.send(todolist)
                  
              }
             else {
                  res.send('Error');
             }
          })


});





app.get("/user/:id",(req, res)=>{
    let usertodo=[];

/////////////////////
let ind1=req.params.id;
const url1="https://jsonplaceholder.typicode.com/todos";
request(url1,function (error, response, body) {
  //  console.log(process.env.api_key)
    console.error('error:', error);
        if (!error&&response.statusCode==200) {
            console.log(response)
            const data=JSON.parse(body)
         // console.log(data[0].id);
          //  console.log(data.length+69)
           /*     
            let a={
                "id": "",
               "title": "",
               "completed": " "
                  }
              a.id=data[ind1-1].id;
              a.title=data[ind1-1].title;
              a.completed=data[ind1-1].completed;
              let todo={
                 "tododatails":a
              }
              console.log(todo)
               usertodo.push(todo)
               // res.send(todolist)
            */



               let todolist=[];
               for(let i=0;i<data.length;i++)
               {  
               
                 let a={
                     "id": "",
                    "title": "",
                    "completed": " "
                       }
                   a.id=data[i].id;
                   a.title=data[i].title;
                   a.completed=data[i].completed;
                   console.log(a);

                  todolist.push(a);
               }
               let todo={
                "tododatails":todolist
             }
               usertodo.push(todo)
                //usertodo.pop();
        }
       else {
            res.send('Error');
       }
    })


////////////////////////////////////////////////////////////////////











   const url= 'https://jsonplaceholder.typicode.com/users/?{req.params.id}';
  
   request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        const data = JSON.parse(body)
        //console.log(data);
       console.log(req.params.id);
       let ind=req.params.id;
       usertodo.push(data[ind-1]);
       
       console.log(usertodo)
       res.send(usertodo)
    }else{
        res.send('Error');
    }
});

console.log(usertodo)
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
