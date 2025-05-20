import * as vscode from 'vscode';
import axios from 'axios';

let interval: NodeJS.Timer;

export function activate(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBar.text = '🌐 Checking...';
  statusBar.show();

  const config = vscode.workspace.getConfiguration('siteHealth');
  let url = config.get<string>('url') || '';

  async function checkHealth() {
    if (!url) {
      statusBar.text = '🔴 No URL set';
      statusBar.tooltip = 'Set your siteHealth.url in settings';
      return;
    }

    try {
      const res = await axios.get(url, { timeout: 5000 });

      if (res.status >= 200 && res.status < 300) {
        statusBar.text = '🟢 Healthy';
        statusBar.tooltip = `HTTP ${res.status}`;
      } else if (res.status >= 500) {
        statusBar.text = '🔴 Server Error';
        statusBar.tooltip = `HTTP ${res.status}`;
      } else {
        statusBar.text = '🟡 Unstable';
        statusBar.tooltip = `HTTP ${res.status}`;
      }
    } catch (err: any) {
      if (err.code === 'ECONNABORTED') {
        statusBar.text = '🟡 Timeout';
        statusBar.tooltip = 'Request timed out';
      } else {
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

export function deactivate() {
  clearInterval(interval);
}