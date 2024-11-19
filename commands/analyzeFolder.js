const vscode = require('vscode');

async function analyzeFolder() {
    try {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if (!workspaceFolders) {
            vscode.window.showInformationMessage('No workspace folders found');
            return;
        }

        const folderItems = workspaceFolders.map(folder => ({
            label: folder.name,
            uri: folder.uri,
            iconPath: new vscode.ThemeIcon('folder'),
            description: folder.uri.fsPath
        }));

        const selected = await vscode.window.showQuickPick(folderItems, {
            placeHolder: 'Select a folder to analyze'
        });

        if (selected) {
            console.log('Selected folder path:', selected.uri.fsPath);
            vscode.window.showInformationMessage(`Selected folder: ${selected.uri.fsPath}`);
        }
    } catch (error) {
        console.error('Error:', error);
        vscode.window.showErrorMessage('Failed to analyze folder');
    }
}

module.exports = analyzeFolder;