const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

const app=express();
dotenv.config();
const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('MongoDB connected'))
    .catch(err=>console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(PORT,()=>console.log(`Server started http://localhost:${PORT}`));