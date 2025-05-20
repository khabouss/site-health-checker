"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vscode = require("vscode");
suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    test('Sample test', () => {
        assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        assert.strictEqual(-1, [1, 2, 3].indexOf(0));
    });
    test('Check if extension is activated', async () => {
        const extension = vscode.extensions.getExtension('khabouss.site-health-checker');
        assert.ok(extension);
        await extension?.activate();
        assert.strictEqual(extension?.isActive, true);
    });
});
//# sourceMappingURL=extension.test.js.map