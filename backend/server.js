const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieparser=require('cookie-parser');

const app=express();
dotenv.config();
const PORT=process.env.PORT || 5000;

const signupRoute=require('./routes/signupRoute');
const loginRoute=require('./routes/loginRoute');
const logoutRoute=require('./routes/logoutRoute');
const {auth}=require('./services/auth');

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('MongoDB connected'))
    .catch(err=>console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

app.use('/api/signup',signupRoute);
app.use('/api/login',loginRoute);
app.use('/api/logout',logoutRoute);

app.get('/',auth,(req,res)=>{
    res.send('Hello World');
})

app.listen(PORT,()=>console.log(`Server started http://localhost:${PORT}`));