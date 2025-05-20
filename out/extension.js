"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const axios_1 = require("axios");
let interval;
function activate(context) {
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBar.text = '🌐 Checking...';
    statusBar.show();
    const config = vscode.workspace.getConfiguration('siteHealth');
    let url = config.get('url') || '';
    async function checkHealth() {
        if (!url) {
            statusBar.text = '🔴 No URL set';
            statusBar.tooltip = 'Set your siteHealth.url in settings';
            return;
        }
        try {
            const res = await axios_1.default.get(url, { timeout: 5000 });
            if (res.status >= 200 && res.status < 300) {
                statusBar.text = '🟢 Healthy';
                statusBar.tooltip = `HTTP ${res.status}`;
            }
            else if (res.status >= 500) {
                statusBar.text = '🔴 Server Error';
                statusBar.tooltip = `HTTP ${res.status}`;
            }
            else {
                statusBar.text = '🟡 Unstable';
                statusBar.tooltip = `HTTP ${res.status}`;
            }
        }
        catch (err) {
            if (err.code === 'ECONNABORTED') {
                statusBar.text = '🟡 Timeout';
                statusBar.tooltip = 'Request timed out';
            }
            else {
                statusBar.text = '🔴 Error';
                statusBar.tooltip = err.message || 'Unknown error';
            }
        }
    }
    let command = vscode.commands.registerCommand('siteHealth.setUrl', async () => {
        const input = await vscode.window.showInputBox({
            prompt: 'Enter your website URL',
            value: url,
        });
        if (input) {
            url = input;
            await config.update('url', input, vscode.ConfigurationTarget.Global);
            checkHealth();
        }
    });
    context.subscriptions.push(command);
    context.subscriptions.push(statusBar);
    checkHealth();
    interval = setInterval(checkHealth, 30000);
}
exports.activate = activate;
function deactivate() {
    clearInterval(interval);
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map