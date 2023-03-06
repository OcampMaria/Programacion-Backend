import express from "express";

const app = express();

app.get('/saludo', (req,res)=>{
    res.send("Hola!!!");
});

app.listen(8080, ()=> console.log('listening inport 8080'))