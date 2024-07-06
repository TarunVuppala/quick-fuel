const express=require('express');
const mongoose=require('mongoose');

const app=express();

const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(PORT,()=>console.log(`Server started http://localhost:${PORT}`));