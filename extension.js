const vscode = require('vscode');
const analyzeFile = require('./commands/analyzeFile.js');
const analyzeWorkspace = require('./commands/analyzeWorkspace.js');
const analyzeFolder = require('./commands/analyzeFolder.js');
const configureSWAN = require('./commands/configureSWAN.js');

class SwanViewProvider {
    constructor(context) {
        this.context = context;
    }

    getChildren(element) {
        if (!element) {
            return Promise.resolve([
                new vscode.TreeItem('Item 1', vscode.TreeItemCollapsibleState.None),
                new vscode.TreeItem('Item 2', vscode.TreeItemCollapsibleState.None),
                new vscode.TreeItem('Item 3', vscode.TreeItemCollapsibleState.None)
            ]);
        }
        return Promise.resolve([]);
    }

    getTreeItem(element) {
        return element;
    }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Swan is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('swan.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from swan this is a change!');
	});


    const analyzeFile_ = vscode.commands.registerCommand('swan.analyzeFile', analyzeFile);
    const analyzeWorkspace_ = vscode.commands.registerCommand('swan.analyzeWorkspace', analyzeWorkspace);
	const analyzeFolder_ = vscode.commands.registerCommand('swan.analyzeFolder', analyzeFolder);
	const configureSWAN_ = vscode.commands.registerCommand('swan.configureSWAN', configureSWAN);

	context.subscriptions.push(disposable);
	context.subscriptions.push(analyzeFile_);
	context.subscriptions.push(analyzeWorkspace_);
	context.subscriptions.push(analyzeFolder_);
	context.subscriptions.push(configureSWAN_);
	
    const swanViewProvider = new SwanViewProvider(context);
    vscode.window.registerTreeDataProvider('swanView', swanViewProvider);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
