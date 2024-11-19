const vscode = require('vscode');

async function analyzeFile() {
    try {
        const files = await vscode.workspace.findFiles('**/*.swift');
        
        const fileItems = files.map(file => ({
            label: vscode.workspace.asRelativePath(file),
            uri: file,
            iconPath: new vscode.ThemeIcon('file'),
        }));

        const selected = await vscode.window.showQuickPick(fileItems, {
            placeHolder: 'Select a Swift file to analyze'
        });

        if (selected) {
            console.log('Selected file:', selected.uri.fsPath);
            vscode.window.showInformationMessage(`Selected: ${selected.uri.fsPath}`);
        }
    } catch (error) {
        console.error('Error:', error);
        vscode.window.showErrorMessage('Failed to list Swift files');
    }
}

module.exports = analyzeFile;