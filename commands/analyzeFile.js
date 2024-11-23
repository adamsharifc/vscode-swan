const vscode = require('vscode');
const { exec } = require('child_process');
const getExecPath = require('./getExecPath');

async function analyzeFile() {
    try {
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

        const filePath = selected.uri.fsPath;
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
                'SWAN Analysis Result',         // window title 
                vscode.ViewColumn.One,          // view column to show the webview in
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
    // Escape HTML special characters to prevent injection
    const escapedOutput = output.replace(/[&<>"'`]/g, (char) => {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&#96;',
        }[char];
    });

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>SWAN Analysis Result</title>
        <style>
            body { font-family: sans-serif; padding: 10px; }
            pre { white-space: pre-wrap; word-wrap: break-word; }
        </style>
    </head>
    <body>
        <h1>SWAN Analysis Result</h1>
        <pre>${escapedOutput}</pre>
    </body>
    </html>`;
}

module.exports = analyzeFile;
