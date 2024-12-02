const vscode = require('vscode');

class SwanReportsViewProvider {
    constructor(context) {
        this.context = context;
        this.items = [
            new vscode.TreeItem('Report Item 1'),
            new vscode.TreeItem('Report Item 2'),
            new vscode.TreeItem('Report Item 3')
        ];
    }

    getChildren(element) {
        if (!element) {
            return Promise.resolve(this.items);
        }
        return Promise.resolve([]);
    }

    getTreeItem(element) {
        return element;
    }
}

module.exports = SwanReportsViewProvider;