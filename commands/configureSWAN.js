const vscode = require('vscode');

function configureSWAN() {
    const config = vscode.workspace.getConfiguration('swan');
    
    const executablePath = config.get('executablePath');

    vscode.window.showInformationMessage(`SWAN Executable Path: ${executablePath}`);

    // Use the native file selector dialog to set the executable path
    vscode.window.showOpenDialog({
        canSelectMany: false,
        openLabel: 'Select SWAN Executable',
    }).then(fileUri => {
        if (fileUri && fileUri[0]) {
            const selectedPath = fileUri[0].fsPath;
            config.update('executablePath', selectedPath, vscode.ConfigurationTarget.Global)
                .then(() => {
                    vscode.window.showInformationMessage(`SWAN Executable Path updated to: ${selectedPath}`);
                }, (error) => {
                    vscode.window.showErrorMessage(`Failed to update SWAN Executable Path: ${error.message}`);
                });
        }
    });
}

module.exports = configureSWAN;