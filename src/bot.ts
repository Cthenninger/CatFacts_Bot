import builder = require('botbuilder');
import https = require('https');
import restify = require('restify')
import parrot = require('./dialogue/parrot');
import cat = require('./dialogue/cat');

class Bot {

    public connector: builder.ChatConnector;

    private bot: builder.UniversalBot;
    private dialog: builder.IntentDialog;
    private memory: builder.MemoryBotStorage;

    private registerDialogs() {
        (new parrot()).register(this.bot, 'Parrot');      
        (new cat()).register(this.bot, 'Cat');
    }

    constructor() {
        this.connector = new builder.ChatConnector();
        console.log('WARNING: Starting bot without ID or Secret');

        
        this.bot = new builder.UniversalBot(this.connector, function(session){
            session.send("Sorry, I don't recognize that command. You can use these commands to start a conversation with me: \"parrot\" | \"cat\""); 
        });

        console.log('Setting Memory...')
        this.memory = new builder.MemoryBotStorage();
        this.bot.set('storage', this.memory); // (TESTING ONLY)   
        
        this.dialog = new builder.IntentDialog();
        console.log('Initialize defaults...');
        this.dialog.onDefault(builder.DialogAction.send('Im sorry.. I don\'t understand'));
        
        console.log('Creating dialogs...');
        this.registerDialogs();
    }
}
export = Bot;
