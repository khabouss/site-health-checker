# Publishing the Site Health Checker Extension

This guide helps you publish your VS Code extension to the Visual Studio Code Marketplace.

## Prerequisites

1. A Microsoft account
2. An Azure DevOps account (you can sign up at https://dev.azure.com/)
3. The packaged extension (.vsix file) which you already have

## Step 1: Create a Personal Access Token (PAT)

1. Go to https://dev.azure.com/
2. Click on your profile icon in the top right corner
3. Select "Personal Access Tokens"
4. Click "New Token"
5. Fill in the following:
   - Name: "VS Code Extension Publishing" (or any name you prefer)
   - Organization: "All accessible organizations"
   - Expiration: Choose an appropriate expiration date
   - Scopes: Select "Custom defined", then check "Marketplace > Manage"
6. Click "Create"
7. **IMPORTANT**: Copy and save the token immediately. You will not be able to see it again.

## Step 2: Publish the Extension

Once you have your Personal Access Token, you can publish using the following command:

```bash
npx vsce publish -p <your-pat>
```

Replace `<your-pat>` with your actual Personal Access Token.

## Step 3: Update the Extension

For future updates:

1. Increase the version number in package.json
2. Make your code changes
3. Run `npm run compile` to compile your changes
4. Run `npx vsce package` to create a new .vsix file
5. Run `npx vsce publish -p <your-pat>` to publish the update

## Troubleshooting

If you encounter issues during publishing:

1. Make sure your Personal Access Token is correct and hasn't expired
2. Ensure the publisher name in package.json matches your Azure DevOps account
3. Check that all required fields in package.json are filled in correctly

## Additional Resources

- [VS Code Extension Publishing Documentation](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [vsce CLI Documentation](https://github.com/microsoft/vscode-vsce) 