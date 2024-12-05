const vscode = require('vscode');
const path = require('path');

class SwanOverviewViewProvider {
    constructor(context) {
        this.context = context;
        this.context.globalState.setKeysForSync(['totalFilesAnalyzed', 'lastAnalysisRun', 'analysisDuration']);
        this.items = [
            this.createTreeItem(`Total Files Analyzed: ${this.getState('totalFilesAnalyzed', 0)}`, 'file', 'info'),
            this.createTreeItem(`Last Analysis Run: ${this.getState('lastAnalysisRun', 'N/A')}`, 'clock', 'info'),
            this.createTreeItem(`Analysis Duration: ${this.getState('analysisDuration', 'N/A')}`, 'clock', 'info'),
            this.createTreeItem('Used Analysis: SWAN', 'gear', 'info'),
            this.createCommandItem('Re-analyze Current File', 'debug-start', 'swan.reanalyzeCurrentFile'),
            this.createCommandItem('Re-analyze Current Project', 'debug-start', 'swan.analyzeWorkspace'),
            this.createCommandItem('Stop Analysis', 'debug-stop', 'swan.stopAnalysis')
        ];
    }

    getState(key, defaultValue) {
        return this.context.globalState.get(key, defaultValue);
    }

    setState(key, value) {
        this.context.globalState.update(key, value);
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

    refresh() {
        this.items = [
            this.createTreeItem(`Total Files Analyzed: ${this.getState('totalFilesAnalyzed', 0)}`, 'file', 'info'),
            this.createTreeItem(`Last Analysis Run: ${this.getState('lastAnalysisRun', 'N/A')}`, 'clock', 'info'),
            this.createTreeItem(`Analysis Duration: ${this.getState('analysisDuration', 'N/A')}`, 'clock', 'info'),
            this.createTreeItem('Used Analysis: SWAN', 'gear', 'info'),
            this.createCommandItem('Re-analyze Current File', 'debug-start', 'swan.reanalyzeCurrentFile'),
            this.createCommandItem('Re-analyze Current Project', 'debug-start', 'swan.analyzeWorkspace'),
            this.createCommandItem('Stop Analysis', 'debug-stop', 'swan.stopAnalysis')
        ];
        this._onDidChangeTreeData.fire();
    }

    get onDidChangeTreeData() {
        if (!this._onDidChangeTreeData) {
            this._onDidChangeTreeData = new vscode.EventEmitter();
        }
        return this._onDidChangeTreeData.event;
    }
}

module.exports = SwanOverviewViewProvider;