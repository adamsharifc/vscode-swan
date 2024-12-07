const vscode = require('vscode');

class SwanOptionsViewProvider {
    constructor(context) {
        this._context = context;
        this._view = undefined;
    }

    // Required - this is the main entry point for the webview view
    resolveWebviewView(webviewView, context, token) {
        this._view = webviewView;
        
        // Setup webview
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._context.extensionUri
            ]
        };

        // Set initial HTML content
        webviewView.webview.html = this._getHtmlContent();

        // Handle messages from webview
        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'analyze':
                    vscode.commands.executeCommand('swan.analyzeFile');
                    break;
                case 'configure':
                    vscode.commands.executeCommand('swan.configureSWAN');
                    break;
            }
        });
    }

    _getHtmlContent() {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { padding: 10px; }
                    button {
                        width: 100%;
                        padding: 8px;
                        margin: 5px 0;
                        background: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        border-radius: 3px;
                    }
                    button:hover {
                        background: var(--vscode-button-hoverBackground);
                    }
                </style>
            </head>
            <body>
                <h3>SWAN Options</h3>
                <button onclick="analyze()">Analyze Current File</button>
                <button onclick="configure()">Configure SWAN</button>
                <script>
                    const vscode = acquireVsCodeApi();
                    
                    function analyze() {
                        vscode.postMessage({ command: 'analyze' });
                    }
                    
                    function configure() {
                        vscode.postMessage({ command: 'configure' });
                    }
                </script>
            </body>
            </html>
        `;
    }
}

module.exports = SwanOptionsViewProvider;