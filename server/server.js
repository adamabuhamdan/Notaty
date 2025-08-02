const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");

const app = express();
const Database=require('./Database');
const db=new Database();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



//create POST api to be able to create new note
app.post('/notes',(req,res) => {
    const body=req.body;
    console.log("body : ",body);
    db.addNote(body)
    .then(data => {
        res.send(data);
    })
   .catch(err => {
    res.status(500).send(err);
   })
});

//create GET api to be able to create new note
app.get('/notes',(req,res)=>{
    const {title}=req.query;
    if(title){
         db.getNotesByTitle(title)
        .then(data => {
        res.send(data);
        })
       .catch(err => {
        res.status(500).send(err);
    });
    }else{
        db.getNotes()
        .then(data => {
        res.send(data);
        })
       .catch(err => {
        res.status(500).send(err);
    });
    }
  
});

app.get('/notes/:id',(req,res)=>{
    const {id}=req.params;
    db.getNoteById(id)
    .then(data => {
        if(!data){
            res.status(404).send("note id does not exist",id);
        }
        else{
             res.send(data);
        }
       
    })
   .catch(err => {
    res.status(500).send(err);
   });
});

//PUT
app.put('/notes',(req,res)=>{
    
    db.updateNote(req.body)
    .then(data => {
        if(!data){
            res.status(404).send("note id does not exist",id);
        }
        else{
             res.send(data);
        }
       
    })
   .catch(err => {
    res.status(500).send(err);
   });
});
//delete
app.delete('/notes/:id',(req,res)=>{
    const {id}=req.params;
    db.deleteNote(id)
    .then(data => {
        if(!data){
            res.status(404).send("note id does not exist",id);
        }
        else{
             res.send(data);
        }
       
    })
   .catch(err => {
    res.status(500).send(err);
   });
});

const port=3000;
app.listen(port,() => {
    console.log(`server has beem started on port ${port}..`);
    db.connect();
});
