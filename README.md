# Site Health Checker

A VS Code extension that monitors the health of a specified website and displays status in the editor.

## Features

- Real-time website health monitoring
- Status indicator in the VS Code status bar
- Visual health status with color-coded indicators:
  - 🟢 Healthy (200-299 HTTP status)
  - 🟡 Unstable (non-500 errors or timeouts)
  - 🔴 Error (500+ errors or connection failures)
- Blinking status indicator for non-healthy states (warning and error conditions)
- Configurable URL setting
- Request timeout after 5 seconds

## Installation

You can install this extension through the VS Code marketplace:

1. Open VS Code
2. Open the Extensions view (Ctrl+Shift+X or Cmd+Shift+X)
3. Search for "Site Health Checker"
4. Click Install

Alternatively, download the .vsix file and install manually:
```
code --install-extension site-health-checker-0.0.1.vsix
```

## Usage

1. After installation, you'll see a "🌐 Checking..." indicator in the status bar
2. Set the URL to monitor in one of these ways:
   - Run the command "Set Website URL for Health Check" from the command palette (Ctrl+Shift+P or Cmd+Shift+P)
   - Set the `siteHealth.url` property in your VS Code settings

The extension will then check the website health every 30 seconds and update the status indicator.

## Status Indicators

- 🟢 Healthy: Site is responding with a 2xx status code
- 🟡 Unstable: Site is responding with a non-500 error status or timing out (blinks to alert you)
- 🔴 Error: Site is responding with a 500+ error or has connection issues (blinks to alert you)
- 🔴 No URL set: No URL has been configured yet (blinks to alert you)

## Requirements

- VS Code version 1.70.0 or higher

## Extension Settings

This extension contributes the following settings:

* `siteHealth.url`: URL of the website to monitor

## Development

### Prerequisites
- Node.js
- npm

### Setup
1. Clone the repository
```
git clone https://github.com/khabouss/site-health-checker.git
cd site-health-checker
```

2. Install dependencies
```
npm install
```

3. Build the extension
```
npm run compile
```

4. Run the extension in debug mode
- Press F5 in VS Code

### Building the extension
```
npm run vscode:prepublish
```

## License

[MIT License](LICENSE)

## Author

khabouss - [GitHub](https://github.com/khabouss) 