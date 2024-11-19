const vscode = require('vscode');

function analyzeFile() {
    vscode.window.showInformationMessage('Analyze File command executed');
}

module.exports = analyzeFile;