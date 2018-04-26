import builder = require('botbuilder');

abstract class DialogHelperBase {

    public dialog: builder.IDialogWaterfallStep[] | builder.IDialogWaterfallStep;

    constructor() {
        this.setDialog();
    }

    public register(bot: builder.UniversalBot, path: string) {
        console.log('Binding dialog to %s', path);
        bot.dialog(path, this.dialog).triggerAction({matches: new RegExp(`^${path}$`,"i")});
    }
    
    public abstract setDialog();

}
export = DialogHelperBase;
