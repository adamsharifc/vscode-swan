const vscode = require('vscode');

async function getExecPath(){
    
    try {
        const config = vscode.workspace.getConfiguration('swan');
        const executablePath = config.get('executablePath');
        vscode.window.showInformationMessage(`SWAN Executable Path: ${executablePath}`);
        return executablePath;

    } catch (error){
        vscode.window.showErrorMessage('Failed to get executable path');
        console.error('Error:', error);
        return null;
    }
}

module.exports = getExecPath;