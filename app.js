
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
   
    let mylist={};
    let userdata={};


   const url= 'https://jsonplaceholder.typicode.com/users/?{req.params.id}';
  
   request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        const data = JSON.parse(body)
       console.log(req.params.id);
       let ind=req.params.id;
      
       userdata=data[ind-1];
    
    }else{
        res.send('Error');
    }
});



const url1="https://jsonplaceholder.typicode.com/todos";
request(url1,function (error, response, body) {
 
    console.error('error:', error);
        if (!error&&response.statusCode==200) {
            console.log(response)
            const data=JSON.parse(body)
        
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
                "todos":todolist
             }
                
               mylist={
                 ...userdata,
                 ...todo
               }
                res.send(mylist)
        }
       else {
            res.send('Error');
       }
    })


});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
