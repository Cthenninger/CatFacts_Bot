import restify = require('restify');
import Router = require('restify-router');
import builder = require('botbuilder');
import Bot = require('./bot');

console.log('Configuring web server...');
var server = restify.createServer({name: "test"});
server.listen(3978, () => {
    console.log('The bot server is now running on port %s and is ready to receive requests', 3978);
});

const chatbot = new Bot();

server.post('/api/messages', chatbot.connector.listen());
server.get('/get', function(req,res) {
    console.log("Get Request Received");
});

