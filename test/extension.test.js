const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Analyze File Command', async () => {
        await vscode.commands.executeCommand('swan.analyzeFile');
		assert.ok(true);
    });

	test('Analyze Folder Command', async () => {
        await vscode.commands.executeCommand('swan.analyzeFolder');
        assert.ok(true);
    });

	test('Analyze Workspace Command', async () => {
        await vscode.commands.executeCommand('swan.analyzeWorkspace');
        assert.ok(true);
    });

});
