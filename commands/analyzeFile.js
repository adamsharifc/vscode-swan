const vscode = require('vscode');
const { exec } = require('child_process');
const getExecPath = require('./getExecPath');

async function analyzeFile(filePath) {
    try {
        if (!filePath) {
            const files = await vscode.workspace.findFiles('**/*.swift');

            const fileItems = files.map(file => ({
                label: vscode.workspace.asRelativePath(file),
                uri: file,
                iconPath: new vscode.ThemeIcon('file'),
            }));

            const selected = await vscode.window.showQuickPick(fileItems, {
                placeHolder: 'Select a Swift file to analyze',
            });

            if (!selected) {
                return;
            }

            filePath = selected.uri.fsPath;
        }

        const execPath = await getExecPath();

        exec(`"${execPath}" "${filePath}"`, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage('Failed to analyze Swift file');
                return;
            }
            if (stderr) {
                vscode.window.showErrorMessage(`Error: ${stderr}`);
                return;
            }

            const panel = vscode.window.createWebviewPanel(
                'swanAnalysis',
                'SWAN Analysis Result',
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                }
            );

            panel.webview.html = getWebviewContent(stdout);
        });

    } catch (error) {
        vscode.window.showErrorMessage('Failed to list Swift files');
        console.error('Error:', error);
    }
}

function getWebviewContent(output) {
    return `
        <html>
        <body>
            <h1>SWAN Analysis Result</h1>
            <pre>${output}</pre>
        </body>
        </html>
    `;
}

module.exports = analyzeFile;
