const vscode = require('vscode');
const path = require('path');

class SwanOverviewViewProvider {
    constructor(context) {
        this.context = context;
        this.items = [
            this.createTreeItem('Total Files Analyzed: 100', 'file', 'info'),
            this.createTreeItem('Last Analysis Run: 2023-10-01', 'clock', 'info'),
            this.createTreeItem('Analysis Duration: 5 minutes', 'clock', 'info'),
            this.createTreeItem('Used Analysis: SWAN', 'gear', 'info'),
            this.createCommandItem('Re-analyze Current File', 'debug-start', 'swan.reanalyzeCurrentFile'),
            this.createCommandItem('Re-analyze Current Project', 'debug-start', 'swan.reanalyzeCurrentProject'),
            this.createCommandItem('Stop Analysis', 'debug-stop', 'swan.stopAnalysis')
        ];
    }

    createTreeItem(label, icon, contextValue) {
        const treeItem = new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.None);
        treeItem.iconPath = new vscode.ThemeIcon(icon);
        treeItem.contextValue = contextValue;
        return treeItem;
    }

    createCommandItem(label, icon, command) {
        const treeItem = new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.None);
        treeItem.iconPath = new vscode.ThemeIcon(icon);
        treeItem.command = {
            command: command,
            title: label
        };
        return treeItem;
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

module.exports = SwanOverviewViewProvider;