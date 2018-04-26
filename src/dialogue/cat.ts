import builder = require('botbuilder');
import dialogBase = require('./base');
import https = require('https');

class Cat extends dialogBase {
    setDialog() {
        this.dialog = [
            (session) => {
                builder.Prompts.text(session, 'What about them?');
            },
            (session) => {
                if(session.message.text == "give me a cat fact"){
                    var factnumber = 0; 
                    var factslength = 0;
                    https.get('https://cat-fact.herokuapp.com/Facts', (resp) => {
                                let data = '';
                                resp.on('data', (chunk) => {
                                    data += chunk;
                                });
                                resp.on('end', () => {
                                    var catJSON = JSON.parse(data);
                                    factslength = catJSON.all.length;
                                    if(factnumber == factslength){
                                        factnumber =0;
                                    }
                                    session.endDialog("Here you go: %s",catJSON.all[factnumber].text);
                                    factnumber ++;
                                });        
                    }).on("error", (err) => {
                        console.log("Error: " + err.message);
                    });
                }else if (session.message.text == "how great are they"){
                    session.send("10/10 r great")
                }else if (session.message.text == "nvm" || session.message.text == "nevermind" ){
                    session.endDialog("k")
                }else{
                    session.send("Sorry bruh, I don't know what you mean by that");
                }
            }
        ];
    }
}
export = Cat;
