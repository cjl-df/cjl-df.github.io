### vscode 调试 type-script

```
    {
      "type": "node",
      "request": "launch",
      "name": "调试type-script",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/${relativeFile}",
      // "preLaunchTask": "tsc: 监视 - tsconfig.json", //VSCode界面使用中文语言的话用这个
      "preLaunchTask": "tsc: watch - tsconfig.json", //VSCode界面使用英文语言的话用这个
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    },
```

### vscode 调试 js

```
    {
      "type": "node",
      "request": "launch",
      "name": "debgger js",
      "program": "${file}",
      "skipFiles": ["<node_internals>/**"]
    }
```
