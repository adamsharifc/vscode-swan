const vscode = require('vscode');

function analyzeWorkspace() {
    vscode.window.showInformationMessage('Analyze Workspace command executed');
}

module.exports = analyzeWorkspace;