import * as assert from 'assert';
import * as vscode from 'vscode';
import axios from 'axios';
import * as sinon from 'sinon';

suite('Health Check Test Suite', () => {
  let sandbox: sinon.SinonSandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
  });

  teardown(() => {
    sandbox.restore();
  });

  test('Healthy status', async () => {
    const getStub = sandbox.stub(axios, 'get').resolves({ status: 200 });
    const extension = vscode.extensions.getExtension('khabouss.site-health-checker');
    await extension?.activate();
    assert.strictEqual(getStub.called, true);
    // Add more assertions to check the status bar text
  });

  test('Server error status', async () => {
    const getStub = sandbox.stub(axios, 'get').resolves({ status: 500 });
    const extension = vscode.extensions.getExtension('khabouss.site-health-checker');
    await extension?.activate();
    assert.strictEqual(getStub.called, true);
    // Add more assertions to check the status bar text
  });

  test('Timeout error', async () => {
    const getStub = sandbox.stub(axios, 'get').rejects({ code: 'ECONNABORTED' });
    const extension = vscode.extensions.getExtension('khabouss.site-health-checker');
    await extension?.activate();
    assert.strictEqual(getStub.called, true);
    // Add more assertions to check the status bar text
  });
}); 