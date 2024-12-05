const vscode = require('vscode');
const analyzeFile = require('./commands/analyzeFile.js');
const analyzeWorkspace = require('./commands/analyzeWorkspace.js');
const analyzeFolder = require('./commands/analyzeFolder.js');
const configureSWAN = require('./commands/configureSWAN.js');
const SwanOverviewViewProvider = require('./sidebar/swanOverviewView');
const SwanReportsViewProvider = require('./sidebar/swanReportsView');

function activate(context) {
    console.log('Swan is now active!');

    const disposable = vscode.commands.registerCommand('swan.helloWorld', function () {
        vscode.window.showInformationMessage('Hello World from swan this is a change!');
    });

    const analyzeFile_ = vscode.commands.registerCommand('swan.analyzeFile', async () => {
        const startTime = Date.now();
        await analyzeFile();
        const duration = (Date.now() - startTime) / 1000;
        const totalFilesAnalyzed = context.globalState.get('totalFilesAnalyzed', 0) + 1;
        context.globalState.update('totalFilesAnalyzed', totalFilesAnalyzed);
        context.globalState.update('lastAnalysisRun', new Date().toISOString().split('T')[0]);
        context.globalState.update('analysisDuration', `${duration} seconds`);
        swanOverviewProvider.refresh();
        vscode.window.showInformationMessage('Re-analyze Current File command executed');
    });

    const analyzeWorkspace_ = vscode.commands.registerCommand('swan.analyzeWorkspace', async () => {
        const startTime = Date.now();
        await analyzeWorkspace();
        const duration = (Date.now() - startTime) / 1000;
        const totalFilesAnalyzed = context.globalState.get('totalFilesAnalyzed', 0) + 1;
        context.globalState.update('totalFilesAnalyzed', totalFilesAnalyzed);
        context.globalState.update('lastAnalysisRun', new Date().toISOString().split('T')[0]);
        context.globalState.update('analysisDuration', `${duration} seconds`);
        swanOverviewProvider.refresh();
        vscode.window.showInformationMessage('Re-analyze Current Project command executed');
    });

    const analyzeFolder_ = vscode.commands.registerCommand('swan.analyzeFolder', analyzeFolder);
    const configureSWAN_ = vscode.commands.registerCommand('swan.configureSWAN', configureSWAN);

    const reanalyzeCurrentFile = vscode.commands.registerCommand('swan.reanalyzeCurrentFile', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const filePath = document.uri.fsPath;
            const startTime = Date.now();
            await analyzeFile(filePath); // Assuming analyzeFile can take a file path as an argument
            const duration = (Date.now() - startTime) / 1000;
            const totalFilesAnalyzed = context.globalState.get('totalFilesAnalyzed', 0) + 1;
            context.globalState.update('totalFilesAnalyzed', totalFilesAnalyzed);
            context.globalState.update('lastAnalysisRun', new Date().toISOString().split('T')[0]);
            context.globalState.update('analysisDuration', `${duration} seconds`);
            swanOverviewProvider.refresh();
            vscode.window.showInformationMessage('Re-analyze Current File command executed');
        } else {
            vscode.window.showInformationMessage('No active editor found to re-analyze the current file.');
        }
    });

    const stopAnalysis = vscode.commands.registerCommand('swan.stopAnalysis', () => {
        vscode.window.showInformationMessage('Stop Analysis command executed');
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(analyzeFile_);
    context.subscriptions.push(analyzeWorkspace_);
    context.subscriptions.push(analyzeFolder_);
    context.subscriptions.push(configureSWAN_);
    context.subscriptions.push(reanalyzeCurrentFile);
    context.subscriptions.push(stopAnalysis);

    const swanOverviewProvider = new SwanOverviewViewProvider(context);
    vscode.window.registerTreeDataProvider('swanOverview', swanOverviewProvider);

    const swanReportsProvider = new SwanReportsViewProvider(context);
    vscode.window.registerTreeDataProvider('swanReports', swanReportsProvider);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};