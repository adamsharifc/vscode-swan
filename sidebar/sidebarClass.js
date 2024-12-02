const vscode = require('vscode');

class SwanViewProvider {
    constructor(context) {
        this.context = context;
        this.items = [
            { label: 'Overview', command: 'swan.showOverview' },
            { label: 'Reports', command: 'swan.showReports' }
        ];

        // Register commands for webviews
        context.subscriptions.push(vscode.commands.registerCommand('swan.showOverview', () => {
            this.showWebview('Overview', 'SWAN Overview', this.getOverviewContent());
        }));

        context.subscriptions.push(vscode.commands.registerCommand('swan.showReports', () => {
            this.showWebview('Reports', 'SWAN Reports', this.getReportsContent());
        }));
    }

    getChildren(element) {
        if (!element) {
            return Promise.resolve(this.items.map(item => this.createTreeItem(item)));
        }
        return Promise.resolve([]);
    }

    getTreeItem(element) {
        return element;
    }

    createTreeItem(item) {
        const treeItem = new vscode.TreeItem(item.label, vscode.TreeItemCollapsibleState.None);
        treeItem.command = {
            command: item.command,
            title: item.label,
            arguments: [item.label]
        };
        return treeItem;
    }

    showWebview(viewId, title, content) {
        const panel = vscode.window.createWebviewPanel(
            viewId,
            title,
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
            }
        );
        panel.webview.html = content;
    }

    getOverviewContent() {
        return `
            <html>
            <body>
                <h1>SWAN Overview</h1>
                <p>This is the overview of the SWAN extension.</p>
            </body>
            </html>
        `;
    }

    getReportsContent() {
        return `
            <html>
            <body>
                <h1>SWAN Reports</h1>
                <p>This is the reports section of the SWAN extension.</p>
            </body>
            </html>
        `;
    }
}

module.exports = SwanViewProvider;