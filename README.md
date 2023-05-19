# Node Express Boilerplate

It's a little start guy for you project.

## Startup

```
npm i
npm run dev OR docker compose -f dev-compose.yaml
```

### ESLint

Install the vscode eslint plugin

Add to settings.json

```json
{
  "editor.formatOnSave": true,
  "eslint.format.enable": true,
  "eslint.codeActionsOnSave.rules": null,
  "eslint.validate": ["javascript"],
  "[javascript]": {
    "editor.tabSize": 2,
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  }
}
```
