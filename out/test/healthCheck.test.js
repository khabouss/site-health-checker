"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vscode = require("vscode");
const axios_1 = require("axios");
const sinon = require("sinon");
suite('Health Check Test Suite', () => {
    let sandbox;
    setup(() => {
        sandbox = sinon.createSandbox();
    });
    teardown(() => {
        sandbox.restore();
    });
    test('Healthy status', async () => {
        const getStub = sandbox.stub(axios_1.default, 'get').resolves({ status: 200 });
        const extension = vscode.extensions.getExtension('khabouss.site-health-checker');
        await extension?.activate();
        assert.strictEqual(getStub.called, true);
        // Add more assertions to check the status bar text
    });
    test('Server error status', async () => {
        const getStub = sandbox.stub(axios_1.default, 'get').resolves({ status: 500 });
        const extension = vscode.extensions.getExtension('khabouss.site-health-checker');
        await extension?.activate();
        assert.strictEqual(getStub.called, true);
        // Add more assertions to check the status bar text
    });
    test('Timeout error', async () => {
        const getStub = sandbox.stub(axios_1.default, 'get').rejects({ code: 'ECONNABORTED' });
        const extension = vscode.extensions.getExtension('khabouss.site-health-checker');
        await extension?.activate();
        assert.strictEqual(getStub.called, true);
        // Add more assertions to check the status bar text
    });
});
//# sourceMappingURL=healthCheck.test.js.map