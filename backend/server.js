const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const cors=require('cors')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('sendLocation', (data) => {
        console.log('emitting');
        io.emit('receiveLocation', {id:socket.id,...data});
    });
    socket.on('disconnect', () => {
        io.emit('userDisconnect', socket.id);
    })
    console.log('We have a new connection');
});

dotenv.config();
const PORT = process.env.PORT || 5000;

const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');
const logoutRoute = require('./routes/logoutRoute');
const agentAuth = require('./routes/agentAuth');
const mechanicAuth = require('./routes/mechanicAuth');
const order=require('./routes/order')

const { auth } = require('./services/auth');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/logout', logoutRoute);
app.use('/api/agent', agentAuth);
app.use('/api/mechanic', mechanicAuth);
app.use('/api/order',order)
app.post('/api/verify',auth,async(req,res)=>{
    res.status(200).json({success:true})
})

app.get('/', auth, (req, res) => {
    res.send('Hello World');
});

server.listen(PORT, () => console.log(`Server started http://localhost:${PORT}`));
