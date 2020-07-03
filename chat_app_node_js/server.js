var express = require('express');
const { Socket } = require('net');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
const { send } = require('process');

var dbUrl = 'mongodb://user:user@localhost:27017/chat_app'


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Message = mongoose.model('Message', {
    name: String,
    message: String
});

app.get('/messages', (req, res) =>{
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
});

app.get('/messages/:user', (req, res) =>{
    var user = req.params.user;
    Message.find({name: user}, (err, messages) => {
        res.send(messages);
    })
});

app.post('/messages', async (req,res) => {

    try {
        var message = new Message(req.body);
        var saveMessage = await message.save();
        var censored = await Message.findOne({ message: 'zalupa'});

        if (censored){
            await Message.deleteOne({_id: censored.id});
            }
        else
            io.emit('message', req.body);
            
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        return console.error(error);
    }
    
    });

io.on('connection', (socket) => {
    console.log('user connected...')
});

mongoose.connect(dbUrl , {useNewUrlParser: true, useUnifiedTopology: true},  (err) => {
    console.log('mongo db connection', err);
});

var server = http.listen(3000, () => {
    console.log('server is on port', server.address().port)
});