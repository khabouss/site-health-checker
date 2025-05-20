import * as vscode from 'vscode';
import axios from 'axios';

let interval: NodeJS.Timer;
let blinkInterval: NodeJS.Timer | undefined;
let isVisible = true;

export function activate(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBar.text = '🌐 Checking...';
  statusBar.show();

  const config = vscode.workspace.getConfiguration('siteHealth');
  let url = config.get<string>('url') || '';
  
  // Store status text for blinking
  let statusText = '';
  
  function startBlinking() {
    // Clear existing blink interval if there is one
    if (blinkInterval) {
      clearInterval(blinkInterval);
    }
    
    // Start blinking effect
    blinkInterval = setInterval(() => {
      isVisible = !isVisible;
      statusBar.text = isVisible ? statusText : '';
    }, 500); // Blink every 500ms
  }
  
  function stopBlinking() {
    if (blinkInterval) {
      clearInterval(blinkInterval);
      blinkInterval = undefined;
    }
    isVisible = true;
    statusBar.text = statusText;
  }

  async function checkHealth() {
    if (!url) {
      statusText = '🔴 No URL set';
      statusBar.text = statusText;
      statusBar.tooltip = 'Set your siteHealth.url in settings';
      startBlinking();
      return;
    }

    try {
      const res = await axios.get(url, { timeout: 5000 });

      if (res.status >= 200 && res.status < 300) {
        statusText = '🟢 Healthy';
        statusBar.text = statusText;
        statusBar.tooltip = `HTTP ${res.status}`;
        stopBlinking(); // Stop blinking for green status
      } else if (res.status >= 500) {
        statusText = '🔴 Server Error';
        statusBar.text = statusText;
        statusBar.tooltip = `HTTP ${res.status}`;
        startBlinking();
      } else {
        statusText = '🟡 Unstable';
        statusBar.text = statusText;
        statusBar.tooltip = `HTTP ${res.status}`;
        startBlinking();
      }
    } catch (err: any) {
      if (err.code === 'ECONNABORTED') {
        statusText = '🟡 Timeout';
        statusBar.text = statusText;
        statusBar.tooltip = 'Request timed out';
        startBlinking();
      } else {
        statusText = '🔴 Error';
        statusBar.text = statusText;
        statusBar.tooltip = err.message || 'Unknown error';
        startBlinking();
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
  if (blinkInterval) {
    clearInterval(blinkInterval);
  }
}