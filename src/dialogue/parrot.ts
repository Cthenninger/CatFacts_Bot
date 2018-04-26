import builder = require('botbuilder');
import dialogBase = require('./base');

class Parrot extends dialogBase {
    setDialog() {
        this.dialog = [
            (session) => {
                builder.Prompts.text(session, '....Fine, i\'ll pretend to be a parrot. What would you like me to repeat?');
            },
            (session) => {
                session.send(`You said: ${session.message.text}`);
                session.endDialog("Caw Caw");
            }
        ];
    }
}
export = Parrot;
